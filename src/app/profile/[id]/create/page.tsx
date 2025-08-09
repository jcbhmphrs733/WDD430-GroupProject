import { AddArt } from "@/components/forms/AddArt";

interface ProfilePageProps {
  params: {
    id: string;
  };
  searchParams: {
    error?: string;
    success?: string;
    title?: string;
    description?: string;
    price?: string;
    category_id?: string;
  };
}

export default async function createArt({ params, searchParams }: ProfilePageProps){
    const { id } = await params;
    const { error, success, title, description, price, category_id } = await searchParams;
    
    // Prepare form data for sticky fields
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
                    Show off your art!
                </h1>
                
                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                        <p className="font-medium">Error creating artpiece:</p>
                        <p>{decodeURIComponent(error)}</p>
                    </div>
                )}
                
                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
                        <p className="font-medium">Success!</p>
                        <p>Your artpiece has been created successfully.</p>
                    </div>
                )}
                
                <div className="flex justify-center">
                    <AddArt userId={id} formData={formData} />
                </div>
            </div>
        </div>
    );
}
