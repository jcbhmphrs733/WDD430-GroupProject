// Database configuration and utility functions
import { sql } from '@vercel/postgres';

export { sql };

// Example database functions for your Handcrafted Haven project
export async function getUsers() {
  try {
    const result = await sql`SELECT * FROM users`;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function createUser(name: string, email: string) {
  try {
    const result = await sql`
      INSERT INTO users (name, email) 
      VALUES (${name}, ${email}) 
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create user.');
  }
}

// Add more database functions as needed for your project
