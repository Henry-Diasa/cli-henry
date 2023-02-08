const Command = require("@cli-henry/command");

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
    console.log("init", name, opts);
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

module.exports = Init;
