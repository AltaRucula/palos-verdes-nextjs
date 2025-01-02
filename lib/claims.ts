import { dbConnect } from '@/lib/mongoose';
import { ClaimModel } from '@/models/claim';
import { Claim, Message } from '@/types/claim';

// Mongoose does not support nested fields sorting, so we need to sort the messages array after receiving the data from DB
const sortMessagesByCreatedAt = (a: Message, b: Message) => b.createdAt.getTime() - a.createdAt.getTime();

export const findClaims = async (): Promise<Claim[] | null> => {
    try {
        await dbConnect();
        return await ClaimModel.find<Claim>({}, {
            title: 1,
            createdAt: 1,
            tags: 1
        }, {
            sort: {
                createdAt: -1
            }
        });
    } catch (error) {
        console.error('Error trying to get claims', error);
        return null;
    }
}

export const findClaim = async (id: string): Promise<Claim | null> => {
    try {
        await dbConnect();
        const claim = await ClaimModel.findById<Claim>(id);
        if (claim) {
            claim.messages.sort(sortMessagesByCreatedAt);
        }
        return claim;
    } catch (error) {
        console.error('Error trying to get claim', error);
        return null;
    }
}

export const createClaim = async (claim: Claim): Promise<Claim | null> => {
    try {
        await dbConnect();
        const newClaim = new ClaimModel(claim);
        return await newClaim.save();
    } catch (error) {
        console.error('Error trying to create claim', error);
        return null;
    }
}

export const updateClaim = async (id: string, claim: Partial<Claim>): Promise<Claim | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndUpdate<Claim>(id, claim, {new: true});
    } catch (error) {
        console.error('Error trying to update claim', error);
        return null;
    }
}

export const deleteClaim = async (id: string): Promise<Claim | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndDelete<Claim>(id);
    } catch (error) {
        console.error('Error trying to delete claim', error);
        return null;
    }
}

export const addMessage = async (claimId: string, message: Partial<Message>): Promise<Claim | null> => {
    try {
        await dbConnect();
        const claim = await ClaimModel.findByIdAndUpdate<Claim>(claimId, {
            $push: {
                messages: message
            }
        }, {
            new: true
        });
        if (claim) {
            claim.messages.sort(sortMessagesByCreatedAt);
        }
        return claim;
    } catch (error) {
        console.error('Error trying to update claim', error);
        return null;
    }
}