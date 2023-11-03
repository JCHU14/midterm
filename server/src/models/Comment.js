import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    body: { type: String, required: true, maxLength: 100 },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'Event'
})