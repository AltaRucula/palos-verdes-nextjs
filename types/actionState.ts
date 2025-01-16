export type TypedActionState<T> = {
    errors?: string;
} & T;

export type ActionState = {
    errors?: string;
};
