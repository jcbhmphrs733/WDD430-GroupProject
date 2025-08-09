'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { updateUser } from '@/lib/database';
import { getCurrentUser } from '@/lib/session';

export async function updateProfile(formData: FormData) {
  // Get the current user to verify they're logged in
  const currentUser = await getCurrentUser();
  
  if (!currentUser || !currentUser.id) {
    redirect('/login?error=' + encodeURIComponent('You must be logged in to update your profile'));
  }

  // Extract form data
  const userId = formData.get('userId')?.toString();
  const first_name = formData.get('first_name')?.toString() ?? '';
  const last_name = formData.get('last_name')?.toString() ?? '';
  const username = formData.get('username')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const bio = formData.get('bio')?.toString() ?? '';
  const profile_image_url = formData.get('profile_image_url')?.toString() ?? '';

  // Verify the user is updating their own profile
  if (currentUser.id.toString() !== userId) {
    redirect(`/profile/${userId}/edit?error=` + encodeURIComponent('You can only update your own profile'));
  }

  // Validate required fields
  if (!first_name || !last_name || !username || !email) {
    redirect(`/profile/${userId}/edit?error=` + encodeURIComponent('First name, last name, username, and email are required'));
  }

  try {
    // Update the user in the database
    await updateUser(userId, {
      first_name,
      last_name,
      username,
      email,
      bio: bio || null,
      profile_image_url: profile_image_url || null,
    });

    // Revalidate the profile page to show updated data
    revalidatePath(`/profile/${userId}`);
    
  } catch (error) {
    console.error('Error updating profile:', error);
    redirect(`/profile/${userId}/edit?error=` + encodeURIComponent(error instanceof Error ? error.message : 'Failed to update profile'));
  }

  // Redirect to the profile page (this must be outside try-catch)
  redirect(`/profile/${userId}`);
}
