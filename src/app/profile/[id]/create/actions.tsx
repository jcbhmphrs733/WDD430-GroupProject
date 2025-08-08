'use server';
import { redirect } from 'next/navigation';
import { postNewArt } from '@/lib/database';

export async function addArtpiece(formData: FormData) {

    const title = formData.get('title')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const price = Number(formData.get('price')?.toString() ?? '');
    const hero_image_url = formData.get('hero_image_url')?.toString() ?? '';
    const category_id = Number(formData.get('category_id')?.toString() ?? '');
    const creator_id = formData.get('creator_id')?.toString() ?? '';
    const created_at = formData.get('created_at')?.toString() ?? '';
    const updated_at = formData.get('updated_at')?.toString() ?? '';

    console.log(`LOOK HERE title: ${title} description: ${description} price: ${price} 
        hero_image_url: ${hero_image_url} category_id: ${category_id}
        creator_id: ${creator_id} created_at: ${created_at} updated_at: ${updated_at}`);
    
    // await postNewArt(title, description, price, hero_image_url, category_id, creator_id, created_at, updated_at);
    // const artId = await postNewArt(title, description, price, hero_image_url, category_id, creator_id, created_at, updated_at);

    redirect(`/profile/${creator_id}/`);
    // redirect(`/artpieces/${artId}/`);
}