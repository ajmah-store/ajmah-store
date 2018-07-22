/**
 * Model used to represent a user in ajmah
 */
export class User {
    id?: any;
    first_name: string;
    last_name: string;
    type: number;
    email: string;
    phone: string;
    gender?: 'male' | 'female' | 'other';
    dob?: Date;
    photoURL?: string;
    lastPasswordChange?: Date;
}

/**
 * Available types of users for ajmah
 */
export const USER_TYPES = {
    ADMIN: 1,
    EDITOR: 2,
    NORMAL: 3
}