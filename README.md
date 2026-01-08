# Humanize AI - Standalone Web App

A post-processing tool designed to refine AI-generated content into natural, human-like writing while preserving rich text formatting.

## Features
- **Format Preservation**: Keeps your bold text, lists, and links intact.
- **Humanization Engine**: Uses Gemini AI to improve burstiness, variance, and lexical diversity.
- **Privacy Focus**: Your API Key is stored locally in your browser and never leaves your machine except to talk to Google's API.
- **Custom Guidelines**: Input your own style requirements for personalized results.

## Getting Started
1. **Clone the repo**: `git clone <your-repo-url>`
2. **Install dependencies**: `npm install`
3. **Run locally**: `npm run dev`
4. **Deploy**: This project is configured with **GitHub Actions**. Simply push your changes to the `main` branch, and it will automatically build and deploy to GitHub Pages.

## Setup
1. Open the app.
2. Click the **Settings (⚙️)** icon.
3. **Get your API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Create a free key for "Gemini 1.5 Flash".
4. Paste the key into the settings modal.
5. (Optional) Add your custom humanization guidelines.
6. Click **Save Changes**.

## 🔒 Privacy & Security
This is a **standalone static application**. 
- **Local Storage**: Your API key is stored only in your browser's local storage.
- **Direct Connection**: The app communicates directly from your browser to Google's Gemini API.
- **No Data Collection**: There is no backend server. Your text and keys are never shared with the developers or any third party.

## How to Use
1. Paste your AI-generated draft into the **Original AI Draft** pane.
2. Click **Humanize Text**.
3. Review and copy the result from the **Humanized Version** pane.
