'use server'
 
import { cookies } from 'next/headers'
 
export async function setToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('token', token)
}

export async function getToken() {
  const cookieStore = await cookies()
  const storedValue = cookieStore.get('token')
  return storedValue?.value || null
}

export async function deleteToken() {
  (await cookies()).delete('token')
}