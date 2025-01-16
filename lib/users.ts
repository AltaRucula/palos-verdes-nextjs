import { dbConnect } from '@/lib/mongoose';
import { UserModel } from '@/models/user';
import { NewUser, Users } from '@/types/users';

export const findUser = async (id: string): Promise<Users | null> => {
    try {
        await dbConnect();
        return await UserModel.findById<Users>(id);
    } catch (error) {
        console.error('Error trying to get user', error);
        return null;
    }
};

export const findUserByEmail = async (email: string): Promise<Users | null> => {
    try {
        await dbConnect();
        return await UserModel.findOne<Users>({
            email,
        });
    } catch (error) {
        console.error('Error trying to get user', error);
        return null;
    }
};

export const createUser = async (user: NewUser): Promise<Users | null> => {
    try {
        await dbConnect();
        const newUser = new UserModel(user);
        return await newUser.save();
    } catch (error) {
        console.error('Error trying to create user', error);
        return null;
    }
};

export const updateUser = async (id: string, user: Partial<Users>): Promise<Users | null> => {
    try {
        await dbConnect();
        return await UserModel.findByIdAndUpdate<Users>(id, user, { new: true });
    } catch (error) {
        console.error('Error trying to update user', error);
        return null;
    }
};

export const deleteUser = async (id: string): Promise<Users | null> => {
    try {
        await dbConnect();
        return await UserModel.findByIdAndDelete<Users>(id);
    } catch (error) {
        console.error('Error trying to delete user', error);
        return null;
    }
};
