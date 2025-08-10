'use server'

import { createUser } from '@/lib/database'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const username = formData.get('username') as string
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string
  const password = formData.get('password') as string
  const bio = formData.get('bio') as string
  const profile_image_url = formData.get('profile_image_url') as string

  // WARNING: Storing passwords as plaintext is NOT secure! Only do this for early dev/testing.
  await createUser({
    email,
    username,
    first_name,
    last_name,
    password, // passing plaintext password directly
    bio,
    profile_image_url,
  })

  redirect('/login')
}
