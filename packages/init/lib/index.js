import Command from "@cli-henry/command";
import { log } from "@cli-henry/utils";
class InitCommand extends Command {
  get command() {
    return "init [name]";
  }
  get description() {
    return "init project";
  }
  get options() {
    return [["-f, --force", "是否强制更新", false]];
  }
  action([name, opts]) {
    log.verbose("init", name, opts);
  }
  preAction() {
    console.log("preAction");
  }
  postAction() {
    console.log("postAction");
  }
}

function Init(program) {
  return new InitCommand(program);
}

export default Init;
