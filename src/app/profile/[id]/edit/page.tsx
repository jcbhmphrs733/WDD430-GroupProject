import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { getUserById } from '@/lib/database';
import { updateProfile } from '@/app/actions/profile';

interface EditProfilePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function EditProfilePage({ params, searchParams }: EditProfilePageProps) {
  try {
    const { id } = await params;
    const { error } = await searchParams;
    const currentUser = await getCurrentUser();
    
    // Check if user is logged in
    if (!currentUser) {
      redirect('/login');
    }
    
    // Check if user is trying to edit their own profile
    if (currentUser.id.toString() !== id) {
      redirect(`/profile/${id}`);
    }
    
    const user = await getUserById(id);
    if (!user) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-background-100">
        <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
              <p className="font-medium">Error updating profile:</p>
              <p>{decodeURIComponent(error)}</p>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-background-300 p-6">
            <form action={updateProfile} className="space-y-6">
              {/* Hidden field to pass user ID */}
              <input type="hidden" name="userId" value={id} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    defaultValue={user.first_name}
                    className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    defaultValue={user.last_name}
                    className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={user.username}
                  className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  defaultValue={user.bio || ''}
                  className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div>
                <label htmlFor="profile_image_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image Path
                </label>
                <input
                  type="text"
                  id="profile_image_url"
                  name="profile_image_url"
                  defaultValue={user.profile_image_url || `/images/user-profile-pics/${user.username}.jpg`}
                  className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder={`/images/user-profile-pics/${user.username}.jpg`}
                />
                <div className="text-xs text-gray-500 mt-2">
                  <p>Enter the path to your profile image file.</p>
                  <p className="font-medium">Default image path will be used if left unchanged. Format: <code className="bg-gray-100 px-1 rounded">/images/user-profile-pics/{user.username}.jpg</code></p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
                <a
                  href={`/profile/${id}`}
                  className="flex-1 bg-background-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-background-400 transition-colors border border-background-400 text-center"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading edit profile page:', error);
    notFound();
  }
}
