import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-4 sm:text-sm lg:text-base text-xs">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 border border-white rounded-md font-medium">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <div className='flex w-auto justify-end items-center px-4 gap-6 sm:text-sm lg:text-lg text-xs'>
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
    <Link
      href="/login"
      className="py-2 px-3 border border-white font-medium flex rounded-md no-underline "
    >
      Create Account
    </Link>
    </div>
  )
}
