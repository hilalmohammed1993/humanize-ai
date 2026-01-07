import { GoogleGenerativeAI } from '@google/generative-ai';

const BASE_PROMPT = `You are an expert writing assistant specializing in humanizing AI-generated content.
Your goal is to refine the provided text to make it sound more natural, engaging, and human-like while strictly preserving all HTML formatting.

Key Instructions:
1. **Preserve HTML**: Do not remove, change, or add any HTML tags (like <b>, <i>, <ul>, <li>, <a>, <p>). Only modify the text content *inside* or *around* the tags.
2. **Increase Burstiness**: Vary sentence length and structure. Mix short, punchy sentences with longer, more complex ones.
3. **Enhance Lexical Diversity**: Use a wider range of vocabulary. Avoid overused LLM words (e.g., "delve", "crucial", "tapestry", "leverage", "comprehensive").
4. **Reduce Over-Structuring**: Break up formulaic patterns like "Firstly... Secondly... Finally..." unless they are part of a list tag.
5. **Tone**: Aim for a conversational yet professional tone that feels written by a human expert.

Input format is HTML. Your output MUST be the humanized version in the exact same HTML structure.`;

export async function humanizeText(htmlContent, apiKey, customGuidelines = '') {
    if (!apiKey) throw new Error('Gemini API Key is missing. Please add it in settings.');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${BASE_PROMPT}

${customGuidelines ? `Additional User Guidelines: ${customGuidelines}` : ''}

Original AI Content (HTML):
${htmlContent}

Humanized Output (HTML):`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Remove markdown block backticks if the model accidentally included them
        text = text.replace(/^```html\n?/, '').replace(/\n?```$/, '');

        return text;
    } catch (error) {
        console.error('Humanization failed:', error);
        throw error;
    }
}
