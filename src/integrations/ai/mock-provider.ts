import { AIProvider } from "../interfaces";

export class MockAIProvider implements AIProvider {
  async generate(prompt: string, persona?: string): Promise<string> {
    console.log(`[MockAIProvider] Generating text with persona: ${persona}`);
    return "This is a mock AI response generated for development purposes.";
  }

  async structuredGenerate<T>(prompt: string, schema: any, persona?: string): Promise<T> {
    console.log(`[MockAIProvider] Generating structured data with persona: ${persona}`);
    // Return a mock object satisfying basic expected structures
    return {} as T;
  }

  async embed(text: string): Promise<number[]> {
    console.log(`[MockAIProvider] Embedding text of length ${text.length}`);
    // Return a dummy vector of 1536 dimensions
    return Array(1536).fill(0.01);
  }
}
