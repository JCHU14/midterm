import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { commentService } from "../services/CommentService.js";
import { ticketService } from "../services/TicketService.js";



export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/comments', this.getCommentsByEventId)
            .get('/:eventId/tickets', this.getTicketsByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .delete('/:eventId', this.archiveEvent)
    }


    async getEvents(request, response, next) {
        try {
            const query = request.query
            const events = await eventsService.getEvents(query)
            return response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentService.getCommentsByEventId(eventId)
            return response.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async archiveEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await eventsService.archiveEvent(eventId, userId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }


    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventsService.getEventById(eventId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(request, response, next) {

        try {

            const eventData = request.body
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await eventsService.createEvent(eventData)
            return response.send(event)

        } catch (error) {
            next(error)
        }
    }

    async getTicketsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketService.getTicketsByEventId(eventId)
            return response.send(tickets)
        } catch (error) {
            next(error)
        }
    }
}