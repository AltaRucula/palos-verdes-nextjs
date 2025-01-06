import { Claim } from '@/types/claim';
import { model, models, Schema } from 'mongoose';

// For some reason while doing developing and modifying any code in the project, mongoose re compile the model(s)
// and throw an exception: "Cannot overwrite model once compiled Mongoose".
// Find a fix by checking first if the model is already present in the mongoose models, and otherwise creating it.
// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export const ClaimModel = models.Claim || model<Claim>('Claim', new Schema<Claim>({
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    content: {
        type: String,
        required: true
    },
    messages: [{
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            immutable: true
        }
    }],
    tags: [String],
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: false
    }
}));