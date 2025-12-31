import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const BACKLOG_PATH = path.resolve(process.cwd(), 'BACKLOG.md');
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set. Please add it to your environment or GitHub Secrets.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listAvailableModels() {
    console.log("--- Diagnostic: Listing Available Models ---");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found in the listing response.", JSON.stringify(data));
        }
    } catch (e) {
        console.error("Diagnostic: Failed to fetch model list.", e.message);
    }
    console.log("------------------------------------------");
}

const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

function getNextTask() {
    const content = fs.readFileSync(BACKLOG_PATH, 'utf-8');
    const lines = content.split('\n');
    const taskIndex = lines.findIndex(line => line.trim().startsWith('- [ ]'));

    if (taskIndex === -1) return null;

    const taskLine = lines[taskIndex];
    const taskName = taskLine.replace('- [ ]', '').trim();

    return { name: taskName, index: taskIndex, lines: lines };
}

function markTaskAsDone(task) {
    const { index, lines } = task;
    lines[index] = lines[index].replace('- [ ]', '- [x]');
    fs.writeFileSync(BACKLOG_PATH, lines.join('\n'));
}

async function getProjectContext() {
    // Read key files to provide context to Gemini
    const filesToRead = [
        'src/app/page.tsx',
        'src/app/layout.tsx',
        'package.json',
        'README.md'
    ];

    let context = "Project Context:\n";
    for (const file of filesToRead) {
        if (fs.existsSync(file)) {
            context += `\n--- File: ${file} ---\n${fs.readFileSync(file, 'utf-8')}\n`;
        }
    }
    return context;
}

async function implementFeature(taskName) {
    const context = await getProjectContext();
    const prompt = `
You are an autonomous senior software engineer. 
Your task is to implement the following feature for this Next.js project: "${taskName}"

${context}

Instructions:
1. Analyze the project structure and existing code.
2. Provide the complete code for any NEW files or MODIFIED files needed to implement this feature.
3. Use high-quality, production-ready code (TypeScript, Tailwind CSS).
4. Return the response in a structured format:
   FILE: [path/to/file]
   \`\`\`[language]
   [code]
   \`\`\`
   (Repeat for each file)

Only provide the files that need to be created or changed.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse files from response
    const fileRegex = /FILE: (.*?)\n+```.*?\n([\s\S]*?)```/g;
    let match;
    let filesUpdated = 0;

    while ((match = fileRegex.exec(text)) !== null) {
        const filePath = match[1].trim();
        const fileContent = match[2];

        const fullPath = path.resolve(process.cwd(), filePath);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(fullPath, fileContent);
        console.log(`Updated/Created file: ${filePath}`);
        filesUpdated++;
    }

    if (filesUpdated === 0) {
        console.log("No files were parsed from the AI response. Check the prompt/response format.");
        console.log("AI Response was:", text);
    }

    return filesUpdated > 0;
}

async function runSprint() {
    const activeTask = getNextTask();

    if (activeTask) {
        console.log(`Starting Autonomous Sprint for: ${activeTask.name}`);

        try {
            const success = await implementFeature(activeTask.name);
            if (success) {
                markTaskAsDone(activeTask);
                console.log(`Feature "${activeTask.name}" implemented and backlog updated.`);
            }
        } catch (error) {
            console.error("Error during AI code generation:", error);
            await listAvailableModels();
        }
    } else {
        console.log('No uncompleted tasks found in BACKLOG.md');
    }
}

runSprint();
