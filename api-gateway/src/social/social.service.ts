import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { SocialServiceClientService } from "src/grpcClients/social-service-client.service";

@Injectable()
export class SocialService {
    constructor(private readonly socialServiceClientSerivce: SocialServiceClientService) {}

    async getFriendsById(userId: string) {
        try {
            const res = await firstValueFrom(this.socialServiceClientSerivce.getUserFriends({userId: userId}))
            return res
        } catch(err) {
            return err
        }
    }


    async addFriend(userId: string, targetId: any) {
        try {
            const res = await firstValueFrom(this.socialServiceClientSerivce.addFriend({requesterId: userId, targetId: targetId}))
            return res
        } catch(err) {
            return err
        }
    }
}