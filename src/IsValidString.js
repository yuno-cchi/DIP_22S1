/* 
 * ~/src/IsValidString.js
 *
 * Text Input stripper
 * 
 * Takes a string input and validates it
 * Returns true if it follows the google username standard, false otherwise
 * 
 * Last updated 25/8 by Cris
 * 
 * Changelog:
 * 25/8 - Component Created
 * 
*/

export default function IsValidString(input) {
    const re = /^[A-Za-z0-9](\.?[a-zA-Z0-9]){5,25}$/;
    // username rules:
    // Username must be 5-25 characters long,
    // and can only contain alphanumerical characters and fullstops.
    // The username cannot end in a fullstop, and a fullstop cannot be preceeded by another fullstop.

    return re.test(input);
}