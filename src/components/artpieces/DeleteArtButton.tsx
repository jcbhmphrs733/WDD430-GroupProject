'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { deleteArtpiece } from '@/app/actions/deleteArtpiece';

interface DeleteArtButtonProps {
  artpieceId: string;
  artpieceTitle: string;
}

export function DeleteArtButton({ artpieceId, artpieceTitle }: DeleteArtButtonProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteArtpiece(artpieceId);
      
      if (result.success) {
        // Redirect to the user's profile or discover page after successful deletion
        router.push('/profile?deleted=true');
      } else {
        setError(result.message);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting artpiece:', error);
      setError('Failed to delete artpiece. Please try again.');
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setError(null);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="w-1/2 lg:w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors text-center"
      >
        Delete Artwork
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      <DeleteConfirmationDialog
        isOpen={showConfirmDialog}
        title="Delete Artwork"
        message={`Are you sure you want to delete "${artpieceTitle}"? This action cannot be undone and will remove the artwork, all reviews, and favorites associated with it.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
