import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";


async function getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId);
    if (!comment) { throw new BadRequest(`${commentId}`) }
    return comment
}
class CommentService {

    async getComments() {
        const comments = await dbContext.Comments.find().populate('creator', 'name picture')
        return comments
    }
    async getCommentsByEventId(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
        return comments
    }


    async createComment(body) {
        const newComment = await dbContext.Comments.create(body);
        await newComment.populate('creator', 'name picture')
        return newComment
    }


    async removeComment(commentId, userId) {
        const toBeDeleted = await getCommentById(commentId)
        if (toBeDeleted.creatorId.toString() != userId) {

        }
        const results = await toBeDeleted.remove()
        return `Deleted, ${results}`
    }


}

export const commentService = new CommentService();