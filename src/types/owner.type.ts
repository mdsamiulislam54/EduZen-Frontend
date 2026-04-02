import { Role } from "./user.type";
export interface UserStatus {
    ACTIVE: "ACTIVE";
    BLOCKED: "BLOCKED";
    DELETED: "DELETED";
}
export type TOwner ={
    role?: Role;
    isDeleted?: boolean;
    id?: string;
    name?: string;
    email?: string;
    emailVerified: boolean;
    status?: UserStatus;
    needPasswordChange?: boolean;
    image?: string | null;
    hasSubscription?: boolean;
}

export type  UserStatusType ={
    ACTIVE: "ACTIVE";
    BLOCKED: "BLOCKED";
    DELETED: "DELETED";
}