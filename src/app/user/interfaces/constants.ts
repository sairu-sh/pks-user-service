export const ERROR_MESSAGES = {
    USER_ALREADY_EXISTS: (email: string): string => `user with email ${email} already exists`,
    ROLE_ALREADY_ASSIGNED: (email: string, roleName: string) =>
        `User with email ${email} already has a role of ${roleName}`,
};
