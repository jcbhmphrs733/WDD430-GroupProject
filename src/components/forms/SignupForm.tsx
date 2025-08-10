'use client';

import { useState } from 'react';
import { signup } from '@/app/actions/signup';
import { Button } from '@/components/ui/Button';

export function SignupForm() {
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('/images/user-profile-pics/username.jpg');

  // Update profile image URL when username changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.trim()) {
      setProfileImageUrl(`/images/user-profile-pics/${newUsername}.jpg`);
    } else {
      setProfileImageUrl('/images/user-profile-pics/username.jpg');
    }
  };

  return (
    <form action={signup} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input 
          id="email"
          name="email" 
          type="email"
          placeholder="Email" 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
        />
      </div>
      
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input 
          id="username"
          name="username" 
          type="text"
          placeholder="Username" 
          required 
          value={username}
          onChange={handleUsernameChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input 
            id="first_name"
            name="first_name" 
            type="text"
            placeholder="First Name" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
          />
        </div>
        
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input 
            id="last_name"
            name="last_name" 
            type="text"
            placeholder="Last Name" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input 
          id="password"
          name="password" 
          placeholder="Password" 
          type="password" 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
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
          placeholder="Tell us about yourself..." 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none" 
        />
      </div>
      <div>
        <label htmlFor="profile_image_url" className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image Path
        </label>
        <input 
          id="profile_image_url"
          name="profile_image_url" 
          type="text"
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
          placeholder={username ? `/images/user-profile-pics/${username}.jpg` : '/images/user-profile-pics/your-username.jpg'}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
        />
        <div className="text-xs text-gray-500 mt-2">
          <p>Enter the path to your profile image file.</p>
          <p className="font-medium">Default image will be used if left unchanged. Format: <code className="bg-gray-100 px-1 rounded">/images/user-profile-pics/{username || 'your-username'}.jpg</code></p>
        </div>
      </div>
      
      <div className="pt-4">
        <Button type="submit" className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Create Account
        </Button>
      </div>
    </form>
  );
}
