'use client';

import { useState } from 'react';
import { addArtpiece } from "@/app/profile/[id]/create/actions";

interface AddArtProps {
    userId: string;
    formData?: {
        title: string;
        description: string;
        price: string;
        category_id: string;
    };
}

export function AddArt({ userId, formData }: AddArtProps){
    const [title, setTitle] = useState(formData?.title || '');
    const [description, setDescription] = useState(formData?.description || '');
    const [price, setPrice] = useState(formData?.price || '');
    const [categoryId, setCategoryId] = useState(formData?.category_id || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const timestamp: string = new Date().toISOString();
    
    // Function to create a URL-friendly slug from the title
    const createSlug = (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    };
    
    // Generate the image path based on title
    const generateImagePath = (titleText: string): string => {
        if (!titleText.trim()) return '';
        const slug = createSlug(titleText);
        return `/images/artpieces/${slug}.jpg`;
    };
    
    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await addArtpiece(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <div className="bg-white rounded-lg shadow-sm border border-background-300 p-6 w-full max-w-2xl">
            <form action={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                        placeholder="Enter a compelling title for your artwork"
                        required 
                        minLength={3}
                        maxLength={100}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        {title.length}/100 characters
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none" 
                        placeholder="Describe your artwork, materials used, inspiration, etc."
                        required
                        minLength={10}
                        maxLength={1000}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        {description.length}/1000 characters (minimum 10)
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            id="price" 
                            name="price"
                            type="number" 
                            step="0.01"
                            min="0"
                            max="10000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Enter price between $0.00 and $10,000.00
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label htmlFor="hero_image_url" className="block text-sm font-medium text-gray-700 mb-2">
                        Image Path <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="hero_image_url" 
                        name="hero_image_url" 
                        type="text" 
                        value={generateImagePath(title)}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                        placeholder="/images/artpieces/your-artwork-title.jpg"
                        required
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        Image path is automatically generated based on your artwork title. Make sure you have uploaded an image with this exact filename.
                    </div>
                </div>
            
                {/* Category */}
                <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select 
                        id="category_id" 
                        name="category_id" 
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                        required
                    >
                        <option disabled value="">-- Select a category --</option>
                        <option value="9">Ceramics</option>
                        <option value="14">Digital Art</option>
                        <option value="10">Fiber Arts</option>
                        <option value="6">Glass Art</option>
                        <option value="15">Home Decor</option>
                        <option value="4">Jewelry</option>
                        <option value="5">Metalwork</option>
                        <option value="12">Mixed Media</option>
                        <option value="16">Other</option>
                        <option value="7">Painting</option>
                        <option value="13">Photography</option>
                        <option value="1">Pottery</option>
                        <option value="11">Printmaking</option>
                        <option value="8">Sculpture</option>
                        <option value="3">Textiles</option>
                        <option value="2">Woodworking</option>
                    </select>
                </div>

                {/* Hidden fields */}
                <input type="hidden" name="creator_id" value={userId} />
                <input type="hidden" name="created_at" value={timestamp} />
                <input type="hidden" name="updated_at" value={timestamp} />
                
                {/* Submit button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                            isSubmitting 
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                    >
                        {isSubmitting ? 'Creating Artwork...' : 'Create Artwork'}
                    </button>
                </div>
            </form>
        </div>

    );
}