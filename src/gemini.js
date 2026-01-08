import { GoogleGenerativeAI } from '@google/generative-ai';

const BASE_PROMPT = `You are an expert writing assistant specializing in humanizing AI-generated content.
Your goal is to refine the provided text to make it sound more natural, engaging, and human-like while strictly preserving all HTML formatting.

Key Instructions:
1. **Preserve HTML**: Do not remove, change, or add any HTML tags (like <b>, <i>, <ul>, <li>, <a>, <p>). Only modify the text content *inside* or *around* the tags.
2. **Simplicity is Key**: Keep sentences simple and use simple words. Avoid complex vocabulary.
3. **No Emojis or Em-dashes**: Strictly DO NOT use emojis or em-dashes (—).
4. **Avoid Jargon**: Do not use unnecessary jargon.
5. **Natural Flow**: Ensure correct grammar but avoid excessive punctuation and over-structuring.
6. **Tone**: Aim for a conversational yet professional tone.

Input format is HTML. Your output MUST be the humanized version in the exact same HTML structure.`;

export async function humanizeText(htmlContent, apiKey, customGuidelines = '') {
    if (!apiKey) throw new Error('Gemini API Key is missing. Please add it in settings.');

    const genAI = new GoogleGenerativeAI(apiKey);

    // Re-prioritizing Gemini 1.5 models as they are the standard for the Google AI 'Free Tier'.
    // 2.0/2.5 often have a '0' limit on free accounts until billing is verified.
    const modelsToTry = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-flash-latest",
        "gemini-2.0-flash",
        "gemini-pro"
    ];
    let lastError = null;

    for (const modelName of modelsToTry) {
        try {
            console.log(`Attempting humanization with model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `${BASE_PROMPT}

${customGuidelines ? `Additional User Guidelines: ${customGuidelines}` : ''}

Original AI Content (HTML):
${htmlContent}

Humanized Output (HTML):`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            // Remove markdown block backticks if the model accidentally included them
            return text.replace(/^```html\n?/, '').replace(/\n?```$/, '');
        } catch (error) {
            console.error(`Failed with model ${modelName}:`, error);
            lastError = error;
            // If it's a 404 (model not found), we try the next one
            if (error.message.includes('404') || error.message.includes('not found')) {
                continue;
            }
            // If it's another error (e.g. key issue), we stop and throw
            throw error;
        }
    }

    throw lastError || new Error('All humanization models failed. Please check your API key and region compatibility.');
}
