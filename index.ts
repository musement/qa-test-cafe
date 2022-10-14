/* eslint-env node */

import cafe from "./cafe";
import fs from "fs";
import pkg from "./package.json";

require("dotenv").config({ path: ".devcontainer/.env" });

function getArgs() {
  const args: Record<string, string | boolean> = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
  });
  return args;
}

const args = getArgs();

if (Object.prototype.hasOwnProperty.call(args, "domain") === false) {
  throw Error("Please specify the domain area (eg. --domain=login)");
}

if (typeof args.domain !== "string" || fs.existsSync(args.domain) === false) {
  throw Error(`Domain ${args.domain} does not exist`);
}

if (Object.prototype.hasOwnProperty.call(args, "is-browser-stack") === false) {
  throw Error(
    "Please specify the flag is-browser-stack (eg. --is-browser-stack=true)"
  );
}

if (Object.prototype.hasOwnProperty.call(args, "headless") === false) {
  throw Error("Please specify the flag headless (eg. --headless=true)");
}

let isHeadlessMode = "" + args.headless;

let runtimeOptions = {
  skipJsErrors: process.env.TEST_CAFE_SKIPJSERRORS === "true",
  quarantineMode: process.env.TEST_CAFE_QUARANTINEMODE === "true",
  selectorTimeout: process.env.TEST_CAFE_SELECTORTIMEOUT
    ? parseInt(process.env.TEST_CAFE_SELECTORTIMEOUT)
    : 10000,
  assertionTimeout: process.env.TEST_CAFE_ASSERTIONTIMEOUT
    ? parseInt(process.env.TEST_CAFE_ASSERTIONTIMEOUT)
    : 10000,
  pageLoadTimeout: process.env.TEST_CAFE_PAGELOADTIMEOUT
    ? parseInt(process.env.TEST_CAFE_PAGELOADTIMEOUT)
    : 10000,
  speed: process.env.TEST_CAFE_SPEED
    ? parseInt(process.env.TEST_CAFE_SPEED)
    : 1,
  debugMode: process.env.TEST_CAFE_DEBUGMODE === "true",
  stopOnFirstFail: process.env.TEST_CAFE_STOP_ON_FIRST_FAIL === "true",
};

let browsersList;
if (args.isBrowserStack === "true") {
  if (process.env.TEST_CAFE_SPEED && process.env.TEST_CAFE_SPEED !== "1") {
    throw Error(
      'You cannot set "speed" different from 1 with browserstack flag'
    );
  }
  if (process.env.TEST_CAFE_DEBUGMODE) {
    throw Error('You cannot enable "debugMode" with browserstack flag');
  }

  process.env.BROWSERSTACK_PROJECT_NAME = `${pkg.name}, ${args.domain}`;
  process.env.BROWSERSTACK_BUILD_ID = pkg.version;

  browsersList = (process.env.BROWSERSTACK_BROWSERS_LIST ?? "").split(",");
} else {
  browsersList = (process.env.TEST_CAFE_BROWSERS_LIST ?? "").split(",");
}

/* start e2e test */
cafe.run(
  [`${args.domain}/fixtures/*`],
  browsersList,
  process.env.TEST_CAFE_REPORTER!,
  runtimeOptions,
  isHeadlessMode
);
