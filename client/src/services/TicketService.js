import { AppState } from "../AppState";
import { Ticket } from "../models/Ticket";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";




class TicketService{
    async buyTicket(eventId){
        const eventData = {eventId: eventId};
        const res = await api.post('api/tickets', {eventId})
        logger.log('Bought Ticket', res.data)
        AppState.tickets.push(new Ticket(res.data))
        AppState.activeEvent.ticketCount++
    }

    async getTicketsOnEvent(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('got tickets for event', res.data)
        AppState.tickets = res.data.map((ticket) => new Ticket(ticket))
    }

    async refundTicket(ticketId) {
        logger.log('ticket id!', ticketId)
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log(res.data)
        const ticketIndex = AppState.myTickets.findIndex(ticket => ticket.id == ticketId)
        if (ticketIndex == -1) {
            return
        }
        AppState.myTickets.splice(ticketIndex, 1)
    }
}

export const ticketService = new TicketService();