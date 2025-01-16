import { dbConnect } from '@/lib/mongoose';
import { ClaimModel } from '@/models/claim';
import { Claims, Message, NewClaim, NewMessage, NewVote } from '@/types/claims';

// Mongoose does not support nested fields sorting, so we need to sort the messages array after receiving the data from DB
const sortMessagesByCreatedAt = (a: Message, b: Message) => b.createdAt.getTime() - a.createdAt.getTime();

export const findClaims = async (): Promise<Claims[] | null> => {
    try {
        await dbConnect();
        return await ClaimModel.find<Claims>(
            {},
            {
                title: 1,
                createdAt: 1,
                tags: 1,
            },
            {
                sort: {
                    createdAt: -1,
                },
            }
        );
    } catch (error) {
        console.error('Error trying to get claims', error);
        return null;
    }
};

export const findClaim = async (id: string): Promise<Claims | null> => {
    try {
        await dbConnect();
        const claim = await ClaimModel.findById<Claims>(id)
            .populate('author', 'firstName')
            .populate({
                path: 'messages',
                populate: {
                    path: 'author',
                    select: 'firstName',
                },
            })
            .populate({
                path: 'votes',
                populate: {
                    path: 'author',
                    select: '_id',
                },
            });

        if (claim) {
            claim.messages.sort(sortMessagesByCreatedAt);
        }

        return claim;
    } catch (error) {
        console.error('Error trying to get claim', error);
        return null;
    }
};

export const createClaim = async (claim: NewClaim): Promise<Claims | null> => {
    try {
        await dbConnect();
        const newClaim = new ClaimModel(claim);
        return await newClaim.save();
    } catch (error) {
        console.error('Error trying to create claim', error);
        return null;
    }
};

export const updateClaim = async (id: string, claim: Partial<Claims>): Promise<Claims | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndUpdate<Claims>(id, claim, {
            new: true,
        });
    } catch (error) {
        console.error('Error trying to update claim', error);
        return null;
    }
};

export const deleteClaim = async (id: string): Promise<Claims | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndDelete<Claims>(id);
    } catch (error) {
        console.error('Error trying to delete claim', error);
        return null;
    }
};

export const addMessage = async (claimId: string, message: NewMessage): Promise<Claims | null> => {
    try {
        await dbConnect();
        const claim = await ClaimModel.findByIdAndUpdate<Claims>(
            claimId,
            {
                $push: {
                    messages: message,
                },
            },
            {
                new: true,
                populate: {
                    path: 'messages',
                    populate: {
                        path: 'author',
                        select: 'firstName',
                    },
                },
            }
        );
        if (claim) {
            claim.messages.sort(sortMessagesByCreatedAt);
        }
        return claim;
    } catch (error) {
        console.error('Error trying to update claim', error);
        return null;
    }
};

export const addVote = async (claimId: string, vote: NewVote): Promise<Claims | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndUpdate<Claims>(
            claimId,
            {
                $push: {
                    votes: vote,
                },
            },
            {
                new: true,
            }
        );
    } catch (error) {
        console.error('Error trying to update claim', error);
        return null;
    }
};
