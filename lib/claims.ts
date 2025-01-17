import { dbConnect } from '@/lib/mongoose';
import { ClaimModel } from '@/models/claim';
import { Claim, Message, NewClaim, NewMessage, NewVote } from '@/types/claims';

// Mongoose does not support nested fields sorting, so we need to sort the messages array after receiving the data from DB
const sortMessagesByCreatedAt = (a: Message, b: Message) => b.createdAt.getTime() - a.createdAt.getTime();

const translateDBEntity = (claim: Claim): Claim => ({
    id: claim.id,
    content: claim.content,
    title: claim.title,
    createdAt: claim.createdAt,
    tags: claim.tags,
    author: {
        id: claim.author?.id,
        firstName: claim.author?.firstName,
    },
    messages: claim.messages.map((message) => ({
        id: message.id,
        content: message.content,
        createdAt: message.createdAt,
        author: {
            id: message.author?.id,
            firstName: message.author?.firstName,
        },
    })),
    votes: claim.votes.map((vote) => ({
        id: vote.id,
        author: {
            id: vote.author?.id,
            firstName: vote.author?.firstName,
        },
    })),
});

export const findClaims = async (): Promise<Partial<Claim>[] | null> => {
    try {
        await dbConnect();
        const claims = await ClaimModel.find<Claim>(
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

        if (!claims) {
            return null;
        }

        return claims.map((claim) => ({
            id: claim.id,
            title: claim.title,
            createdAt: claim.createdAt,
            tags: claim.tags,
        }));
    } catch (error) {
        console.error('Error trying to get claims', error);
        return null;
    }
};

export const findClaim = async (id: string): Promise<Claim | null> => {
    try {
        await dbConnect();
        const claim = await ClaimModel.findById<Claim>(id, undefined, {
            populate: [
                {
                    path: 'author',
                    select: 'firstName',
                },
                {
                    path: 'messages',
                    populate: {
                        path: 'author',
                        select: 'firstName',
                    },
                },
                {
                    path: 'votes',
                    populate: {
                        path: 'author',
                        select: '_id',
                    },
                },
            ],
        });

        if (!claim) {
            return null;
        }

        claim.messages.sort(sortMessagesByCreatedAt);

        return translateDBEntity(claim);
    } catch (error) {
        console.error('Error trying to get claim', error);
        return null;
    }
};

export const createClaim = async (claim: NewClaim): Promise<Claim | null> => {
    try {
        await dbConnect();
        const newClaim = new ClaimModel(claim);
        return await newClaim.save();
    } catch (error) {
        console.error('Error trying to create claim', error);
        return null;
    }
};

export const updateClaim = async (id: string, claim: Partial<Claim>): Promise<Claim | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndUpdate<Claim>(id, claim, {
            new: true,
        });
    } catch (error) {
        console.error('Error trying to update claim', error);
        return null;
    }
};

export const deleteClaim = async (id: string): Promise<Claim | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndDelete<Claim>(id);
    } catch (error) {
        console.error('Error trying to delete claim', error);
        return null;
    }
};

export const addMessage = async (claimId: string, message: NewMessage): Promise<Claim | null> => {
    try {
        await dbConnect();
        const claim = await ClaimModel.findByIdAndUpdate<Claim>(
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

export const addVote = async (claimId: string, vote: NewVote): Promise<Claim | null> => {
    try {
        await dbConnect();
        return await ClaimModel.findByIdAndUpdate<Claim>(
            claimId,
            {
                $push: {
                    votes: vote,
                },
            },
            {
                new: true,
                populate: {
                    path: 'votes',
                    populate: {
                        path: 'author',
                        select: '_id',
                    },
                },
            }
        );
    } catch (error) {
        console.error('Error trying to update claim', error);
        return null;
    }
};
