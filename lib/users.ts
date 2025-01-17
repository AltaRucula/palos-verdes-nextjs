import { dbConnect } from '@/lib/mongoose';
import { UserModel } from '@/models/user';
import { NewUser, User } from '@/types/users';

export const findUser = async (id: string): Promise<User | null> => {
    try {
        await dbConnect();
        return await UserModel.findById<User>(id);
    } catch (error) {
        console.error('Error trying to get user', error);
        return null;
    }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    try {
        await dbConnect();
        return await UserModel.findOne<User>({
            email,
        });
    } catch (error) {
        console.error('Error trying to get user', error);
        return null;
    }
};

export const createUser = async (user: NewUser): Promise<User | null> => {
    try {
        await dbConnect();
        const newUser = new UserModel(user);
        return await newUser.save();
    } catch (error) {
        console.error('Error trying to create user', error);
        return null;
    }
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User | null> => {
    try {
        await dbConnect();
        return await UserModel.findByIdAndUpdate<User>(id, user, { new: true });
    } catch (error) {
        console.error('Error trying to update user', error);
        return null;
    }
};

export const deleteUser = async (id: string): Promise<User | null> => {
    try {
        await dbConnect();
        return await UserModel.findByIdAndDelete<User>(id);
    } catch (error) {
        console.error('Error trying to delete user', error);
        return null;
    }
};
