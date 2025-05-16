import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { SocialServiceClientService } from "src/grpcClients/social-service-client.service";
import { FriendRes, UserList } from "./types/social_service";

@Injectable()
export class SocialService {
    constructor(private readonly socialServiceClientSerivce: SocialServiceClientService) {}

    async getFriendsById(userId: string): Promise<UserList> {
        try {
            const res = await firstValueFrom(this.socialServiceClientSerivce.getUserFriends({userId: userId}))
            return res
        } catch(err) {
            return err
        }
    }


    async addFriend(userId: string, targetId: any): Promise<FriendRes> {
        try {
            const res = await firstValueFrom(this.socialServiceClientSerivce.addFriend({requesterId: userId, targetId: targetId}))
            return res
        } catch(err) {
            return err
        }
    }
}