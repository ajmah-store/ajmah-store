/**
 * Represents address of a user
 */
export class Address {
    id?: any;
    city: string;
    locality: string;
    building: string;
    pin: string;
    state: string;
    landmark?: string;
    name: string;
    phone: string;
    type: 'home' | 'office';
}

export const ADDRESS_TYPES = {
    HOME: 'home',
    OFFICE: 'office'
};