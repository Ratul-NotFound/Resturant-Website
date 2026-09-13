import { OPENING_HOURS } from '@/data/restaurantConfig';

export interface LiveStatus {
  isOpen: boolean;
  statusText: string;
  nextEventText: string;
}

/**
 * Computes whether the restaurant is currently open, along with detailed status.
 */
export function getLiveRestaurantStatus(): LiveStatus {
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = dayNames[now.getDay()];
  const todaySchedule = OPENING_HOURS.find((h) => h.day === currentDayName);

  if (!todaySchedule || !todaySchedule.isOpen) {
    return {
      isOpen: false,
      statusText: 'Currently Closed',
      nextEventText: 'Opens tomorrow at 12:00 PM',
    };
  }

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour + currentMinute / 60;

  // Typical lunch: 12:00 - 14:30 (12.0 - 14.5)
  // Dinner: 17:00 - 23:30 (17.0 - 23.5)
  const isLunchOpen = todaySchedule.lunch !== 'Closed' && currentTime >= 12.0 && currentTime <= 14.5;
  const isDinnerOpen = currentTime >= 17.0 && currentTime <= 23.5;

  if (isLunchOpen) {
    return {
      isOpen: true,
      statusText: 'Open for Lunch Service',
      nextEventText: 'Dinner service commences at 5:00 PM',
    };
  }

  if (isDinnerOpen) {
    return {
      isOpen: true,
      statusText: 'Open for Dinner & Cellar Service',
      nextEventText: 'Kitchen closes at 11:30 PM',
    };
  }

  if (currentTime < 12.0) {
    return {
      isOpen: false,
      statusText: 'Currently Closed',
      nextEventText: todaySchedule.lunch !== 'Closed' ? 'Opens for Lunch at 12:00 PM' : 'Opens for Dinner at 5:30 PM',
    };
  }

  if (currentTime > 14.5 && currentTime < 17.0) {
    return {
      isOpen: false,
      statusText: 'Afternoon Intermission',
      nextEventText: 'Evening service begins at 5:00 PM',
    };
  }

  return {
    isOpen: false,
    statusText: 'Currently Closed',
    nextEventText: 'Opens tomorrow at 12:00 PM',
  };
}
