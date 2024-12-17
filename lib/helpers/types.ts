import { Guest, GuestType, Role } from "@prisma/client";

export type GuestPayload = {
    name: string;
    email: string | null;
    phoneNumber: string | null;
    tableNumber: number;
    guestType?: GuestType;
    rsvp: boolean;
    tag?: string;
    inviteCount?: number;
}

export type SearchGuestPayload = {
	name: string | null;
	email: string | null;
	phoneNumber: string | null;
}

export type CreateAdminPayload = {
    username: string;
    password: string;
    roles: Role[]
}

export type GuestUnionType = {
    group: {
        id: string;
        name: string;
        inviteCount: number;
        admittedCount: number;
    } | null;
    staff: {
        id: string;
        name: string;
        phoneNumber: string | null;
        instagram: string | null;
        inviteCount: number;
        role?: string | null;
        admittedCount: number;
    } | null;
} & Guest

export type SigninAdminPayload = Omit<CreateAdminPayload, 'roles'>