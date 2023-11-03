import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";





class EventsService {
    async getEvents(query) {
        const events = await dbContext.Events.find(query)
            .populate('creator', 'name picture')
        return events
    }


    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        return event
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator ticketCount', 'name picture')
        if (!event) {
            throw new BadRequest(`${eventId} isn't a valid ID`)
        }
        return event
    }

    async archiveEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId.toString() != userId) {
            throw new Forbidden('this isnt your Event to modify')
        }
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
}

export const eventsService = new EventsService()