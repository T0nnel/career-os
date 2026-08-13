import { pgTable, text, uuid, timestamp, jsonb, integer } from "drizzle-orm/pg-core";

export const candidateProfiles = pgTable("candidate_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // Assuming a users table will be added
  fullName: text("full_name").notNull(),
  professionalTitle: text("professional_title"),
  location: text("location"),
  email: text("email"),
  phone: text("phone"),
  portfolioUrl: text("portfolio_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  otherProfiles: jsonb("other_profiles").default([]),
  workAuthorization: text("work_authorization"),
  remotePreferences: text("remote_preferences"),
  yearsOfExperience: integer("years_of_experience"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const candidateSkills = pgTable("candidate_skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").references(() => candidateProfiles.id).notNull(),
  skill: text("skill").notNull(),
  category: text("category").notNull(),
  proficiency: text("proficiency"),
  yearsUsed: integer("years_used"),
  lastUsed: text("last_used"), // e.g., "2023"
  evidence: jsonb("evidence").default([]),
  projects: jsonb("projects").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const candidateProjects = pgTable("candidate_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").references(() => candidateProfiles.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  problem: text("problem"),
  solution: text("solution"),
  technologies: jsonb("technologies").default([]),
  responsibilities: jsonb("responsibilities").default([]),
  impact: text("impact"),
  metrics: jsonb("metrics").default([]),
  repositoryUrl: text("repository_url"),
  liveUrl: text("live_url"),
  relevantSkills: jsonb("relevant_skills").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const candidateExperience = pgTable("candidate_experience", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").references(() => candidateProfiles.id).notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"), // null if current
  responsibilities: jsonb("responsibilities").default([]),
  achievements: jsonb("achievements").default([]),
  technologies: jsonb("technologies").default([]),
  quantifiableResults: jsonb("quantifiable_results").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
