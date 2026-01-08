import './style.css';
import Quill from 'quill';
import { humanizeText } from './gemini.js';

// DOM Elements
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const saveSettings = document.getElementById('saveSettings');
const testApiBtn = document.getElementById('testApiBtn');
const apiKeyInput = document.getElementById('apiKey');
const customGuidelinesInput = document.getElementById('customGuidelines');

const humanizeBtn = document.getElementById('humanizeBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const loader = humanizeBtn.querySelector('.loader');
const btnText = humanizeBtn.querySelector('.btn-text');

// Initialize Editors
const quillOptions = {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ]
    }
};

const sourceEditor = new Quill('#sourceEditor', quillOptions);
const outputEditor = new Quill('#outputEditor', {
    ...quillOptions,
    placeholder: 'Humanized text will appear here...'
});

// Load Settings
const loadSettings = () => {
    const settings = JSON.parse(localStorage.getItem('humanize_settings') || '{}');
    apiKeyInput.value = settings.apiKey || '';
    customGuidelinesInput.value = settings.customGuidelines || '';
};

const saveSettingsToLocal = () => {
    const settings = {
        apiKey: apiKeyInput.value,
        customGuidelines: customGuidelinesInput.value
    };
    localStorage.setItem('humanize_settings', JSON.stringify(settings));
    settingsModal.classList.add('hidden');
};

// Event Listeners
settingsBtn.onclick = () => settingsModal.classList.remove('hidden');
closeSettings.onclick = () => settingsModal.classList.add('hidden');
saveSettings.onclick = saveSettingsToLocal;

testApiBtn.onclick = async () => {
    const key = apiKeyInput.value;
    if (!key) {
        alert('Please enter an API key first.');
        return;
    }

    testApiBtn.innerText = 'Checking...';
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        if (data.models) {
            alert(`✅ Connection Successful!\nYour key has access to ${data.models.length} models.`);
            console.log('Available Models:', data.models);
        } else {
            alert('❌ Connection Failed: ' + (data.error?.message || 'Invalid API key or response.'));
        }
    } catch (e) {
        alert('❌ Error: ' + e.message);
    } finally {
        testApiBtn.innerText = 'Check Connection';
    }
};

window.onclick = (event) => {
    if (event.target === settingsModal) {
        settingsModal.classList.add('hidden');
    }
};

clearBtn.onclick = () => {
    sourceEditor.setText('');
    outputEditor.setText('');
};

copyBtn.onclick = () => {
    const html = outputEditor.root.innerHTML;
    // For rich text copying, we'd ideally use the Clipboard API with 'text/html'
    // but for simplicity, we'll copy as HTML text for now.
    // Enhanced copy to clipboard:
    const blob = new Blob([html], { type: 'text/html' });
    const textBlob = new Blob([outputEditor.getText()], { type: 'text/plain' });
    const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': textBlob })];

    navigator.clipboard.write(data).then(() => {
        copyBtn.innerText = 'Copied!';
        setTimeout(() => copyBtn.innerText = 'Copy', 2000);
    });
};

humanizeBtn.onclick = async () => {
    const htmlContent = sourceEditor.root.innerHTML;
    if (!htmlContent || sourceEditor.getText().trim().length === 0) {
        alert('Please enter some text to humanize.');
        return;
    }

    const { apiKey, customGuidelines } = JSON.parse(localStorage.getItem('humanize_settings') || '{}');
    if (!apiKey) {
        alert('Please add your Gemini API Key in Settings.');
        settingsModal.classList.remove('hidden');
        return;
    }

    setLoading(true);
    try {
        const humanizedHtml = await humanizeText(htmlContent, apiKey, customGuidelines);
        outputEditor.root.innerHTML = humanizedHtml;
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        setLoading(false);
    }
};

function setLoading(isLoading) {
    humanizeBtn.disabled = isLoading;
    if (isLoading) {
        loader.classList.remove('hidden');
        btnText.innerText = 'Humanizing...';
    } else {
        loader.classList.add('hidden');
        btnText.innerText = 'Humanize Text';
    }
}

// Initial Load
loadSettings();
