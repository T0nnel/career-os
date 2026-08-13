import { db } from "@/db";
import { candidateProfiles, candidateDocuments, documentChunks } from "@/db/schema";
import { MockAIProvider } from "@/integrations/ai/mock-provider";
import { eq } from "drizzle-orm";

const aiProvider = new MockAIProvider();

export class SourceOfTruthService {
  /**
   * Retrieves the canonical candidate profile by user ID.
   */
  async getCandidateProfile(userId: string) {
    const profile = await db.select().from(candidateProfiles).where(eq(candidateProfiles.userId, userId)).limit(1);
    return profile[0] || null;
  }

  /**
   * Upserts a canonical candidate profile.
   */
  async saveCandidateProfile(userId: string, data: any) {
    const existing = await this.getCandidateProfile(userId);
    if (existing) {
      await db.update(candidateProfiles).set(data).where(eq(candidateProfiles.id, existing.id));
      return existing.id;
    } else {
      const inserted = await db.insert(candidateProfiles).values({ userId, ...data }).returning();
      return inserted[0].id;
    }
  }

  /**
   * Saves a document (e.g. CV) and chunks/indexes it.
   */
  async addCandidateDocument(candidateId: string, title: string, content: string, type: string) {
    // 1. Save raw document
    const doc = await db.insert(candidateDocuments).values({
      candidateId,
      title,
      content,
      type,
      source: "user-upload",
    }).returning();
    
    const documentId = doc[0].id;

    // 2. Chunk document (simplistic implementation for now)
    const chunks = this.chunkText(content, 500);

    // 3. Generate embeddings and save chunks
    for (const chunk of chunks) {
      const embedding = await aiProvider.embed(chunk);
      await db.insert(documentChunks).values({
        documentId,
        content: chunk,
        embedding,
      });
    }

    return documentId;
  }

  private chunkText(text: string, maxLength: number): string[] {
    const chunks: string[] = [];
    let currentIndex = 0;
    while (currentIndex < text.length) {
      chunks.push(text.slice(currentIndex, currentIndex + maxLength));
      currentIndex += maxLength;
    }
    return chunks;
  }
}
