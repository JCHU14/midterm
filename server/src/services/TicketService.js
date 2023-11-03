import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";


class TicketService {
    async refundTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)

        if (!ticket) {
            throw new BadRequest(`${ticketId} isn't a valid id`)
        }

        if (ticket.accountId.toString() != userId) {
            throw new Forbidden(' not your data to change')
        }

        await ticket.delete()
        return "you have refunded your ticket"
    }


    async buyTicket(ticketData) {
        const event = await eventsService.getEventById(ticketData.eventId)

        if (event.isCanceled) {
            throw new Forbidden(`${event.name} is canceled`)
        }

        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }


    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
        return tickets

    }

    async getMyEventTickets(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'ticketCount' } })
        return tickets
    }
}

export const ticketService = new TicketService();