import Command from "@cli-henry/command";
import { log } from "@cli-henry/utils";
import createTemplate from "./createTemplate.js";
import downloadTemplate from "./downloadTemplate.js";
import installTemplate from "./installTemplate.js";
class InitCommand extends Command {
  get command() {
    return "init [name]";
  }
  get description() {
    return "init project";
  }
  get options() {
    return [
      ["-f, --force", "是否强制更新", false],
      ["-t, --type <type>", "项目类型(project/page)"],
      ["-tp, --template <template>", "模板名称"],
    ];
  }
  async action([name, opts]) {
    log.verbose("init", name, opts);
    // 生成项目信息
    const template = await createTemplate(name, opts);
    log.verbose("template", template);
    // 下载模板到缓存目录
    await downloadTemplate(template);
    // 安装模板
    await installTemplate(template, opts);
  }
  preAction() {
    // console.log("preAction");
  }
  postAction() {
    // console.log("postAction");
  }
}

function Init(program) {
  return new InitCommand(program);
}

export default Init;
