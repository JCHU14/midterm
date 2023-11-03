export class Comment {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.eventId = data.eventId
        this.createdAt = new Date(data.createdAt)
    }
}