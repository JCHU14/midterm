import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketService } from "../services/TicketService.js"


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.buyTicket)
            .delete('/:ticketId', this.refundTicket)
    }

    async buyTicket(req, res, next) {
        try {
            const ticketData = req.body
            const userId = req.userInfo.id
            ticketData.accountId = userId
            const ticket = await ticketService.buyTicket(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }


    async refundTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const userId = req.userInfo.id
            const message = await ticketService.refundTicket(ticketId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}