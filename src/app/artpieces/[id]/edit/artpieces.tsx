'use server';
import { redirect } from 'next/navigation';
import { putArt } from '@/lib/database';

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

export async function updateArtpiece(formData: FormData) {
    const art_id = formData.get('art_id')?.toString() ?? '';
    
    try {
        // Validate form data
        const validationErrors = validateFormData(formData);
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map(err => `${err.field}: ${err.message}`).join('; ');
            redirect(`/artpieces/${art_id}/edit?error=${encodeURIComponent(errorMessages)}`);
        }

        // Extract validated data
        const title = formData.get('title')?.toString()?.trim() ?? '';
        const description = formData.get('description')?.toString()?.trim() ?? '';
        const price = parseFloat(formData.get('price')?.toString()?.trim() ?? '0');
        const hero_image_url = formData.get('hero_image_url')?.toString()?.trim() ?? '';
        const category_id = parseInt(formData.get('category_id')?.toString()?.trim() ?? '0');
        const updated_at = formData.get('updated_at')?.toString() ?? '';

        // Attempt to update the artpiece
        console.log('Updating artpiece with data:', {
            art_id,
            title, 
            description: description.substring(0, 50) + '...', 
            price, 
            hero_image_url, 
            category_id
        });

        await putArt(art_id, title, description, price, hero_image_url, category_id, updated_at);

        console.log('Artpiece updated successfully');

        // Redirect to the updated artpiece on success
        redirect(`/artpieces/${art_id}?updated=true`);

    } catch (error) {
        // Check if this is a Next.js redirect
        if (error && typeof error === 'object' && 'digest' in error && 
            typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
            // Re-throw redirect errors so they work properly
            throw error;
        }
        
        console.error('Error updating artpiece:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update artpiece. Please try again.';
        
        // Preserve form data in URL for sticky fields
        const formDataParams = new URLSearchParams();
        formDataParams.set('title', formData.get('title')?.toString() ?? '');
        formDataParams.set('description', formData.get('description')?.toString() ?? '');
        formDataParams.set('price', formData.get('price')?.toString() ?? '');
        formDataParams.set('category_id', formData.get('category_id')?.toString() ?? '');
        formDataParams.set('error', errorMessage);
        
        redirect(`/artpieces/${art_id}/edit?${formDataParams.toString()}`);
    }
}