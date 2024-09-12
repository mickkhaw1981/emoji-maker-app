import { supabase } from './supabase'

export async function createOrGetUser(userId: string) {
  // Check if user exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching user:', fetchError)
    throw fetchError
  }

  if (existingUser) {
    console.log('User already exists:', existingUser)
    return existingUser
  }

  // If user doesn't exist, create a new one
  const { data: newUser, error: insertError } = await supabase
    .from('profiles')
    .insert([
      {
        user_id: userId,
        credits: 3,
        tier: 'free'
      }
    ])
    .single()

  if (insertError) {
    console.error('Error creating user:', insertError)
    throw insertError
  }

  console.log('New user created:', newUser)
  return newUser
}