import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50

    const where: any = {}
    if (status) {
      where.status = status
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    return NextResponse.json({ success: true, orders })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, ...orderData } = body

    const orderNumber = generateOrderNumber()

    const newOrder = await prisma.order.create({
      data: {
        ...orderData,
        orderNumber,
        status: 'RECEIVED',
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId || null,
            name: item.name,
            portion: item.portion,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            spiceLevel: item.spiceLevel || null,
            addons: item.addons || null,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 })
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
