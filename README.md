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
4. **Deploy**: The project is pre-configured for GitHub Pages. Simply run `npm run build` and push the `dist` folder.

## Setup
1. Open the app.
2. Click the **Settings (⚙️)** icon.
3. Paste your **Gemini API Key** (Get it free at [Google AI Studio](https://aistudio.google.com/app/apikey)).
4. (Optional) Add your custom humanization guidelines.
5. Click **Save Changes**.

## How to Use
1. Paste your AI-generated draft into the **Original AI Draft** pane.
2. Click **Humanize Text**.
3. Review and copy the result from the **Humanized Version** pane.
