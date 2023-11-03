import { Schema } from "mongoose";





export const EventSchema = new Schema({
    description: { type: String, required: true, maxLength: 750 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    name: { type: String, required: true, maxLength: 75, minLength: 5 },
    location: { type: String, required: true, maxLength: 250 },
    capacity: { type: Number, required: true, max: 500, min: 1 },
    type: { type: String, enum: ['digital', 'concert', 'convention', 'sport'], required: true, default: 'sport' },
    coverImg: { type: String, required: true, maxLength: 350 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
},

    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})



