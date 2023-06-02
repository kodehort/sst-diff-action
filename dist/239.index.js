"use strict";
exports.id = 239;
exports.ids = [239];
exports.modules = {

/***/ 213239:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useNodeHandler": () => (/* binding */ useNodeHandler)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(371017);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(773292);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(532081);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(657147);
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(296250);
/* harmony import */ var esbuild__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(165931);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(257310);
/* harmony import */ var worker_threads__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(271267);
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(443181);
/* harmony import */ var _workers_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(208457);
/* harmony import */ var _context_context_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(386382);
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(394083);
/* harmony import */ var _cli_colors_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(227844);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_workers_js__WEBPACK_IMPORTED_MODULE_8__, _handlers_js__WEBPACK_IMPORTED_MODULE_9__]);
([_workers_js__WEBPACK_IMPORTED_MODULE_8__, _handlers_js__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const useNodeHandler = _context_context_js__WEBPACK_IMPORTED_MODULE_7__/* .Context.memo */ ._.memo(async () => {
    const workers = await (0,_workers_js__WEBPACK_IMPORTED_MODULE_8__/* .useRuntimeWorkers */ .r)();
    const handlers = (0,_handlers_js__WEBPACK_IMPORTED_MODULE_9__/* .useRuntimeHandlers */ .C)();
    const cache = {};
    const project = (0,_project_js__WEBPACK_IMPORTED_MODULE_10__.useProject)();
    const threads = new Map();
    handlers.register({
        shouldBuild: (input) => {
            const result = cache[input.functionID];
            if (!result)
                return false;
            const relative = path__WEBPACK_IMPORTED_MODULE_0__.relative(project.paths.root, input.file)
                .split(path__WEBPACK_IMPORTED_MODULE_0__.sep)
                .join(path__WEBPACK_IMPORTED_MODULE_0__.posix.sep);
            return Boolean(result.metafile?.inputs[relative]);
        },
        canHandle: (input) => input.startsWith("nodejs"),
        startWorker: async (input) => {
            new Promise(async () => {
                const worker = new worker_threads__WEBPACK_IMPORTED_MODULE_6__.Worker(url__WEBPACK_IMPORTED_MODULE_5__.fileURLToPath(__webpack_require__.ab + "index.mjs"), {
                    env: {
                        ...input.environment,
                        IS_LOCAL: "true",
                    },
                    execArgv: ["--enable-source-maps"],
                    workerData: input,
                    stderr: true,
                    stdin: true,
                    stdout: true,
                });
                worker.stdout.on("data", (data) => {
                    workers.stdout(input.workerID, data.toString());
                });
                worker.stderr.on("data", (data) => {
                    workers.stdout(input.workerID, data.toString());
                });
                worker.on("exit", () => workers.exited(input.workerID));
                threads.set(input.workerID, worker);
            });
        },
        stopWorker: async (workerID) => {
            const worker = threads.get(workerID);
            await worker?.terminate();
        },
        build: async (input) => {
            const exists = cache[input.functionID];
            const parsed = path__WEBPACK_IMPORTED_MODULE_0__.parse(input.props.handler);
            const file = [
                ".ts",
                ".tsx",
                ".mts",
                ".cts",
                ".js",
                ".jsx",
                ".mjs",
                ".cjs",
            ]
                .map((ext) => path__WEBPACK_IMPORTED_MODULE_0__.join(parsed.dir, parsed.name + ext))
                .find((file) => {
                return fs__WEBPACK_IMPORTED_MODULE_3__.existsSync(file);
            });
            if (!file)
                return {
                    type: "error",
                    errors: [`Could not find file for handler "${input.props.handler}"`],
                };
            const nodejs = input.props.nodejs || {};
            const isESM = (nodejs.format || "esm") === "esm";
            const relative = path__WEBPACK_IMPORTED_MODULE_0__.relative(project.paths.root, path__WEBPACK_IMPORTED_MODULE_0__.resolve(parsed.dir));
            const extension = isESM ? ".mjs" : ".cjs";
            const target = path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, !relative.startsWith("..") && !path__WEBPACK_IMPORTED_MODULE_0__.isAbsolute(input.props.handler)
                ? relative
                : "", parsed.name + extension);
            const handler = path__WEBPACK_IMPORTED_MODULE_0__.relative(input.out, target.replace(extension, parsed.ext))
                .split(path__WEBPACK_IMPORTED_MODULE_0__.sep)
                .join(path__WEBPACK_IMPORTED_MODULE_0__.posix.sep);
            if (exists?.rebuild) {
                const result = await exists.rebuild();
                cache[input.functionID] = result;
                return {
                    type: "success",
                    handler,
                };
            }
            const { external, ...override } = nodejs.esbuild || {};
            const forceExternal = [
                "sharp",
                "pg-native",
                ...(isESM || input.props.runtime === "nodejs18.x" ? [] : ["aws-sdk"]),
            ];
            const options = {
                entryPoints: [file],
                platform: "node",
                external: [
                    ...forceExternal,
                    ...(nodejs.install || []),
                    ...(external || []),
                ],
                loader: nodejs.loader,
                keepNames: true,
                bundle: true,
                logLevel: "silent",
                metafile: true,
                ...(isESM
                    ? {
                        format: "esm",
                        target: "esnext",
                        mainFields: ["module", "main"],
                        banner: {
                            js: [
                                `import { createRequire as topLevelCreateRequire } from 'module';`,
                                `const require = topLevelCreateRequire(import.meta.url);`,
                                `import { fileURLToPath as topLevelFileUrlToPath, URL as topLevelURL } from "url"`,
                                `const __dirname = topLevelFileUrlToPath(new topLevelURL(".", import.meta.url))`,
                                nodejs.banner || "",
                            ].join("\n"),
                        },
                    }
                    : {
                        format: "cjs",
                        target: "node14",
                        banner: nodejs.banner
                            ? {
                                js: nodejs.banner,
                            }
                            : undefined,
                    }),
                outfile: target,
                sourcemap: input.mode === "start" ? "linked" : nodejs.sourcemap,
                minify: nodejs.minify,
                ...override,
            };
            try {
                const result = await esbuild__WEBPACK_IMPORTED_MODULE_4__.build(options);
                // Install node_modules
                const installPackages = [
                    ...(nodejs.install || []),
                    ...forceExternal
                        .filter((pkg) => pkg !== "aws-sdk")
                        .filter((pkg) => !external?.includes(pkg))
                        .filter((pkg) => Object.values(result.metafile?.inputs || {}).some(({ imports }) => imports.some(({ path }) => path === pkg))),
                ];
                // TODO bubble up the warnings
                const warnings = [];
                Object.entries(result.metafile?.inputs || {}).forEach(([inputPath, { imports }]) => imports
                    .filter(({ path }) => path.includes("sst/constructs"))
                    .forEach(({ path }) => {
                    warnings.push(`You are importing from "${path}" in "${inputPath}". Did you mean to import from "sst/node"?`);
                }));
                async function find(dir, target) {
                    if (dir === "/")
                        throw new _error_js__WEBPACK_IMPORTED_MODULE_11__/* .VisibleError */ .q("Could not find a package.json file");
                    if (await fs_promises__WEBPACK_IMPORTED_MODULE_1__.access(path__WEBPACK_IMPORTED_MODULE_0__.join(dir, target))
                        .then(() => true)
                        .catch(() => false))
                        return dir;
                    return find(path__WEBPACK_IMPORTED_MODULE_0__.join(dir, ".."), target);
                }
                if (input.mode === "deploy" && installPackages) {
                    const src = await find(parsed.dir, "package.json");
                    const json = JSON.parse(await fs_promises__WEBPACK_IMPORTED_MODULE_1__.readFile(path__WEBPACK_IMPORTED_MODULE_0__.join(src, "package.json"))
                        .then((x) => x.toString()));
                    fs_promises__WEBPACK_IMPORTED_MODULE_1__.writeFile(path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, "package.json"), JSON.stringify({
                        dependencies: Object.fromEntries(installPackages.map((x) => [x, json.dependencies?.[x] || "*"])),
                    }));
                    const cmd = ["npm install"];
                    if (installPackages.includes("sharp")) {
                        cmd.push("--platform=linux", input.props.architecture === "arm_64"
                            ? "--arch=arm64"
                            : "--arch=x64");
                    }
                    await new Promise((resolve) => {
                        const process = (0,child_process__WEBPACK_IMPORTED_MODULE_2__.exec)(cmd.join(" "), {
                            cwd: input.out,
                        });
                        process.on("exit", () => resolve());
                    });
                }
                if (input.mode === "start") {
                    const dir = path__WEBPACK_IMPORTED_MODULE_0__.join(await find(parsed.dir, "package.json"), "node_modules");
                    try {
                        await fs_promises__WEBPACK_IMPORTED_MODULE_1__.symlink(path__WEBPACK_IMPORTED_MODULE_0__.resolve(dir), path__WEBPACK_IMPORTED_MODULE_0__.resolve(path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, "node_modules")), "dir");
                    }
                    catch { }
                }
                cache[input.functionID] = result;
                return {
                    type: "success",
                    handler,
                };
            }
            catch (ex) {
                const result = ex;
                if ("errors" in result) {
                    return {
                        type: "error",
                        errors: result.errors.flatMap((x) => [
                            _cli_colors_js__WEBPACK_IMPORTED_MODULE_12__/* .Colors.bold */ .w.bold(x.text),
                            x.location?.file || "",
                            _cli_colors_js__WEBPACK_IMPORTED_MODULE_12__/* .Colors.dim */ .w.dim(x.location?.line, "│", x.location?.lineText),
                        ]),
                    };
                }
                return {
                    type: "error",
                    errors: [ex.toString()],
                };
            }
        },
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=239.index.js.map