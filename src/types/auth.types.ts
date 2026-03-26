export interface ILoginApiResponse {
    success?:boolean;
    message?:string;
    accessToken?: string;
    refreshToken?: string;
    token?: string;
    user?: {
        id: string;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        status: string;
        role: string;
        needPasswordChange: boolean;
        phone?: string | null | undefined;
        teamPassword?: string | null | undefined;
    };
}