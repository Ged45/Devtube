import test from "node:test";
import assert from "node:assert/strict";
import { VideoController } from "./video.controller.js";

test("list forwards service errors to the error middleware", async () => {
  const service = {
    listVideos: async () => {
      throw new Error("database unavailable");
    },
    getVideo: async () => null,
  };

  const controller = new (VideoController as any)(service);

  let forwardedError: unknown;
  const req = {} as any;
  const res = {
    json: () => {
      throw new Error("response should not be sent");
    },
  } as any;
  const next = (err: unknown) => {
    forwardedError = err;
  };

  await controller.list(req, res, next);

  assert.ok(forwardedError instanceof Error);
  assert.equal((forwardedError as Error).message, "database unavailable");
});
