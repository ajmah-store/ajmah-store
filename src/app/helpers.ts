/**
 * Format a date to show month date, year
 * @param date The input date of type Date
 * @example
 * const date = new Date('1/2/1993');
 * formatDate(date); //returns 'January 2, 1993'
 */
export function formatDate(date: Date): string {

    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

};

/**
 * Capitalize the first letter and convert the rest to lower case.
 * @param str the input string
 * @example
 * capitalize('hEllo'); //returns 'Hello'
 */
export function capitalize(str: string): string {

    return str.slice(0,1).toUpperCase().concat(str.slice(1).toLowerCase());

}

/**
 * trim each field in data and return the trimmed data
 * @param datas Input datas
 */
export function trimData(datas: any): any {
    
    let newData: any = {}; 

    for(let field in datas) {
        newData[field] = datas[field].trim();
    }

    return newData;

}

/**
 * read the date object from firebase timestamp object
 * @param timestamp timestamp retrieved from firestore
 * @returns date object created from timestamp
 */
 export function readDate(timestamp: firebase.firestore.Timestamp): Date {

    return timestamp.toDate();

 }