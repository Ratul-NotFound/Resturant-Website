import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { code } = await req.json()
    if (!code) {
      return NextResponse.json({ success: false, error: 'Code is required' }, { status: 400 })
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ success: false, error: 'Invalid or expired coupon' }, { status: 404 })
    }

    return NextResponse.json({ success: true, coupon })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
