export type TypedActionState<T> = {
    errors?: string | string[];
} & T;

export type ActionState = {
    errors?: string | string[];
};
