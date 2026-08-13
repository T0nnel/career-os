# AI Career Intelligence OS - Architecture

## Core Philosophy
This system functions as a true AI career operating system. The candidate's information is the central source of truth, and every downstream action (job matching, resume tailoring, cover letter generation) is derived from this truth.

## Modules

### 1. Source of Truth
- **Role:** Canonical representation of the candidate (skills, projects, work history, writing style).
- **Data Store:** Relational data stored in PostgreSQL, with vector embeddings generated via `pgvector` for semantic search retrieval.
- **Workflow:** User uploads historical documents (CVs, cover letters), which are parsed, chunked, and embedded.

### 2. Ideal Employer Profile (IEP) & Lead Generation
- **Role:** Defines configurable criteria for employers and automates discovery.
- **Providers:**
  - **Exa AI:** Web research for discovering relevant companies, engineering blogs, open roles.
  - **Apify:** Web scraping and structured extraction of jobs and company data.
  - **Apollo:** Enrichment of companies and decision-makers (contacts).
- **Workflow:** Background workers periodically fetch data based on the IEP, normalize it, and deduplicate it before storing.

### 3. AI Output Engine
- **Role:** Matches opportunities and generates tailored assets without inventing facts.
- **Personas:** Reusable system instructions (e.g., Senior Technical Recruiter, Resume Specialist) controlling the tone and focus of the generation.
- **Workflow:** 
  `Source of Truth + Employer/Job Data + Persona → Output (Tailored CV, Cover Letter)`

### 4. Outbound / Application Engine
- **Role:** Facilitates application submission, tracking, and email outreach.
- **Human-in-the-Loop:** CRITICAL. The system queues prepared applications. Any missing or ambiguous information flags the application for review. The user must explicitly approve before submission.

## Technical Stack
- **Framework:** Next.js (App Router, Server Actions)
- **Database:** PostgreSQL with `pgvector` via Drizzle ORM
- **Background Jobs:** Redis + BullMQ
- **Styling:** Tailwind CSS + shadcn/ui
- **AI Abstraction:** Unified provider interface supporting OpenAI, Anthropic, Gemini, or local models.
