export const primary_menu = [
    {
        label: 'Home',
        href: 'home',
        icon: 'home'
    },
    {
        label: 'Top Seller',
        href: 'top-seller',
        icon: 'rupee sign'
    },
    {
        label: 'Top Rated',
        href: 'top-rated',
        icon: 'star'
    }
];

export const footer_menu = [
    {
        label: 'About Us',
        href: 'about-us',
        icon: 'info'
    }, 
    {
        label: 'FAQ',
        href: 'faq',
        icon: 'question'
    },
    {
        label: 'Contact Us',
        href: 'contact-us',
        icon: 'phone'
    }
];

export const profile_menu = [
    {
        label: 'My Account',
        href: 'my-account',
        icon: 'user'
    },
    {
        label: 'My Address',
        href: 'my-address',
        icon: 'building'
    },
    {
        label: 'My Orders',
        href: 'my-orders',
        icon: 'shopping basket'
    },

];






/**
 * Regular Expressions
 */

export const REGEXP = {
    email: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
    phone: '^[0-9]{10}$',
    name: '^[A-Za-z][A-Za-z\s]*$',
}