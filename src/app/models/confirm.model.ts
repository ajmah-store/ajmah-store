/**
 * Represents a confirm box
 */

export class Confirm {
    title: string;
    content: string;
    okButton: {
        text: string, 
        onClick: () => boolean,
        icon?: string
    };
    cancelButton: {
        text: string,
        onClick: () => boolean
        icon?: string
    };
}