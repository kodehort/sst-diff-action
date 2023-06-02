"use strict";
exports.id = 925;
exports.ids = [925];
exports.modules = {

/***/ 204925:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "usePythonHandler": () => (/* binding */ usePythonHandler)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(371017);
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(443181);
/* harmony import */ var _workers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(208457);
/* harmony import */ var _context_context_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(386382);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(532081);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(473837);
/* harmony import */ var _server_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(938870);
/* harmony import */ var _util_fs_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(981883);
/* harmony import */ var aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(160966);
/* harmony import */ var _pythonBundling_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(840641);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(822037);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(257310);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_workers_js__WEBPACK_IMPORTED_MODULE_7__, _server_js__WEBPACK_IMPORTED_MODULE_8__, _handlers_js__WEBPACK_IMPORTED_MODULE_9__]);
([_workers_js__WEBPACK_IMPORTED_MODULE_7__, _server_js__WEBPACK_IMPORTED_MODULE_8__, _handlers_js__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const execAsync = (0,util__WEBPACK_IMPORTED_MODULE_2__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_1__.exec);


const RUNTIME_MAP = {
    "python2.7": aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_3__.Runtime.PYTHON_2_7,
    "python3.6": aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_3__.Runtime.PYTHON_3_6,
    "python3.7": aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_3__.Runtime.PYTHON_3_7,
    "python3.8": aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_3__.Runtime.PYTHON_3_8,
    "python3.9": aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_3__.Runtime.PYTHON_3_9,
};
const usePythonHandler = _context_context_js__WEBPACK_IMPORTED_MODULE_6__/* .Context.memo */ ._.memo(async () => {
    const workers = await (0,_workers_js__WEBPACK_IMPORTED_MODULE_7__/* .useRuntimeWorkers */ .r)();
    const server = await (0,_server_js__WEBPACK_IMPORTED_MODULE_8__/* .useRuntimeServerConfig */ .M)();
    const handlers = (0,_handlers_js__WEBPACK_IMPORTED_MODULE_9__/* .useRuntimeHandlers */ .C)();
    const processes = new Map();
    const sources = new Map();
    async function findSrc(input) {
        const hints = ["requirements.txt", "Pipfile", "poetry.lock"];
        for (const hint of hints) {
            const result = await (0,_util_fs_js__WEBPACK_IMPORTED_MODULE_10__/* .findAbove */ .Z0)(input, hint);
            if (result)
                return result;
        }
    }
    handlers.register({
        shouldBuild: (input) => {
            const parent = sources.get(input.functionID);
            if (!parent)
                return false;
            return (0,_util_fs_js__WEBPACK_IMPORTED_MODULE_10__/* .isChild */ .Ub)(parent, input.file);
        },
        canHandle: (input) => input.startsWith("python"),
        startWorker: async (input) => {
            const src = await findSrc(input.handler);
            if (!src)
                throw new Error(`Could not find src for ${input.handler}`);
            const parsed = path__WEBPACK_IMPORTED_MODULE_0__.parse(path__WEBPACK_IMPORTED_MODULE_0__.relative(src, input.handler));
            const target = [...parsed.dir.split(path__WEBPACK_IMPORTED_MODULE_0__.sep), parsed.name].join(".");
            const proc = (0,child_process__WEBPACK_IMPORTED_MODULE_1__.spawn)(os__WEBPACK_IMPORTED_MODULE_4__.platform() === "win32" ? "python.exe" : "python3", [
                "-u",
                url__WEBPACK_IMPORTED_MODULE_5__.fileURLToPath(__webpack_require__.ab + "runtime.py"),
                target,
                src,
                parsed.ext.substring(1),
            ], {
                env: {
                    ...process.env,
                    ...input.environment,
                    IS_LOCAL: "true",
                    AWS_LAMBDA_FUNCTION_MEMORY_SIZE: "1024",
                    AWS_LAMBDA_RUNTIME_API: `localhost:${server.port}/${input.workerID}`,
                },
                shell: true,
                cwd: src,
            });
            proc.on("exit", () => workers.exited(input.workerID));
            proc.stdout.on("data", (data) => {
                workers.stdout(input.workerID, data.toString());
            });
            proc.stderr.on("data", (data) => {
                workers.stdout(input.workerID, data.toString());
            });
            processes.set(input.workerID, proc);
        },
        stopWorker: async (workerID) => {
            const proc = processes.get(workerID);
            if (proc) {
                proc.kill();
                processes.delete(workerID);
            }
        },
        build: async (input) => {
            if (input.mode === "start")
                return {
                    type: "success",
                    handler: input.props.handler,
                };
            const src = await findSrc(input.props.handler);
            if (!src)
                return {
                    type: "error",
                    errors: [`Could not find src for ${input.props.handler}`],
                };
            (0,_pythonBundling_js__WEBPACK_IMPORTED_MODULE_11__/* .bundle */ .gR)({
                installCommands: input.props.python?.installCommands,
                entry: src,
                runtime: RUNTIME_MAP[input.props.runtime],
                outputPathSuffix: ".",
                out: input.out,
            });
            /*
            await fs.cp(src, input.out, {
              recursive: true,
              filter: (src) => !src.includes(".sst"),
            });
      
            if (await existsAsync(path.join(src, "Pipfile"))) {
              await execAsync("pipenv requirements > requirements.txt", {
                cwd: input.out,
              });
            }
            if (await existsAsync(path.join(src, "poetry.lock"))) {
              await execAsync(
                "poetry export --with-credentials --format requirements.txt --output requirements.txt",
                {
                  cwd: input.out,
                }
              );
            }
            if (await existsAsync(path.join(src, "requirements.txt"))) {
              await execAsync("pip install -r requirements.txt", {
                cwd: input.out,
              });
            }
      
            if (input.props.python?.installCommands) {
              for (const cmd of input.props.python.installCommands) {
                await execAsync(cmd, {
                  cwd: input.out,
                });
              }
            }
            */
            return {
                type: "success",
                handler: path__WEBPACK_IMPORTED_MODULE_0__.relative(src, path__WEBPACK_IMPORTED_MODULE_0__.resolve(input.props.handler))
                    .split(path__WEBPACK_IMPORTED_MODULE_0__.sep)
                    .join(path__WEBPACK_IMPORTED_MODULE_0__.posix.sep),
            };
        },
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 840641:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gR": () => (/* binding */ bundle)
/* harmony export */ });
/* unused harmony exports DEPENDENCY_EXCLUDES, BUNDLER_DEPENDENCIES_CACHE, stageDependencies */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(657147);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(257310);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(371017);
/* harmony import */ var aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(479913);
/**
 * This file is copied from https://github.com/aws/aws-cdk/blob/master/packages/@aws-cdk/aws-lambda-python/lib/bundling.ts
 */




const __dirname = path__WEBPACK_IMPORTED_MODULE_2__.dirname(url__WEBPACK_IMPORTED_MODULE_1__.fileURLToPath(import.meta.url));
/**
 * Dependency files to exclude from the asset hash.
 */
const DEPENDENCY_EXCLUDES = (/* unused pure expression or super */ null && (["*.pyc"]));
/**
 * The location in the image that the bundler image caches dependencies.
 */
const BUNDLER_DEPENDENCIES_CACHE = "/var/dependencies";
/**
 * Produce bundled Lambda asset code
 */
function bundle(options) {
    const { entry, runtime, outputPathSuffix, installCommands } = options;
    const stagedir = aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.FileSystem.mkdtemp("python-bundling-");
    const hasDeps = stageDependencies(entry, stagedir);
    const hasInstallCommands = stageInstallCommands(installCommands || [], stagedir);
    // Determine which dockerfile to use. When dependencies are present, we use a
    // Dockerfile that can create a cacheable layer. We can't use this Dockerfile
    // if there aren't dependencies or the Dockerfile will complain about missing
    // sources.
    const dockerfile = hasInstallCommands
        ? "Dockerfile.custom"
        : hasDeps
            ? "Dockerfile.dependencies"
            : "Dockerfile";
    // copy Dockerfile to workdir
    fs__WEBPACK_IMPORTED_MODULE_0__.copyFileSync(__webpack_require__.ab + "python-runtime/" + dockerfile, path__WEBPACK_IMPORTED_MODULE_2__.join(stagedir, dockerfile));
    const image = aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.DockerImage.fromBuild(stagedir, {
        buildArgs: {
            IMAGE: runtime.bundlingImage.image,
        },
        file: dockerfile,
    });
    const outputPath = path__WEBPACK_IMPORTED_MODULE_2__.join(options.out, outputPathSuffix);
    // Copy dependencies to the bundle if applicable.
    if (hasDeps || hasInstallCommands) {
        image.cp(`${BUNDLER_DEPENDENCIES_CACHE}/.`, outputPath);
    }
    // Copy source code to the bundle.
    fs__WEBPACK_IMPORTED_MODULE_0__.cpSync(entry, outputPath, {
        recursive: true,
    });
}
/**
 * Checks to see if the `entry` directory contains a type of dependency that
 * we know how to install.
 */
function stageDependencies(entry, stagedir) {
    const prefixes = ["Pipfile", "pyproject", "poetry", "requirements.txt"];
    let found = false;
    for (const file of fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync(entry)) {
        for (const prefix of prefixes) {
            if (file.startsWith(prefix)) {
                fs__WEBPACK_IMPORTED_MODULE_0__.copyFileSync(path__WEBPACK_IMPORTED_MODULE_2__.join(entry, file), path__WEBPACK_IMPORTED_MODULE_2__.join(stagedir, file));
                found = true;
            }
        }
    }
    return found;
}
function stageInstallCommands(installCommands, stagedir) {
    let found = false;
    if (installCommands.length > 0) {
        const filePath = path__WEBPACK_IMPORTED_MODULE_2__.join(stagedir, "sst-deps-install-command.sh");
        fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync(filePath, installCommands.join(" && "));
        fs__WEBPACK_IMPORTED_MODULE_0__.chmodSync(filePath, "755");
        found = true;
    }
    return found;
}


/***/ })

};
;
//# sourceMappingURL=925.index.js.map