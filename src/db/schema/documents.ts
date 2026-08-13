import { pgTable, text, uuid, timestamp, jsonb, vector } from "drizzle-orm/pg-core";
import { candidateProfiles } from "./candidates";

export const candidateDocuments = pgTable("candidate_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").references(() => candidateProfiles.id).notNull(),
  type: text("type").notNull(), // e.g., 'resume', 'cover_letter', 'writing_sample'
  title: text("title").notNull(),
  content: text("content").notNull(), // raw text content
  tags: jsonb("tags").default([]),
  skills: jsonb("skills").default([]),
  relevance: jsonb("relevance").default([]),
  source: text("source").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const documentChunks = pgTable("document_chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  documentId: uuid("document_id").references(() => candidateDocuments.id).notNull(),
  content: text("content").notNull(),
  embedding: vector("embedding", { dimensions: 1536 }), // OpenAI default dimension
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
