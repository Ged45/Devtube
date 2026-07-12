import { Worker } from "bullmq";
const worker = new Worker("video-processing", async (job) => {
    console.log(job.data);
});
//# sourceMappingURL=video.worker.js.map