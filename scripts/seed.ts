import { db } from '../src/lib/server/db';
import { menuData } from '../src/data/menuData';
import { SLOT_CAPACITY_CONFIG } from '../src/data/restaurantConfig';

async function main() {
  console.log('🍽️  Seeding AURA Restaurant Database...');

  // Seed Menu Items
  db.menuItems.clear();
  db.menuItems.insertMany(menuData);
  console.log(`✅ Seeded ${menuData.length} Michelin-caliber dishes into menu_items table.`);

  // Seed Slot Capacity
  db.slotCapacity.clear();
  db.slotCapacity.insertMany(SLOT_CAPACITY_CONFIG);
  console.log(`✅ Seeded ${SLOT_CAPACITY_CONFIG.length} slot capacity rules into slot_capacity table.`);

  console.log('🎉 Database seeding complete. Ready for self-hosted production!');
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
