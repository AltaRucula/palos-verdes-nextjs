export type ActionState<T> = {
    errors?: string;
    payload?: T;
    success: boolean;
};
