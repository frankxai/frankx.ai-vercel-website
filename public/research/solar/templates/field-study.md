# Solar canopy field-study protocol

Version 0.1 · Proposed protocol · Adapt and preregister before collection

## Question and comparison

Estimate the difference in normalized AC yield between a monitored bifacial canopy and its specified comparison under actual use. State the intended estimand, dates, exclusions and minimum valid observation coverage in advance. For a rear-side attribution claim, specify a matched reference and document matching for module type and rating, tilt, orientation, electrical equipment and rear-exposure treatment. Record remaining differences and any treatment effects on airflow or temperature. Without a matched reference, report observed conditions and associations and describe PVGIS as a modeled baseline.

## Setup and metadata

- Stable site, array and reference IDs. Record design, surface material, shading and module bill of materials.
- Sensor IDs, serials, calibration dates, placement drawings and rear sensor positions. Use the appropriate IEC 61724-1 monitoring requirements for the study.
- UTC clock synchronization, sample frequency, aggregation interval and data source for each field. Record power in W and interval energy in Wh.
- Record occupancy at the bay level where appropriate. Avoid images, plates and personal identifiers.
- Predefine maintenance, outages, snow, curtailment, clipping, sensor saturation and missing-data flags. Document which analyses use which flags.

## Analysis

- Start with unfiltered coverage and exclusions per array. Retain raw values. Mark missing data explicitly.
- Report paired periods and AC specific yield in kWh/kWp by month and season, with sensor uncertainty and sensitivity to exclusions.
- Stratify occupancy, pavement conditions and season where coverage supports it. Use paired days or another documented method that accounts for serial correlation when estimating uncertainty.
- State when a single site or a comparison mismatch limits generalization. Publish the instrument diagram, data dictionary, code, and releasable aggregate data alongside the result.

## Primary references

- IEC 61724-1:2021 monitoring: https://webstore.iec.ch/en/publication/65561
- IEA PVPS Task 13 on bifacial systems: https://iea-pvps.org/key-topics/bifacial-photovoltaic-modules-and-systems/
- European Commission JRC PVGIS baseline: https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis_en
