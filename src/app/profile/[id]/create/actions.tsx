'use server';
import { redirect } from 'next/navigation';
import { postNewArt } from '@/lib/database';

interface ValidationError {
  field: string;
  message: string;
}

function validateFormData(formData: FormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Get form values
  const title = formData.get('title')?.toString()?.trim() ?? '';
  const description = formData.get('description')?.toString()?.trim() ?? '';
  const priceStr = formData.get('price')?.toString()?.trim() ?? '';
  const hero_image_url = formData.get('hero_image_url')?.toString()?.trim() ?? '';
  const categoryStr = formData.get('category_id')?.toString()?.trim() ?? '';

  // Validate title
  if (!title) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (title.length < 3) {
    errors.push({ field: 'title', message: 'Title must be at least 3 characters long' });
  } else if (title.length > 100) {
    errors.push({ field: 'title', message: 'Title must be less than 100 characters' });
  }

  // Validate description
  if (!description) {
    errors.push({ field: 'description', message: 'Description is required' });
  } else if (description.length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters long' });
  } else if (description.length > 1000) {
    errors.push({ field: 'description', message: 'Description must be less than 1000 characters' });
  }

  // Validate price
  if (!priceStr) {
    errors.push({ field: 'price', message: 'Price is required' });
  } else {
    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      errors.push({ field: 'price', message: 'Price must be a valid number' });
    } else if (price < 0) {
      errors.push({ field: 'price', message: 'Price cannot be negative' });
    } else if (price > 10000) {
      errors.push({ field: 'price', message: 'Price cannot exceed $10,000' });
    }
  }

  // Validate image URL
  if (!hero_image_url) {
    errors.push({ field: 'hero_image_url', message: 'Image URL is required' });
  } else if (!hero_image_url.startsWith('/images/artpieces/')) {
    errors.push({ field: 'hero_image_url', message: 'Image URL must start with /images/artpieces/' });
  } else if (!hero_image_url.endsWith('.jpg') && !hero_image_url.endsWith('.jpeg') && !hero_image_url.endsWith('.png')) {
    errors.push({ field: 'hero_image_url', message: 'Image URL must end with .jpg, .jpeg, or .png' });
  }

  // Validate category
  if (!categoryStr) {
    errors.push({ field: 'category_id', message: 'Category is required' });
  } else {
    const categoryId = parseInt(categoryStr);
    if (isNaN(categoryId) || categoryId <= 0) {
      errors.push({ field: 'category_id', message: 'Please select a valid category' });
    }
  }

  return errors;
}

export async function addArtpiece(formData: FormData) {
  const creator_id = formData.get('creator_id')?.toString() ?? '';
  
  try {
    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map(err => `${err.field}: ${err.message}`).join('; ');
      redirect(`/profile/${creator_id}/create?error=${encodeURIComponent(errorMessages)}`);
    }

    // Extract validated data
    const title = formData.get('title')?.toString()?.trim() ?? '';
    const description = formData.get('description')?.toString()?.trim() ?? '';
    const price = parseFloat(formData.get('price')?.toString()?.trim() ?? '0');
    const hero_image_url = formData.get('hero_image_url')?.toString()?.trim() ?? '';
    const category_id = parseInt(formData.get('category_id')?.toString()?.trim() ?? '0');

    // Attempt to create the artpiece
    console.log('Creating artpiece with data:', {
      title, 
      description: description.substring(0, 50) + '...', 
      price, 
      hero_image_url, 
      category_id, 
      creator_id
    });

    const artpieceId = await postNewArt(
      title, 
      description, 
      price, 
      hero_image_url, 
      creator_id,
      category_id
    );

    console.log('Artpiece created with ID:', artpieceId);

    // Redirect to the new artpiece or profile on success
    if (artpieceId) {
      redirect(`/artpieces/${artpieceId}`);
    } else {
      redirect(`/profile/${creator_id}?success=artpiece-created`);
    }

  } catch (error) {
    // Check if this is a Next.js redirect
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      // Re-throw redirect errors so they work properly
      throw error;
    }
    
    console.error('Error creating artpiece:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create artpiece. Please try again.';
    
    // Preserve form data in URL for sticky fields
    const formDataParams = new URLSearchParams();
    formDataParams.set('title', formData.get('title')?.toString() ?? '');
    formDataParams.set('description', formData.get('description')?.toString() ?? '');
    formDataParams.set('price', formData.get('price')?.toString() ?? '');
    formDataParams.set('category_id', formData.get('category_id')?.toString() ?? '');
    formDataParams.set('error', errorMessage);
    
    redirect(`/profile/${creator_id}/create?${formDataParams.toString()}`);
  }

}