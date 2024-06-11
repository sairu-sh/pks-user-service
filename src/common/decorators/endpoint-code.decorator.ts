import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Auth0Guard, RoleGuard } from '../guards';
import { EndPointGuard } from '../guards/endpoint.guard';

export const ENDPOINT_CODE = 'endpointCode';

export const CanAccessEndpoint = (endpointCode: string) => SetMetadata(ENDPOINT_CODE, endpointCode);

// EndpointCode decorator which checks if the authenticated user has the access to this endpoint code
// eg: @EndpointCode("USER_READ") will allow only if user had USER_READ access
export function EndpointCode(endpointCode: string) {
    return applyDecorators(CanAccessEndpoint(endpointCode), UseGuards(Auth0Guard, EndPointGuard));
}
