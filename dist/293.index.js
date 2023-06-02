"use strict";
exports.id = 293;
exports.ids = [293];
exports.modules = {

/***/ 574293:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useGoHandler": () => (/* binding */ useGoHandler)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(371017);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(773292);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(822037);
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(443181);
/* harmony import */ var _workers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(208457);
/* harmony import */ var _context_context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(386382);
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(394083);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(532081);
/* harmony import */ var _server_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(938870);
/* harmony import */ var _util_fs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(981883);
/* harmony import */ var _util_process_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(987700);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_workers_js__WEBPACK_IMPORTED_MODULE_5__, _server_js__WEBPACK_IMPORTED_MODULE_6__, _handlers_js__WEBPACK_IMPORTED_MODULE_7__]);
([_workers_js__WEBPACK_IMPORTED_MODULE_5__, _server_js__WEBPACK_IMPORTED_MODULE_6__, _handlers_js__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const useGoHandler = _context_context_js__WEBPACK_IMPORTED_MODULE_4__/* .Context.memo */ ._.memo(async () => {
    const workers = await (0,_workers_js__WEBPACK_IMPORTED_MODULE_5__/* .useRuntimeWorkers */ .r)();
    const server = await (0,_server_js__WEBPACK_IMPORTED_MODULE_6__/* .useRuntimeServerConfig */ .M)();
    const handlers = (0,_handlers_js__WEBPACK_IMPORTED_MODULE_7__/* .useRuntimeHandlers */ .C)();
    const processes = new Map();
    const sources = new Map();
    const handlerName = process.platform === "win32" ? `bootstrap.exe` : `bootstrap`;
    handlers.register({
        shouldBuild: (input) => {
            const parent = sources.get(input.functionID);
            if (!parent)
                return false;
            return (0,_util_fs_js__WEBPACK_IMPORTED_MODULE_8__/* .isChild */ .Ub)(parent, input.file);
        },
        canHandle: (input) => input.startsWith("go"),
        startWorker: async (input) => {
            const proc = (0,child_process__WEBPACK_IMPORTED_MODULE_3__.spawn)(path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, handlerName), {
                env: {
                    ...process.env,
                    ...input.environment,
                    IS_LOCAL: "true",
                    AWS_LAMBDA_RUNTIME_API: `localhost:${server.port}/${input.workerID}`,
                },
                cwd: input.out,
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
            const parsed = path__WEBPACK_IMPORTED_MODULE_0__.parse(input.props.handler);
            const project = await find(parsed.dir, "go.mod");
            sources.set(input.functionID, project);
            const src = path__WEBPACK_IMPORTED_MODULE_0__.relative(project, input.props.handler);
            if (input.mode === "start") {
                try {
                    const target = path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, handlerName);
                    const srcPath = os__WEBPACK_IMPORTED_MODULE_2__.platform() === "win32" ? src.replaceAll("\\", "\\\\") : src;
                    const result = await (0,_util_process_js__WEBPACK_IMPORTED_MODULE_9__/* .execAsync */ .N)(`go build -ldflags "-s -w" -o "${target}" ./${srcPath}`, {
                        cwd: project,
                        env: {
                            ...process.env,
                        },
                    });
                }
                catch (ex) {
                    return {
                        type: "error",
                        errors: [String(ex)],
                    };
                }
            }
            if (input.mode === "deploy") {
                try {
                    const target = path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, "bootstrap");
                    const srcPath = os__WEBPACK_IMPORTED_MODULE_2__.platform() === "win32" ? src.replaceAll("\\", "\\\\") : src;
                    await (0,_util_process_js__WEBPACK_IMPORTED_MODULE_9__/* .execAsync */ .N)(`go build -ldflags "-s -w" -o "${target}" ./${srcPath}`, {
                        cwd: project,
                        env: {
                            ...process.env,
                            CGO_ENABLED: "0",
                            GOARCH: input.props.architecture === "arm_64" ? "arm64" : "amd64",
                            GOOS: "linux",
                        },
                    });
                }
                catch (ex) {
                    return {
                        type: "error",
                        errors: [String(ex)],
                    };
                }
            }
            return {
                type: "success",
                handler: "bootstrap",
            };
        },
    });
});
async function find(dir, target) {
    if (dir === "/")
        throw new _error_js__WEBPACK_IMPORTED_MODULE_10__/* .VisibleError */ .q(`Could not find a ${target} file`);
    if (await fs_promises__WEBPACK_IMPORTED_MODULE_1__.access(path__WEBPACK_IMPORTED_MODULE_0__.join(dir, target))
        .then(() => true)
        .catch(() => false))
        return dir;
    return find(path__WEBPACK_IMPORTED_MODULE_0__.join(dir, ".."), target);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=293.index.js.map