import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";
import fs from "fs";

const version = +new Date();
dotenv.config();
const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

function insertHashToIndex() {
  let indexHtml = fs.readFileSync("public/index.html", "utf8");
  indexHtml = indexHtml
    .replace("/build/bundle.css", "/build/" + version + "bundle.css")
    .replace("/build/bundle.js", "/build/" + version + "bundle.js");

  // You can create a new file if you don't want to make a mutable modification.
  fs.writeFileSync("public/index.html", indexHtml);
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/" + version + "bundle.js",
  },
  plugins: [
    json(),
    replace({
      values: {
        "process.env.AUTH0_DOMAIN": JSON.stringify(process.env.AUTH0_DOMAIN),
        "process.env.AUTH0_CLIENT_ID": JSON.stringify(
          process.env.AUTH0_CLIENT_ID
        ),
        "process.env.AUTH0_AUDIENCE": JSON.stringify(
          process.env.AUTH0_AUDIENCE
        ),
        "process.env.API_SERVER_URL": JSON.stringify(
          process.env.API_SERVER_URL
        ),
      },
      preventAssignment: false,
    }),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: version + "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    // !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && insertHashToIndex() && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
