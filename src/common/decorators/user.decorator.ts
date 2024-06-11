import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// this decorator can be used to get the current logged in user information easily
export const User = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
