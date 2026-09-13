import { db } from '../db';

export class NewsletterRepository {
  /**
   * Checks if an email is already subscribed.
   */
  static isDuplicate(email: string): boolean {
    const existing = db.newsletterSubscribers.findOne(
      (sub: any) => sub.email.toLowerCase() === email.toLowerCase()
    );
    return !!existing;
  }

  /**
   * Subscribes a new email address.
   */
  static subscribe(email: string): void {
    if (!NewsletterRepository.isDuplicate(email)) {
      db.newsletterSubscribers.insert({
        email: email.toLowerCase(),
        isActive: true,
        subscribedAt: new Date().toISOString(),
      });
    }
  }
}
