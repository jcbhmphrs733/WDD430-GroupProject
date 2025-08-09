'use client';

import { useState } from 'react';
import { signup } from '@/app/actions/signup';
import { Button } from '@/components/ui/Button';

export function SignupForm() {
  const [username, setUsername] = useState('');

  const defaultImagePath = username ? `/images/user-profile-pics/${username}.jpg` : '';

  return (
    <form action={signup} className="space-y-4">
      <input 
        name="email" 
        placeholder="Email" 
        required 
        className="w-full border px-3 py-2" 
      />
      <input 
        name="username" 
        placeholder="Username" 
        required 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border px-3 py-2" 
      />
      <input 
        name="first_name" 
        placeholder="First Name" 
        required 
        className="w-full border px-3 py-2" 
      />
      <input 
        name="last_name" 
        placeholder="Last Name" 
        required 
        className="w-full border px-3 py-2" 
      />
      <input 
        name="password" 
        placeholder="Password" 
        type="password" 
        required 
        className="w-full border px-3 py-2" 
      />
      <textarea 
        name="bio" 
        placeholder="Bio" 
        className="w-full border px-3 py-2" 
      />
      <div>
        <input 
          name="profile_image_url" 
          placeholder="Profile Image Path" 
          value={defaultImagePath}
          readOnly
          className="w-full border px-3 py-2 bg-gray-50" 
        />
        <div className="text-xs text-gray-500 mt-1">
          Profile image path is automatically generated based on your username
        </div>
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}
