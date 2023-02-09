import path from "node:path";
import { execa } from "execa";

const CLI = path.join(__dirname, "../bin/cli.js");
const bin =
  () =>
  (...args) =>
    execa(CLI, args);

test("run error command", async () => {
  const { stderr } = await bin()("iii");
  console.log(stderr);
});
