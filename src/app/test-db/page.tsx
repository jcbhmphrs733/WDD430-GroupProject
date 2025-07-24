// Test your database connection
// Create this file: src/app/test-db/page.tsx

import { testConnection, getAllArtpieces, getAllCategories, checkDatabaseStructure } from '@/lib/database';
import { ArtpieceWithDetails, Category, DatabaseStructure } from '@/types';

export default async function TestDatabase() {
  try {
    // Test basic connection
    const connectionTest = await testConnection();
    
    // Check database structure
    const dbStructure: DatabaseStructure = await checkDatabaseStructure();
    
    let artpieces: ArtpieceWithDetails[] = [];
    let artpiecesError: string | null = null;
    
    // Try to get artpieces, but catch the error if view doesn't exist
    try {
      artpieces = await getAllArtpieces();
    } catch (error) {
      artpiecesError = error instanceof Error ? error.message : 'Unknown error';
    }
    
    // Test categories (should work since it's a simple table)
    const categories: Category[] = await getAllCategories();
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Test Results</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Connection Test:</h2>
          <p className="text-green-600">✅ Connected at: {new Date(connectionTest.current_time).toLocaleString()}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Database Structure:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Tables ({dbStructure.tables.filter(t => t.table_type === 'BASE TABLE').length}):</h3>
              <ul className="list-disc list-inside text-sm">
                {dbStructure.tables.filter(t => t.table_type === 'BASE TABLE').map(table => (
                  <li key={table.table_name} className="text-green-600">✅ {table.table_name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Views ({dbStructure.views.length}):</h3>
              <ul className="list-disc list-inside text-sm">
                {dbStructure.views.map(view => (
                  <li key={view.view_name} className="text-green-600">✅ {view.view_name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Categories ({categories.length}):</h2>
          <ul className="list-disc list-inside">
            {categories.map(cat => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Artpieces:</h2>
          {artpiecesError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {artpiecesError}
            </div>
          ) : (
            <div>
              <p className="mb-2">Found {artpieces.length} artpieces</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artpieces.slice(0, 4).map(art => (
                  <div key={art.id} className="border p-4 rounded">
                    <h3 className="font-semibold">{art.title}</h3>
                    <p className="text-sm text-gray-600">by {art.creator_name || art.creator_username}</p>
                    <p className="text-lg font-bold">${art.price}</p>
                    <p className="text-sm">⭐ {art.average_rating} ({art.review_count} reviews)</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Database Error</h1>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}
