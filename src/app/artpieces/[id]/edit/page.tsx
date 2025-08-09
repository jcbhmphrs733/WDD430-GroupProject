import { EditArt } from "@/components/forms/EditArt";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { getArtpieceById } from "@/lib/database";

interface ArtpieceEditPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
    success?: string;
    title?: string;
    description?: string;
    price?: string;
    category_id?: string;
  }>;
}

export default async function EditArtPage({ params, searchParams }: ArtpieceEditPageProps){
    const { id } = await params;
    const { error, success, title, description, price, category_id } = await searchParams;
    
    // Fetch the artpiece data
    const artpiece = await getArtpieceById(id);
    
    if (!artpiece) {
        notFound();
    }
    
    // Check if user is logged in and is the creator
    let loggedIn = false;
    const currentUser = await getCurrentUser();

    if (currentUser && String(currentUser.id) === String(artpiece.creator_id)) {
        loggedIn = true;
    }
    
    if (!loggedIn) {
        redirect("/login");
    }
    
    // Prepare form data for sticky fields (use URL params if available, otherwise use artpiece data)
    const formData = {
        title: title || '',
        description: description || '',
        price: price || '',
        category_id: category_id || ''
    };

    return (
        <div className="min-h-screen bg-background-100">
            <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                    Edit Your Artwork
                </h1>
                
                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                        <p className="font-medium">Error updating artpiece:</p>
                        <p>{decodeURIComponent(error)}</p>
                    </div>
                )}
                
                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
                        <p className="font-medium">Success!</p>
                        <p>Your artpiece has been updated successfully.</p>
                    </div>
                )}
                
                <div className="flex justify-center">
                    <EditArt 
                        artpiece={{
                            id: artpiece.id,
                            title: artpiece.title,
                            description: artpiece.description,
                            price: artpiece.price,
                            hero_image_url: artpiece.hero_image_url,
                            category_id: artpiece.category_id,
                            creator_id: artpiece.creator_id
                        }}
                        formData={formData}
                    />
                </div>
            </div>
        </div>
    );
}
