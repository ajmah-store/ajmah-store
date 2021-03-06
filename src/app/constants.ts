/**
 * Directories
 */
const BASE = '/';

export const DIRECTORIES = {
    assets: `${BASE}/assets`
};

/**
 * Collections
 */

export const COLLECTIONS = {
    USERS: 'users',
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    ADDRESSES: 'addresses',
    ORDERS: 'orders'
};

/**
 * Storage
 */
export const STORAGE = {
    CATEGORIES: '/images/categories',
    PRODUCTS: '/images/products',
    USERS: '/images/users'
};

/**
 * Menus
 */
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
        label: 'My Addresses',
        href: 'my-address',
        icon: 'address book'
    },
    {
        label: 'My Orders',
        href: 'my-orders',
        icon: 'shopping basket'
    },

];

export const user_menu = [
    {
        label: 'My Profile',
        href:"profile",
        icon: 'user'
    }
];






/**
 * Regular Expressions
 */

export const REGEXP = {
    email: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
    phone: '^[0-9]{10}$',
    name: '^[A-Za-z][A-Za-z ]*$',
    pin: '^[0-9]{6}$',
    non_empty: '^(.*[^ \t]+.*)+$'
}




/**
 * Callable functions
 */

 export const FUNCTIONS = {

    HOST_URL: 'https://us-central1-ajmah-2a334.cloudfunctions.net',
    CALLABLE: {
        getLatestProducts: 'getLatestProducts',
    },
    API: {
        completePayment: 'api/completePayment',
        createOrder: 'api/createOrder',
        createInvoice: 'api/createInvoice',
        searchProduct: 'api/searchProduct'
    }
    
 };


 /**
  * Theme Info
  */

  export const THEME = {
    primary: '#d82446'
  };