'use server';

import { getCurrentUser } from '@/lib/session';
import { sql } from '@/lib/database';

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

    // Delete related records and the artpiece
    try {
      // Delete related reviews first
      await sql`DELETE FROM reviews WHERE artpiece_id = ${artpieceId}`;
      
      // Delete related favorites
      await sql`DELETE FROM favorites WHERE artpiece_id = ${artpieceId}`;
      
      // Delete the artpiece itself
      const deleteResult = await sql`DELETE FROM artpieces WHERE id = ${artpieceId}`;
      
      if (deleteResult.rowCount === 0) {
        return {
          success: false,
          message: 'Artpiece not found or already deleted'
        };
      }
      
      
      return {
        success: true,
        message: 'Artpiece deleted successfully'
      };
    } catch (deleteError) {
      console.error('Database error during deletion:', deleteError);
      throw deleteError;
    }
  } catch (error) {
    console.error('Error deleting artpiece:', error);
    
    // Provide more specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('foreign key')) {
        return {
          success: false,
          message: 'Cannot delete artpiece: it has associated reviews or favorites that cannot be removed.'
        };
      }
      if (error.message.includes('not found')) {
        return {
          success: false,
          message: 'Artpiece not found.'
        };
      }
      return {
        success: false,
        message: `Failed to delete artpiece: ${error.message}`
      };
    }
    
    return {
      success: false,
      message: 'Failed to delete artpiece. Please try again.'
    };
  }
}
