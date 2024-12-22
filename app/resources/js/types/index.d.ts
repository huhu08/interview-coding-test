export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Movie {
    id: number;
    slug: string;
    title: string;
    description: string;
    released: string;
    created_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};