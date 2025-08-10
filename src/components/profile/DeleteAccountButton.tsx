'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { deleteAccount } from '@/app/actions/deleteAccount';

interface DeleteAccountButtonProps {
  userId: string;
  userFullName: string;
}

export function DeleteAccountButton({ userId, userFullName: _userFullName }: DeleteAccountButtonProps) {
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
      const result = await deleteAccount(userId);
      
      if (result.success) {
        // Redirect to logout and then home page after successful deletion
        router.push('/logout?deleted=true');
      } else {
        setError(result.message);
        setIsDeleting(false);
        setShowConfirmDialog(false); // Close dialog to show error message
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsDeleting(false);
      setShowConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setError(null);
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        onMouseDown={(e) => e.preventDefault()}
        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700 active:bg-red-800 transition-colors"
        disabled={isDeleting}
        type="button"
      >
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <DeleteConfirmationDialog
        isOpen={showConfirmDialog}
        title="Delete Account"
        message={`Are you sure you want to permanently delete your account? This action cannot be undone. All your artpieces, reviews, and account data will be permanently removed.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
