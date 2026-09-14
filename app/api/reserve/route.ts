import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateReservationCode } from '@/lib/utils'

export async function GET(req: Request) {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ success: true, reservations })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const code = body.code || generateReservationCode()

    const newReservation = await prisma.reservation.create({
      data: {
        ...body,
        code,
        status: 'CONFIRMED',
      },
    })

    return NextResponse.json({ success: true, reservation: newReservation }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
