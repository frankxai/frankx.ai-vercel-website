#!/usr/bin/env python3
"""Create deterministic Markdown, CSV, and JSON AI fleet planning artifacts."""

import argparse
import csv
import json
from pathlib import Path


def require(data, keys):
    missing = [key for key in keys if key not in data]
    if missing:
        raise ValueError(f"Missing required keys: {', '.join(missing)}")


def annual_energy(machine, rate):
    daily_wh = machine.get("active_watts", 0) * machine.get("active_hours_per_day", 0)
    daily_wh += machine.get("idle_watts", 0) * machine.get("idle_hours_per_day", 0)
    return daily_wh * 365 / 1000 * rate


def model_fit(model, machine):
    required = model["weights_gib"] * (1 + model.get("runtime_overhead_fraction", 0.25))
    required += model.get("context_cache_gib", 0)
    usable = machine["accelerator_memory_gib"] * machine.get("usable_memory_fraction", 0.85)
    if required <= usable * 0.8:
        fit = "comfortable"
    elif required <= usable:
        fit = "tight"
    elif required <= usable + machine.get("system_ram_gib", 0) * 0.7:
        fit = "offload"
    else:
        fit = "no-fit"
    return round(required, 2), round(usable, 2), fit


def money(value, currency):
    return f"{currency} {value:,.2f}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    data = json.loads(args.input.read_text(encoding="utf-8"))
    require(data, ["project", "currency", "electricity_per_kwh", "horizon_years", "models", "machines"])
    if not data["machines"]:
        raise ValueError("At least one machine is required")
    args.output.mkdir(parents=True, exist_ok=True)

    currency = data["currency"]
    years = data["horizon_years"]
    cloud_monthly = data.get("monthly_cloud_spend", 0)
    replacement = data.get("cloud_replaceable_fraction", 0)
    retained_cloud = cloud_monthly * 12 * years * (1 - replacement)
    machines = []
    for item in data["machines"]:
        require(item, ["name", "role", "price", "accelerator_memory_gib"])
        energy = annual_energy(item, data["electricity_per_kwh"])
        row = dict(item)
        row["annual_energy_cost"] = round(energy, 2)
        row["horizon_tco"] = round(item["price"] + energy * years + retained_cloud, 2)
        machines.append(row)

    fits = []
    for machine in machines:
        for model in data["models"]:
            required, usable, fit = model_fit(model, machine)
            fits.append({"machine": machine["name"], "model": model["name"], "required_gib": required, "usable_accelerator_gib": usable, "fit": fit})

    ranked = sorted(machines, key=lambda item: item["horizon_tco"])
    plan = {
        "project": data["project"], "currency": currency, "horizon_years": years,
        "assumptions": {"electricity_per_kwh": data["electricity_per_kwh"], "monthly_cloud_spend": cloud_monthly, "cloud_replaceable_fraction": replacement, "tco_exclusions": ["tax effects", "financing", "maintenance labor", "downtime", "resale"]},
        "lowest_tco_candidate": ranked[0]["name"], "machines": machines, "model_fit": fits,
        "warnings": ["Lowest TCO is not automatically the best workload fit.", "Memory across heterogeneous machines is not a transparent shared pool.", "Validate stream counts and performance with representative benchmarks.", "Cloud savings include only the declared realistically replaceable fraction."],
        "phases": [
            {"phase": 1, "action": "Remove the measured primary bottleneck with one reusable node."},
            {"phase": 2, "action": "Add independent inference after memory, uptime, privacy, user, queue, or cloud-cost gates are measured."},
            {"phase": 3, "action": "Add shared storage, networking, and matched-node capacity only after utilization proves demand."}
        ]
    }
    (args.output / "fleet-plan.json").write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")

    fields = ["name", "role", "price", "accelerator_memory_gib", "system_ram_gib", "storage_tb", "interactive_streams_small", "interactive_streams_large", "annual_energy_cost", "horizon_tco", "source_url", "observed_on"]
    with (args.output / "machine-comparison.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(machines)
    with (args.output / "model-fit.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["machine", "model", "required_gib", "usable_accelerator_gib", "fit"])
        writer.writeheader()
        writer.writerows(fits)

    lines = [f"# {data['project']} — AI hardware fleet plan", "", f"**Lowest-TCO candidate:** {ranked[0]['name']} (validate workload fit before recommending)", "", "## Machine comparison", "", "| Machine | Role | Capex | Annual energy | TCO |", "|---|---|---:|---:|---:|"]
    for machine in ranked:
        lines.append(f"| {machine['name']} | {machine['role']} | {money(machine['price'], currency)} | {money(machine['annual_energy_cost'], currency)} | {money(machine['horizon_tco'], currency)} |")
    lines += ["", "## Model fit", "", "| Machine | Model | Required GiB | Usable GiB | Fit |", "|---|---|---:|---:|---|"]
    for row in fits:
        lines.append(f"| {row['machine']} | {row['model']} | {row['required_gib']} | {row['usable_accelerator_gib']} | {row['fit']} |")
    lines += ["", "## Concurrency assumptions", "", "| Machine | Small-model streams | Large-model streams |", "|---|---:|---:|"]
    for machine in machines:
        lines.append(f"| {machine['name']} | {machine.get('interactive_streams_small', 'not supplied')} | {machine.get('interactive_streams_large', 'not supplied')} |")
    lines += ["", "These are supplied planning assumptions, not inferred benchmarks.", "", "## Phase plan", "", "1. Remove the measured primary bottleneck with one reusable node.", "2. Add independent inference after a measured capacity or business gate.", "3. Add shared infrastructure and matched-node scale only after utilization proves demand.", "", "## Guardrails", "", "- Lowest TCO is not automatically the best workload fit.", "- Memory across heterogeneous machines does not combine transparently.", "- Validate performance and concurrency with representative workflows.", "- Prices, availability, warranty, and software support require dated sources.", "- TCO excludes tax effects, financing, maintenance labor, downtime, and resale.", ""]
    (args.output / "fleet-plan.md").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()
