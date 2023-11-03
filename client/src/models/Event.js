export class Event{
    constructor(data){
        this.startDate = new Date(data.startDate)
        this.isCanceled = data.isCanceled
        this.name = data.name
        this.id = data.id
        this.location = data.location
        this.capacity = data.capacity
        this.type = data.type
        this.coverImg = data.coverImg
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.description = data.description
        this.ticketCount = data.ticketCount
    }
}



// startDate: { type: Date, required: true },
// isCanceled: { type: Boolean },
// name: { type: String, required: true, maxLength: 75, minLength: 5 },
// location: { type: String, required: true, maxLength: 250 },
// capacity: { type: Number, required: true, max: 500, min: 1 },
// type: { type: String, enum: ['digital', 'concert', 'convention', 'sport'], required: true, default: 'sport' },
// coverImg: { type: String, required: true, maxLength: 350 },
// // creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },