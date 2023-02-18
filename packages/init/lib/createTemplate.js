import { homedir } from "node:os";
import path from "node:path";
import { log, makeList, makeInput, getLatestVersion } from "@cli-henry/utils";
const ADD_TYPE_PAGE = "page";
const ADD_TYPE_PROJECT = "project";
const ADD_TEMPLATES = [
  {
    name: "vue3项目模板",
    npmName: "@cli-henry/template-vue3",
    value: "template-vue3",
    version: "1.0.0",
  },
  {
    name: "react18项目模板",
    npmName: "@cli-henry/template-react",
    value: "template-react",
    version: "1.0.0",
  },
];
const ADD_TYPE = [
  {
    name: "项目",
    value: ADD_TYPE_PROJECT,
  },
  {
    name: "页面",
    value: ADD_TYPE_PAGE,
  },
];
const TEMP_HOME = ".cli-henry";
// 获取创建类型
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: "请选择初始化类型",
    defaultValue: ADD_TYPE_PROJECT,
  });
}
function getAddName() {
  return makeInput({
    message: "请输入项目名称",
    defaultValue: "",
    validate(v) {
      if (v.length > 0) {
        return true;
      }
      return "项目名称必须输入";
    },
  });
}
function getAddTemplate() {
  return makeList({
    choices: ADD_TEMPLATES,
    message: "请选择项目模板",
  });
}

function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, "addTemplate");
}
// cli-henry init aaa -t project -tp template-vue3
export default async function createTemplate(name, opts) {
  const { type = null, template = null } = opts;
  let addType;
  let addName;
  let selectedTemplate;
  if (type) {
    addType = type;
  } else {
    addType = await getAddType();
  }
  log.verbose("addType", addType);
  if (addType === ADD_TYPE_PROJECT) {
    if (name) {
      addName = name;
    } else {
      addName = await getAddName();
    }
    log.verbose("addName", addName);
    if (template) {
      selectedTemplate = ADD_TEMPLATES.find((tp) => tp.value === template);
      if (!selectedTemplate) {
        throw new Error(`项目模板${template}不存在`);
      }
    } else {
      const addTemplate = await getAddTemplate();
      log.verbose("addTemplate", addTemplate);
      selectedTemplate = ADD_TEMPLATES.find((_) => _.value === addTemplate);
    }

    log.verbose("selectedTemplate", selectedTemplate);
    const latestVersion = await getLatestVersion(selectedTemplate.npmName);
    log.verbose("latestVersion", latestVersion);
    selectedTemplate.version = latestVersion;
    const targetPath = makeTargetPath();
    return {
      type: addType,
      name: addName,
      template: selectedTemplate,
      targetPath,
    };
  } else {
    throw new Error(`类型${addType}不支持`);
  }
}
