import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Search by orderNumber or ID or Phone
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: id },
          { id: id },
          { customerPhone: id },
        ],
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, order })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()
    const { status, paymentStatus, riderName, riderPhone } = body

    const updated = await prisma.order.update({
      where: { id: id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(riderName && { riderName }),
        ...(riderPhone && { riderPhone }),
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({ success: true, order: updated })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
