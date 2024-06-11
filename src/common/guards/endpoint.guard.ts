import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IAuthenticatedUser, IRole } from "src/interfaces";
import { ENDPOINT_CODE, ROLE_KEY } from "../decorators";
import { CacheClientService } from "../cacheclient/cache-client.service";
import { get } from "http";
import { log } from "console";

@Injectable()
export class EndPointGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly cacheClientService: CacheClientService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const endpointCode = this.reflector.get<string>(ENDPOINT_CODE, context.getHandler());
        if (endpointCode === undefined) return false;
    
        const request = context.switchToHttp().getRequest();
        const user = request.user as IAuthenticatedUser;

        log("Got user in endpoint guard, ", user);

        if (!user || !user.idp_user_id) {
          throw new UnauthorizedException('User not authenticated');
        }
    
        const idpUserId = user.idp_user_id;
        const allowedEndpoints: string[] = await this.getAllowedEndpoints(idpUserId);
    
        const canAccess = this.isAllowed(allowedEndpoints, endpointCode);
        if (!canAccess) {
          throw new UnauthorizedException(`Cannot access the resource.`);
        }
        return true;
      }

    isAllowed(allowedEndpoints: string[], requestedEndpoint: string): boolean {
        log("endpoints", allowedEndpoints);
        log("endpoint", requestedEndpoint);
        return allowedEndpoints.some((endpoint) => endpoint == requestedEndpoint);
    }

    async getAllowedEndpoints(idpUserId: string): Promise<string[]> {
        try {
            const endpoints = await this.cacheClientService.getUserCache("00000000-0000-0000-0000-000000000001");
            log("Got endpoints in endpoint guard, ", endpoints);
          return endpoints;
        } catch (error) {
          console.error('Error retrieving allowed endpoints from cache', error);
          return [];
        }
      }
}