import { Queue } from "bullmq";
export const videoQueue = new Queue("video-processing", {
    connection: {
        host: "redis",
        port: 6379,
    },
});
//# sourceMappingURL=video.queue.js.map