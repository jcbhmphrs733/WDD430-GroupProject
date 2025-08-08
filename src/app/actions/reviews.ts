'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addReview } from '@/lib/database';
import { getCurrentUser } from '@/lib/session';

export async function submitReview(formData: FormData) {
  try {
    // Get the current user session
    const user = await getCurrentUser();
    
    if (!user || !user.id) {
      throw new Error('You must be logged in to submit a review');
    }

    // Extract form data
    const artpieceId = formData.get('artpieceId')?.toString();
    const rating = Number(formData.get('rating')?.toString());
    const comment = formData.get('comment')?.toString()?.trim();

    // Validate required fields
    if (!artpieceId) {
      throw new Error('Artpiece ID is required');
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Add the review to the database
    await addReview(
      artpieceId,
      user.id.toString(), // Convert to string for UUID
      rating,
      comment || undefined
    );

    // Revalidate the artpiece page to show the new review
    revalidatePath(`/artpieces/${artpieceId}`);
    
    // Return success response
    return { success: true, message: 'Review submitted successfully!' };

  } catch (error) {
    console.error('Error submitting review:', error);
    
    // Return error response
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to submit review'
    };
  }
}

export async function submitReviewAndRedirect(formData: FormData) {
  const result = await submitReview(formData);
  
  if (result.success) {
    const artpieceId = formData.get('artpieceId')?.toString();
    if (artpieceId) {
      redirect(`/artpieces/${artpieceId}`);
    }
  }
  
  // If there's an error, you might want to handle it differently
  // For now, we'll just throw the error to be handled by the component
  if (!result.success) {
    throw new Error(result.message);
  }
}
