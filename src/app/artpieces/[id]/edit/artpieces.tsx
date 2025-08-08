'use server';
import { redirect } from 'next/navigation';
import { putArt } from '@/lib/database';

export async function updateArtpiece(formData: FormData) {

    const title = formData.get('title')?.toString() ?? '';
    const art_id = formData.get('art_id')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const price = Number(formData.get('price')?.toString() ?? '');
    const hero_image_url = formData.get('hero_image_url')?.toString() ?? '';
    const category_id = Number(formData.get('category_id')?.toString() ?? '');
    const updated_at = formData.get('updated_at')?.toString() ?? '';
    

    await putArt(art_id, title, description, price, hero_image_url, category_id, updated_at);


    redirect(`/artpieces/${art_id}/`);
}