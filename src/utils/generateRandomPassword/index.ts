import { generate } from 'generate-password';

// returns a random password to populate in auth0 for user onboarding
// this random password is replaced through set password link sent to newly created user
export const generatePassword = () =>
    generate({
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: true,
        symbols: true,
    });
