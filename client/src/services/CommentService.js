import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class CommentService {

    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log(res.data)
        AppState.comments = res.data.map((comment) => new Comment(comment))
    }


    async createComment(commentData) {
        const eventId = AppState.activeEvent.id
        commentData.eventId = eventId;
        const res = await api.post('api/comments', commentData)
        logger.log(res.data)
        const newComment = new Comment(res.data)
        AppState.comments.push(newComment)
    }

    async getComments() {
        const res = await api.get('api/comments')
        logger.log(res.data)
        const newComments = res.data.map(commentPOJO => new Comment(commentPOJO))
        AppState.comments = newComments
    }

    async deleteComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log(res.data)
        const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
        if (commentIndex == -1) {
            return
        }
        AppState.comments.splice(commentIndex, 1)
    }
}

export const commentService = new CommentService()