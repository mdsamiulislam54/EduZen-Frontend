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

export interface CoachingCenterStatus {
    PENDING: "PENDING";
    ACTIVE: "ACTIVE";
    SUSPENDED: "SUSPENDED";
    DELETED: "DELETED";
}

export interface ICoachingCenter {
  id: string;
  ownerId: string;
  name: string;
  email: string;
  phone?: string;
  image?: string | null;
  address?: string;
  city?: string;
  area?: string;
  logo?: string | null;
  currency?: string;
  plan?: string | null;
  status?: CoachingCenterStatus;
  isDeleted?: boolean;
  isDeletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOwnerSingle {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role?: string;
  status?: UserStatusType;
  needPasswordChange?: boolean;
  isDeleted?: boolean;
  deletedAt?: string | null;
  image?: string | null;
  hasSubscription?: boolean;
  teamPassword?: string;
  createdAt?: string;
  updatedAt?: string;
  coachingCenter?: ICoachingCenter;
}
