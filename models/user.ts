import { Users } from '@/types/users';
import { model, models, Schema } from 'mongoose';

// For some reason while doing developing and modifying any code in the project, mongoose re compile the model(s)
// and throw an exception: "Cannot overwrite model once compiled Mongoose".
// Find a fix by checking first if the model is already present in the mongoose models, and otherwise creating it.
// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export const UserModel =
    models.User ||
    model<Users>(
        'User',
        new Schema<Users>({
            createdAt: {
                type: Date,
                default: () => Date.now(),
                immutable: true,
            },
            email: {
                type: String,
                required: true,
            },
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
        })
    );
