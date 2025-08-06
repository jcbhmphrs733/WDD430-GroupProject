'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function deleteAndReseedDatabase() {
  try {
    console.log('Starting database deletion and re-seeding...');

    // Step 1: Drop all tables in correct order (reverse dependency order)
    await sql`DROP TABLE IF EXISTS favorites CASCADE;`;
    await sql`DROP TABLE IF EXISTS reviews CASCADE;`;
    await sql`DROP TABLE IF EXISTS artpieces CASCADE;`;
    await sql`DROP TABLE IF EXISTS categories CASCADE;`;
    await sql`DROP TABLE IF EXISTS users CASCADE;`;
    
    // Drop views
    await sql`DROP VIEW IF EXISTS user_stats CASCADE;`;
    await sql`DROP VIEW IF EXISTS artpieces_with_details CASCADE;`;
    
    // Drop functions
    await sql`DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;`;
    
    // Drop extension (if needed)
    await sql`DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;`;

    console.log('Tables and views dropped successfully');

    // Step 2: Read and execute schema.sql
    const schemaPath = join(process.cwd(), 'database', 'schema.sql');
    const schemaContent = await readFile(schemaPath, 'utf-8');
    
    // Execute the schema as a single statement to handle dependencies properly
    await sql.query(schemaContent);

    console.log('Schema created successfully');

    // Step 3: Read and execute seed.sql
    const seedPath = join(process.cwd(), 'database', 'seed.sql');
    const seedContent = await readFile(seedPath, 'utf-8');
    
    // Execute the seed data as a single statement
    await sql.query(seedContent);

    console.log('Database re-seeded successfully');

    // Revalidate the test-db page to show updated data
    revalidatePath('/test-db');

    return { 
      success: true, 
      message: 'Database successfully deleted and re-seeded with fresh data!' 
    };

  } catch (error) {
    console.error('Error during database reset:', error);
    return { 
      success: false, 
      message: `Failed to reset database: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}
