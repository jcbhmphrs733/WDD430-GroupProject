'use server';

import { sql } from '@vercel/postgres';
import { getCurrentUser } from '@/lib/session';

export async function deleteAccount(userId: string) {
  try {
    // Get the current user to verify they're authorized
    const currentUser = await getCurrentUser();
    
    if (!currentUser || currentUser.id.toString() !== userId) {
      return {
        success: false,
        message: 'Unauthorized: You can only delete your own account.'
      };
    }

    // Delete the user account (CASCADE will handle related data)
    const result = await sql`
      DELETE FROM users 
      WHERE id = ${userId}
      RETURNING id
    `;

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'Account not found or already deleted.'
      };
    }

    return {
      success: true,
      message: 'Account successfully deleted.'
    };
    
  } catch (error) {
    console.error('Error deleting account:', error);
    return {
      success: false,
      message: 'Failed to delete account. Please try again.'
    };
  }
}
