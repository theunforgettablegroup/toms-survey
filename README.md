# Generic Survey Platform

## Overview

This project is a reusable survey platform built with Next.js, React, and Supabase. It loads questions and answers from the database, walks users through a questionnaire, stores responses, and generates a default outcome classification.

The app is intentionally generic so it can be reused for different survey topics. You can customize:

- Question/answer content in Supabase
- Outcome rules in `src/pages/survey/index.tsx`
- Outcome catalog text in `src/data/outcomes.ts`

## Features

- Database-driven survey questions and answer choices
- Session-level response tracking with completion status
- Generic outcome generation with configurable scoring rules
- Responsive UI suitable for desktop and mobile
- Privacy policy and analytics disclosure banner

## Project Structure

```
src/
   components/
      AnalyticsBanner.tsx      # Analytics disclosure notice
      ProfileCard.tsx          # Generic outcome card view
      Question.tsx             # Question and answer button UI
   data/
      outcomes.ts              # Default reusable outcomes
   pages/
      index.tsx                # Landing page
      survey/index.tsx         # Survey flow and response persistence
      results.tsx              # Selected outcome view
      all-profiles.tsx         # Outcome catalog page
      privacy-policy/index.tsx # Privacy policy page
supabase/
   migrations/               # Schema evolution and data model
```

# Prerequisites

Before you begin, ensure you have the following installed and set up:

1. **Node.js (via nvm recommended):**
   - Install [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)
   - Use nvm to install the required Node.js version (see `package.json` for the version used in this project):
     ```
     nvm install
     nvm use
     ```

2. **Docker Desktop:**
   - Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - Make sure Docker Desktop is running before starting Supabase locally.

3. **Supabase CLI:**
   - Install globally with:
     ```
     npm install -g supabase
     ```

4. **npm (Node Package Manager):**
   - Comes with Node.js, but ensure you have it available:
     ```
     npm -v
     ```

## Environment Variables Setup

Before running the app, you need to configure environment variables for Supabase:

1. In the project root, create a `.env.local` file (and optionally a `.env` file for shared settings).
2. Go to your Supabase project dashboard and navigate to **Project Settings > API**.
3. Copy the following values from the Supabase console:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Paste them into your `.env.local` file like this:
   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-anon-key
   ```
5. Save the file. The app will now use these credentials to connect to Supabase.

---

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd toms-survey
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running Supabase Locally

To run Supabase locally and ensure your database is up-to-date and seeded:

1. **Install Supabase CLI** (if not already installed):

   ```
   npm install -g supabase
   ```

2. **Start Supabase locally**:

   ```
   supabase start
   ```

   This will start Supabase services (database, API, etc.) locally.

3. **Run database migrations**:

   ```
   supabase db push
   ```

   This applies all migrations in the `supabase/migrations` directory to your local database.

4. **Seed the database**:

   ```
   npm run seed:questions
   ```

   This will run the script in `scripts/seedQuestions.ts` to populate initial data.

5. **Connect your app to local Supabase**:
   Ensure your environment variables (e.g., `SUPABASE_URL`, `SUPABASE_ANON_KEY`) are set to use the local instance. Refer to Supabase docs for details.

---

## Running the Application

To start the development server, run:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Customizing for a New Survey

1. Seed your own survey questions and answers in Supabase.
2. Update `deriveSurveyOutcome` in `src/pages/survey/index.tsx` with your own business logic.
3. Replace default entries in `src/data/outcomes.ts` with domain-specific outcomes.
4. Optionally update page copy and theme tokens in `src/styles/theme.ts`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
