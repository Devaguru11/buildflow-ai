import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const blueprintSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    executiveSummary: { type: Type.STRING },
    industry: { type: Type.STRING },
    readinessScore: { type: Type.NUMBER },
    confidenceRatio: { type: Type.NUMBER, description: "Architectural confidence score (0.0-1.0)" },
    enterpriseComplexity: { type: Type.NUMBER, description: "Scale of implementation complexity (1-10)" },
    techStack: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    systemArchitecture: { type: Type.STRING, description: "Mermaid graph TD diagram" },
    userFlow: { type: Type.STRING, description: "Mermaid flowchart TD diagram" },
    adminFlow: { type: Type.STRING, description: "Mermaid flowchart TD diagram" },
    backendRequestFlow: { type: Type.STRING, description: "Mermaid flowchart TD diagram" },
    authFlow: { type: Type.STRING, description: "Mermaid flowchart TD diagram" },
    databaseSchema: { type: Type.STRING, description: "SQL DDL with types" },
    erDiagram: { type: Type.STRING, description: "Mermaid erDiagram" },
    apiStructure: { 
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          path: { type: Type.STRING },
          method: { type: Type.STRING },
          purpose: { type: Type.STRING },
          authRequired: { type: Type.BOOLEAN }
        }
      }
    },
    mindMap: { type: Type.STRING, description: "Mermaid mindmap" },
    mvpFeatures: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          feature: { type: Type.STRING },
          priority: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    },
    advancedFeatures: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          feature: { type: Type.STRING },
          timeline: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    },
    mvpRoadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          week: { type: Type.NUMBER },
          tasks: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }
    },
    deploymentStrategy: { type: Type.STRING },
    costEstimation: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          service: { type: Type.STRING },
          tier: { type: Type.STRING },
          monthlyCost: { type: Type.STRING }
        }
      }
    },
    techStackRecommendation: { type: Type.STRING },
    scalingStrategy: { type: Type.STRING },
    securityRecommendations: { type: Type.STRING },
    criticalFailurePoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Identifying technical bottlenecks" },
    investorMode: {
      type: Type.OBJECT,
      properties: {
        pitch: { type: Type.STRING },
        monetization: { type: Type.STRING },
        marketAnalysis: { type: Type.STRING },
        competitiveAdvantage: { type: Type.STRING }
      }
    },
    finalCtoRecommendations: { type: Type.STRING }
  },
  required: ["title", "systemArchitecture", "userFlow", "databaseSchema", "confidenceRatio", "enterpriseComplexity", "erDiagram"]
};

export async function generateBlueprint(idea: string, options: any) {
  const prompt = `
    Build an EXHAUSTIVE, ELITE technical execution blueprint for the following startup idea:
    Product Idea: "${idea}"
    Preferred Tech Stack: "${options.techStack || "Recommend best-in-class stack"}"
    Industry: "${options.industry || "General Tech"}"
    Platform Strategy: "${options.platform || "Cloud-Native"}"
    Deployment Preference: "${options.deployment || "Cloud Run"}"
    Priority Factor: "${options.priority || "Speed"}"
    Security Requirement: "${options.security || "High"}"
    Infrastructure: "${options.infrastructure || "Containerized"}"
    Data Layer: "${options.databaseType || "SQL"}"
    Network Protocol: "${options.protocol || "REST"}"
    
    Generation Requirements (STRICT):
    1. SYSTEM ARCHITECTURE: Mermaid graph TD. Be detailed about services.
    2. USER FLOW: Mermaid flowchart TD. From login to core action.
    3. ER DIAGRAM: 
       - USE STRICT Mermaid erDiagram syntax.
       - FORMAT: ENTITY1 relation ENTITY2 : "label"
       - DO NOT OMIT DOUBLE QUOTES AROUND LABELS.
       - DO NOT USE SPACES IN ENTITY NAMES.
       - Example: User ||--o{ Project : "manages"
    4. DATABASE SCHEMA: Professional SQL DDL.
    5. INVESTOR MODE: Provide a high-impact pitch and detailed monetization.
    
    Output strictly as valid JSON matching the schema. Do not truncate strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: blueprintSchema,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        systemInstruction: "You are a World-Class Principal Solution Architect and Startup CTO. Your blueprints are used for seed-funding and Day-Zero implementation. Be technically precise. Ensure Mermaid erDiagram syntax is perfect with quoted labels."
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error. Raw Text:", text);
      throw new Error("Blueprint synthesis interrupted. Please refine your vision and retry.");
    }
  } catch (error) {
    console.error("Blueprint Generation Error:", error);
    throw error;
  }
}

