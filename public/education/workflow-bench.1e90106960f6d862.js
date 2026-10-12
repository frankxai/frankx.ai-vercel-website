import { blankState, exampleState, exportMarkdown, fields, parseStoredState, progress, STORAGE_KEY, } from "./workflow-model.e3094ef3de9e7f0e.js";
let state = blankState();
let saving = false;
let restored = false;
const status = document.querySelector("#lab-notice");
const completion = document.querySelector("#lab-completion");
const saveButton = document.querySelector('[data-action="save"]');
function say(message) {
    status.textContent = message;
}
function updateProgress() {
    const p = progress(state);
    completion.textContent = `${p.specified}/7 fields · ${p.tested}/3 tests with observations. ${p.ready ? "Self-reported checklist complete. Independent peer review is still pending." : "Work in progress. Export whenever you need; incomplete or failed checks stay visible."}`;
}
function persist() {
    if (!saving)
        return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    catch {
        saving = false;
        saveButton.disabled = false;
        saveButton.textContent = "Enable device saving";
        say("Device saving is unavailable. Current work is still in this tab; export a copy.");
    }
}
function render() {
    for (const f of fields)
        document.querySelector(`#lab-${f.key}`).value =
            state.values[f.key];
    state.tests.forEach((t, i) => {
        document.querySelector(`#result-${i}`).value = t.result;
        document.querySelector(`#notes-${i}`).value = t.notes;
    });
    state.review.forEach((v, i) => {
        document.querySelector(`#review-${i}`).checked = v;
    });
    saveButton.disabled = saving;
    saveButton.textContent = saving
        ? "Device saving enabled"
        : "Enable device saving";
    updateProgress();
}
function changed() {
    updateProgress();
    persist();
}
for (const f of fields)
    document
        .querySelector(`#lab-${f.key}`)
        .addEventListener("input", (e) => {
        state.values[f.key] = e.currentTarget.value.slice(0, 2400);
        changed();
    });
state.tests.forEach((_, i) => {
    document
        .querySelector(`#result-${i}`)
        .addEventListener("change", (e) => {
        const value = e.currentTarget.value;
        if (!["unrun", "pass", "fail"].includes(value))
            return;
        state.tests[i].result = value;
        changed();
    });
    document
        .querySelector(`#notes-${i}`)
        .addEventListener("input", (e) => {
        state.tests[i].notes = e.currentTarget.value.slice(0, 2400);
        changed();
    });
});
state.review.forEach((_, i) => document
    .querySelector(`#review-${i}`)
    .addEventListener("change", (e) => {
    state.review[i] = e.currentTarget.checked;
    changed();
}));
function download() {
    try {
        const url = URL.createObjectURL(new Blob([exportMarkdown(state)], {
            type: "text/markdown;charset=utf-8",
        }));
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-source-based-workflow.md";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        say("Download requested. The Markdown includes current work, incomplete checks and a peer-review packet. Check your browser downloads.");
    }
    catch {
        say("Download could not start. Your work remains in this tab; copy the fields or try another browser.");
    }
}
document
    .querySelectorAll("[data-action]")
    .forEach((button) => button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "export") {
        download();
        return;
    }
    if (action === "example") {
        if (!window.confirm("Replace current work with the fictional example? Export first to keep a copy. Test results and self-assessment will reset."))
            return;
        state = exampleState();
        render();
        persist();
        say("Fictional example loaded. Run your own tests; none have been marked complete.");
        return;
    }
    if (action === "save") {
        try {
            if (localStorage.getItem(STORAGE_KEY) && !restored) {
                say("A saved draft already exists. Restore it first, or forget it before saving this draft. Export current work before restoring.");
                return;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            saving = true;
            render();
            say("Device saving enabled. Edits are saved in this browser. On a shared device, export and forget your draft when finished.");
        }
        catch {
            say("Device saving is unavailable. Export your work to keep a copy.");
        }
        return;
    }
    if (action === "restore") {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                say("No saved draft was found on this device.");
                return;
            }
            const saved = parseStoredState(raw);
            if (!saved) {
                say("The saved draft is unreadable or from an unsupported version. Current work is unchanged. You can forget the saved draft.");
                return;
            }
            if (fields.some((f) => state.values[f.key].trim()) ||
                state.tests.some((t) => t.notes || t.result !== "unrun") ||
                state.review.some(Boolean)) {
                if (!window.confirm("Replace current tab work with the saved draft? Export current work first if you need it."))
                    return;
            }
            saving = false;
            restored = true;
            state = saved;
            render();
            say("Saved draft restored. Select Enable device saving to save further edits.");
        }
        catch {
            say("Saved work could not be read. Current tab work is unchanged.");
        }
        return;
    }
    if (action === "forget") {
        if (!window.confirm("Stop device saving and remove the saved draft? Current tab work will stay available."))
            return;
        saving = false;
        render();
        try {
            localStorage.removeItem(STORAGE_KEY);
            restored = false;
            say("Saved draft removed from this browser. Your current tab work is still available to export.");
        }
        catch {
            say("Saving has stopped, but the saved draft could not be removed. Check browser storage settings; current tab work is unchanged.");
        }
    }
}));
document
    .querySelectorAll("#workbench fieldset")
    .forEach((el) => {
    el.disabled = false;
});
document.querySelectorAll("[data-action]").forEach((el) => {
    el.disabled = false;
});
render();
say("Your work stays in this tab until you export or enable device saving. No learner-input analytics are collected by this lab.");
