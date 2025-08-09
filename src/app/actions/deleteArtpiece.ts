'use server';

import { getCurrentUser } from '@/lib/session';
import { sql } from '@/lib/database';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function deleteArtpiece(artpieceId: string) {
  try {
    const user = await getCurrentUser();
    
    if (!user?.id) {
      return {
        success: false,
        message: 'You must be logged in to delete an artpiece'
      };
    }

    // First verify that the user is the creator of this artpiece
    const verifyResult = await sql`
      SELECT creator_id FROM artpieces WHERE id = ${artpieceId}
    `;

    if (verifyResult.rows.length === 0) {
      return {
        success: false,
        message: 'Artpiece not found'
      };
    }

    if (verifyResult.rows[0].creator_id !== user.id) {
      return {
        success: false,
        message: 'You can only delete your own artpieces'
      };
    }

    // Begin transaction to delete related records first
    await sql`BEGIN`;

    try {
      // Delete related reviews
      await sql`DELETE FROM reviews WHERE artpiece_id = ${artpieceId}`;
      
      // Delete related favorites
      await sql`DELETE FROM user_favorites WHERE artpiece_id = ${artpieceId}`;
      
      // Delete the artpiece itself
      await sql`DELETE FROM artpieces WHERE id = ${artpieceId}`;
      
      // Commit the transaction
      await sql`COMMIT`;
      
      // Revalidate relevant pages
      revalidatePath('/discover');
      revalidatePath('/profile');
      revalidatePath(`/artpieces/${artpieceId}`);
      
      return {
        success: true,
        message: 'Artpiece deleted successfully'
      };
    } catch (error) {
      // Rollback the transaction on error
      await sql`ROLLBACK`;
      throw error;
    }
  } catch (error) {
    console.error('Error deleting artpiece:', error);
    return {
      success: false,
      message: 'Failed to delete artpiece. Please try again.'
    };
  }
}
