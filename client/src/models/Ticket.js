import { Event } from "./Event";

export class Ticket {
    constructor(data) {
      this.id = data.id;
      this.accountId = data.accountId;
      this.eventId = data.eventId;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.profile = data.profile;
      
      this.event = data.event ? new Event(data.event) : null;
    }
  }