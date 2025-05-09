import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CustomLogger } from "src/libs/common/logger/logger.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaReplicaService } from "src/prisma/prismaReplica.service";

@Injectable()
export class ReplicationService {
    constructor(
        private readonly master: PrismaService,
        private readonly replica: PrismaReplicaService,
        private readonly customLogger: CustomLogger,
    ) { }

    @Cron("*/5 * * * *")
    async replicate() {
        this.customLogger.log("Replication started", 'replication.service');
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        try {
            const posts = await this.master.post.findMany({
                where: {
                    createdAt: { gte: fiveMinutesAgo },
                },
                include: {
                    comments: true,
                    likes: true,
                    medias: true,
                },
            });

            for (const post of posts) {
                await this.replica.post.upsert({
                    where: { id: post.id },
                    update: {},
                    create: {
                        id: post.id,
                        content: post.content,
                        authorId: post.authorId,
                        createdAt: post.createdAt,
                        updatedAt: post.updatedAt,
                    },
                });

                for (const comment of post.comments) {
                    await this.replica.comment.upsert({
                        where: { id: comment.id },
                        update: {},
                        create: {
                            id: comment.id,
                            text: comment.text,
                            postId: comment.postId,
                            userId: comment.userId,
                            createdAt: comment.createdAt,
                        },
                    });
                }

                for (const like of post.likes) {
                    await this.replica.like.upsert({
                        where: { id: like.id },
                        update: {},
                        create: {
                            id: like.id,
                            postId: like.postId,
                            userId: like.userId,
                            createdAt: like.createdAt,
                        },
                    });
                }

                for (const media of post.medias) {
                    await this.replica.media.upsert({
                        where: { id: media.id },
                        update: {},
                        create: {
                            id: media.id,
                            url: media.url,
                            type: media.type,
                            postId: media.postId ?? null,
                        },
                    });
                }
            }

            this.customLogger.log(`✅ Репликация завершена: ${posts.length} постов обработано`, 'replictaion Service');


        } catch (err) {
            this.customLogger.error("Error replication", err, 'replication.service');
        }
    }
}