import { db } from '../db';
import { ReservationInput, TimeSlot, ReservationRecord } from '@/lib/types';
import { MinHeap } from '@/lib/dsa/PriorityQueue';
import { SLOT_CAPACITY_CONFIG } from '@/data/restaurantConfig';

export class ReservationRepository {
  private static ensureConfig(): void {
    const existing = db.slotCapacity.find();
    if (existing.length === 0) {
      db.slotCapacity.insertMany(SLOT_CAPACITY_CONFIG);
    }
  }

  /**
   * Retrieves available time slots using Min-Heap priority queue ordering.
   */
  static getAvailableSlots(date: string, partySize: number, area: string): TimeSlot[] {
    ReservationRepository.ensureConfig();

    const slotConfigs = db.slotCapacity.find((c: any) => c.area === area);
    const existingBookings = db.reservations.find(
      (r: any) => r.date === date && r.seatingArea === area && r.status !== 'CANCELLED'
    );

    const bookingCountMap = new Map<string, number>();
    for (const b of existingBookings) {
      const count = bookingCountMap.get(b.timeSlot) || 0;
      bookingCountMap.set(b.timeSlot, count + 1);
    }

    const heap = new MinHeap<{
      time: string;
      totalCapacity: number;
      reservedCount: number;
      remainingTables: number;
      isPeak: boolean;
    }>();

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const isToday = date === todayStr;

    for (const config of slotConfigs) {
      // Check if slot has already passed today
      if (isToday) {
        const [h, m] = config.time.split(':').map(Number);
        const slotTime = new Date();
        slotTime.setHours(h, m, 0, 0);
        if (slotTime <= now) continue;
      }

      const reserved = bookingCountMap.get(config.time) || 0;
      const remaining = Math.max(0, config.tables - reserved);
      const priority = parseInt(config.time.replace(':', ''), 10);

      heap.push(priority, {
        time: config.time,
        totalCapacity: config.tables,
        reservedCount: reserved,
        remainingTables: remaining,
        isPeak: ReservationRepository.isPeakSlot(config.time),
      });
    }

    const slots: TimeSlot[] = [];
    while (heap.size > 0) {
      const slot = heap.pop()!;
      let status: 'AVAILABLE' | 'FEW_LEFT' | 'WAITLIST';
      if (slot.remainingTables <= 0) {
        status = 'WAITLIST';
      } else if (slot.remainingTables <= 2) {
        status = 'FEW_LEFT';
      } else {
        status = 'AVAILABLE';
      }

      slots.push({
        time: slot.time,
        label: ReservationRepository.formatSlotTime(slot.time),
        isPeak: slot.isPeak,
        status,
        remaining: slot.remainingTables,
      });
    }

    return slots;
  }

  /**
   * Creates an atomic booking with transactional capacity enforcement.
   */
  static createBooking(
    input: ReservationInput & { bookingReference: string; qrData: string }
  ): ReservationRecord {
    ReservationRepository.ensureConfig();

    return db.reservations.transaction(() => {
      // Verify capacity in real time within transaction
      const currentBookings = db.reservations.find(
        (r: any) =>
          r.date === input.date &&
          r.timeSlot === input.timeSlot &&
          r.seatingArea === input.seatingArea &&
          r.status !== 'CANCELLED'
      );

      const capacityConfig = db.slotCapacity.findOne(
        (c: any) => c.area === input.seatingArea && c.time === input.timeSlot
      );

      const maxTables = capacityConfig ? capacityConfig.tables : 4;
      if (currentBookings.length >= maxTables) {
        throw new Error('SLOT_FULL');
      }

      const id = `RES-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking: ReservationRecord = {
        id,
        bookingReference: input.bookingReference,
        guestName: input.guestName,
        guestEmail: input.guestEmail,
        guestPhone: input.guestPhone,
        partySize: input.partySize,
        date: input.date,
        timeSlot: input.timeSlot,
        seatingArea: input.seatingArea,
        occasion: input.occasion,
        dietaryNotes: input.dietaryNotes,
        status: 'CONFIRMED',
        qrData: input.qrData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      db.reservations.insert(newBooking);
      return newBooking;
    });
  }

  static isPeakSlot(time: string): boolean {
    const [h] = time.split(':').map(Number);
    return h >= 18 && h <= 21;
  }

  static formatSlotTime(time: string): string {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
  }
}
