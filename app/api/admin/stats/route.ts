import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [totalOrders, pendingOrders, totalReservations, allOrders, menuItems] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: { in: ['RECEIVED', 'PREPARING', 'ON_FLAME', 'OUT_FOR_DELIVERY'] } } }),
      prisma.reservation.count(),
      prisma.order.findMany({ select: { total: true } }),
      prisma.menuItem.count(),
    ])

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0)

    const recentOrders = await prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })

    const upcomingReservations = await prisma.reservation.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        totalReservations,
        totalDishes: menuItems,
      },
      recentOrders,
      upcomingReservations,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
