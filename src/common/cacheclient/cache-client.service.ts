import { Injectable } from "@nestjs/common";
import { UserService } from "../../app/user/user.service";
import { RedisClientService } from "../redisclient/redis-client.service";
import { log } from "console";

@Injectable()
export class CacheClientService {
    constructor(private readonly userService: UserService, private readonly redisClientService: RedisClientService){}

    async getUserCache(idpUserId: string): Promise<string[]> {
        try {
            log("Reached cache client, ", idpUserId);
            let allowedEndpoints = await this.redisClientService.getValue(idpUserId);

            if(allowedEndpoints === null) {
                return this.userService.invalidateUserCache(idpUserId);        
            }
            
            allowedEndpoints = JSON.parse(allowedEndpoints);
            return Array.isArray(allowedEndpoints) ? allowedEndpoints : [];
        } catch (e) {
            log("Failed to fetch user cache for user from the cache client.")
        }
        
        // TODO: this should be the server call to the user service
        return this.userService.invalidateUserCache(idpUserId);
    }

}