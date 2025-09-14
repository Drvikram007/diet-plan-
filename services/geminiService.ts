import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, DietPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const mealSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "Name of the meal." },
        ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of ingredients with quantities."
        },
        instructions: { type: Type.STRING, description: "Simple preparation instructions." }
    },
    required: ["name", "ingredients", "instructions"]
};

const dailyPlanSchema = {
    type: Type.OBJECT,
    properties: {
        day: { type: Type.STRING, description: "The specific day of the plan (e.g., Day 1, Day 2)." },
        breakfast: mealSchema,
        lunch: mealSchema,
        dinner: mealSchema,
        snacks: mealSchema
    },
    required: ["day", "breakfast", "lunch", "dinner", "snacks"]
};

const dietPlanSchema = {
    type: Type.ARRAY,
    description: "A diet plan for the specified duration (e.g., 7 or 30 days).",
    items: dailyPlanSchema
};

const buildPrompt = (userInput: UserInput): string => {
    const durationDays = userInput.duration === '7-Day' ? 7 : 30;

    let prompt = `Generate a detailed ${durationDays}-day diet and nutrition plan in the ${userInput.language} language.`;
    prompt += ` The plan is for ${userInput.name}, a ${userInput.age}-year-old person, with the primary health condition of "${userInput.condition}".`;

    if (userInput.comorbidity) {
        prompt += ` They also have the following comorbidities: "${userInput.comorbidity}".`;
    }

    if (userInput.goals) {
        prompt += ` Their primary goals are: "${userInput.goals}".`;
    }
    if (userInput.preferences.length > 0) {
        prompt += ` The diet must adhere to these preferences: ${userInput.preferences.join(", ")}.`;
    }
    if (userInput.allergies) {
        prompt += ` The person has the following allergies which must be strictly avoided: "${userInput.allergies}".`;
    }

    prompt += `
The plan should be balanced, nutritious, and specifically tailored to help manage the specified health condition(s).
For each of the ${durationDays} days, provide distinct meal options for breakfast, lunch, dinner, and snacks.
Each meal should include a name, a detailed list of ingredients with quantities, and simple, step-by-step preparation instructions.
The entire response, including meal names, ingredients, and instructions, must be in ${userInput.language}.
Ensure the entire response is a JSON object that strictly follows the provided schema. Each day in the plan should be labeled sequentially (e.g., "Day 1", "Day 2", etc.).
`;
    return prompt;
};

export const generateDietPlan = async (userInput: UserInput): Promise<DietPlan> => {
    try {
        const prompt = buildPrompt(userInput);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dietPlanSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const dietPlan = JSON.parse(jsonText);
        
        if (!Array.isArray(dietPlan) || dietPlan.length === 0) {
            throw new Error("Received an invalid or empty diet plan from the API.");
        }

        return dietPlan as DietPlan;
    } catch (error) {
        console.error("Error generating diet plan:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate diet plan: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the diet plan.");
    }
};