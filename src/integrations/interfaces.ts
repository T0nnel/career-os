export interface ScrapingProvider {
  scrapeJobs(query: string, options?: any): Promise<any[]>;
  scrapeCompany(domain: string): Promise<any>;
}

export interface SearchProvider {
  searchCompanies(query: string): Promise<any[]>;
  searchJobs(query: string): Promise<any[]>;
}

export interface EnrichmentProvider {
  enrichCompany(domain: string): Promise<any>;
  enrichPerson(profileUrl: string): Promise<any>;
}

export interface AIProvider {
  generate(prompt: string, persona?: string): Promise<string>;
  structuredGenerate<T>(prompt: string, schema: any, persona?: string): Promise<T>;
  embed(text: string): Promise<number[]>;
}
