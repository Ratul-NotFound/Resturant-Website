import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      include: {
        portions: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return NextResponse.json({ success: true, items })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { portions, ...itemData } = body

    const newItem = await prisma.menuItem.create({
      data: {
        ...itemData,
        portions: {
          create: portions || [],
        },
      },
      include: {
        portions: true,
      },
    })

    return NextResponse.json({ success: true, item: newItem }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
