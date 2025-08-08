'use client';

import { useState } from 'react';
import { deleteAndReseedDatabase } from './actions';

export default function DeleteAndReseedButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ 
    type: null, 
    text: '' 
  });

  const handleDeleteAndReseed = async () => {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL data in the database and replace it with seed data. Are you sure you want to continue?')) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: null, text: '' });

    try {
      const result = await deleteAndReseedDatabase();
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // Reload the page after a short delay to show the updated data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-yellow-800">Database Management</h2>
      <p className="text-sm text-yellow-700 mb-4">
        This will delete all existing data and repopulate the database with fresh seed data.
      </p>
      
      <button
        onClick={handleDeleteAndReseed}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Resetting Database...
          </span>
        ) : (
          '🗑️ Delete and Re-seed Database'
        )}
      </button>

      {message.type && (
        <div className={`mt-4 p-3 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <p className="text-sm">
            {message.type === 'success' ? '✅' : '❌'} {message.text}
          </p>
          {message.type === 'success' && (
            <p className="text-xs mt-1">Page will refresh automatically in 2 seconds...</p>
          )}
        </div>
      )}
    </div>
  );
}
