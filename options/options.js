const ACTION_TEMPLATE = '## Links\\r\\n' +
    '[jira ticket Link]\\r\\n' +
    '## Description\\r\\n' +
    '**Why**: [describe why this PR exists]\\r\\n' +
    '**How**: [describe how this PR works]\\r\\n' +
    '(add screenshots)\\r\\n' +
    '## Who might be interested\\r\\n' +
    'UXFCP\\r\\n' +
    '## Testing Recommendations\\r\\n' +
    '- [ ] test case I\\r\\n' +
    '- [ ] tast case II\\r\\n';

const TEMPLATE_XML = '{\n' +
    '  "actions": [\n' +
    '    {\n' +
    '      "row": [\n' +
    '        {\n' +
    '          "title": "PR description template",\n' +
    '          "target": "#pr-description",\n' +
    '          "action": "'+ ACTION_TEMPLATE +'"'+
    '        },\n' +
    '        {\n' +
    '          "title": "PR comment suggest",\n' +
    '          "action": "(suggests)",\n' +
    '          "target": "#pr-comment"\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  ]\n' +
    '}';


function saveOptions(e) {
    browser.storage.sync.set({
        json: document.querySelector("#json").value
    });
    e.preventDefault();
}

function restoreOptions() {
    document.querySelector("#json-template").innerText = TEMPLATE_XML;

/*
    const storageItem = browser.storage.sync.get('json');
    storageItem.then((res) => {
        if (undefined != res.json) {
            document.querySelector("#managed-json").innerText = res.json;
        }

    });
*/
    const gettingItem = browser.storage.sync.get('json');
    gettingItem.then((res) => {
        document.querySelector("#json").value = res.json || TEMPLATE_XML;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);