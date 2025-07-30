// Test your database connection
// Create this file: src/app/test-db/page.tsx

import { testConnection, getAllArtpieces, getAllCategories, checkDatabaseStructure, getAllUsers } from '@/lib/database';
import { ArtpieceWithDetails, Category, DatabaseStructure, User } from '@/types';

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

    const users: User[] = await getAllUsers();
    
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
          <h2 className="text-lg font-semibold">Users ({users.length}):</h2>
          <ul className="list-disc list-inside">
            {users.map(user => (
              <li key={user.id}>{user.first_name}, {user.last_name} | {user.id}</li>
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
