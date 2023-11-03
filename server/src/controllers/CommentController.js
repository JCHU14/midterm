import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";


export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('', this.getComments)

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.removeComment)
    }

    async getComments(req, res, next) {
        try {
            const comments = await commentService.getComments()
            return res.send(comments)
        } catch (error) { next(error) }
    }




    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentService.createComment(req.body)
            return res.send(comment)
        } catch (error) { next(error) }
    }

    async removeComment(req, res, next) {
        try {
            const results = await commentService.removeComment(req.params.commentId, req.userInfo.id)
            return res.send(results)
        } catch (error) { next(error) }
    }
}