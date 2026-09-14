import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true, message: 'Logged in successfully' })
      // Set simple cookie
      response.cookies.set('flame_admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      return response
    } else {
      return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 })
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' })
  response.cookies.delete('flame_admin_auth')
  return response
}
