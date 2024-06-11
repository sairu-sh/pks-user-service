import { registerAs as Auth0Configuration } from '@nestjs/config';
import { AUTH0_ENV_VARIABLES, AUTH0_REGISTER } from 'src/constants';

export default Auth0Configuration(AUTH0_REGISTER, () => ({
    [AUTH0_ENV_VARIABLES.DOMAIN]: process.env.AUTH0_DOMAIN,
    [AUTH0_ENV_VARIABLES.CLIENT_ID]: process.env.AUTH0_CLIENT_ID,
    [AUTH0_ENV_VARIABLES.CLIENT_SECRET]: process.env.AUTH0_CLIENT_SECRET,
    [AUTH0_ENV_VARIABLES.API_IDENTIFIER]: process.env.AUTH0_API_IDENTIFIER,
}));
