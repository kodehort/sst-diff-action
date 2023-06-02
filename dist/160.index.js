"use strict";
exports.id = 160;
exports.ids = [160];
exports.modules = {

/***/ 443160:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useRustHandler": () => (/* binding */ useRustHandler)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(371017);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(773292);
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(443181);
/* harmony import */ var _workers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(208457);
/* harmony import */ var _context_context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(386382);
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(394083);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(532081);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(473837);
/* harmony import */ var _server_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(938870);
/* harmony import */ var _util_fs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(981883);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_workers_js__WEBPACK_IMPORTED_MODULE_5__, _server_js__WEBPACK_IMPORTED_MODULE_6__, _handlers_js__WEBPACK_IMPORTED_MODULE_7__]);
([_workers_js__WEBPACK_IMPORTED_MODULE_5__, _server_js__WEBPACK_IMPORTED_MODULE_6__, _handlers_js__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const execAsync = (0,util__WEBPACK_IMPORTED_MODULE_3__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_2__.exec);
const useRustHandler = _context_context_js__WEBPACK_IMPORTED_MODULE_4__/* .Context.memo */ ._.memo(async () => {
    const workers = await (0,_workers_js__WEBPACK_IMPORTED_MODULE_5__/* .useRuntimeWorkers */ .r)();
    const server = await (0,_server_js__WEBPACK_IMPORTED_MODULE_6__/* .useRuntimeServerConfig */ .M)();
    const handlers = (0,_handlers_js__WEBPACK_IMPORTED_MODULE_7__/* .useRuntimeHandlers */ .C)();
    const processes = new Map();
    const sources = new Map();
    const handlerName = process.platform === "win32" ? `handler.exe` : `handler`;
    handlers.register({
        shouldBuild: (input) => {
            if (!input.file.endsWith(".rs"))
                return false;
            const parent = sources.get(input.functionID);
            if (!parent)
                return false;
            const result = (0,_util_fs_js__WEBPACK_IMPORTED_MODULE_8__/* .isChild */ .Ub)(parent, input.file);
            return result;
        },
        canHandle: (input) => input.startsWith("rust"),
        startWorker: async (input) => {
            const proc = (0,child_process__WEBPACK_IMPORTED_MODULE_2__.spawn)(path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, handlerName), {
                env: {
                    ...process.env,
                    ...input.environment,
                    IS_LOCAL: "true",
                    RUST_BACKTRACE: "1",
                    AWS_LAMBDA_RUNTIME_API: `http://localhost:${server.port}/${input.workerID}`,
                    AWS_LAMBDA_FUNCTION_MEMORY_SIZE: "1024",
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
            const project = await (0,_util_fs_js__WEBPACK_IMPORTED_MODULE_8__/* .findAbove */ .Z0)(parsed.dir, "Cargo.toml");
            if (!project)
                return {
                    type: "error",
                    errors: ["Could not find a Cargo.toml file"],
                };
            sources.set(input.functionID, project);
            if (input.mode === "start") {
                try {
                    await execAsync(`cargo build --bin ${parsed.name}`, {
                        cwd: project,
                        env: {
                            ...process.env,
                        },
                    });
                    await fs_promises__WEBPACK_IMPORTED_MODULE_1__.cp(path__WEBPACK_IMPORTED_MODULE_0__.join(project, `target/debug`, parsed.name), path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, "handler"));
                }
                catch (ex) {
                    throw new _error_js__WEBPACK_IMPORTED_MODULE_9__/* .VisibleError */ .q("Failed to build");
                }
            }
            if (input.mode === "deploy") {
                try {
                    await execAsync(`cargo lambda build --release --bin ${parsed.name}`, {
                        cwd: project,
                        env: {
                            ...process.env,
                        },
                    });
                    await fs_promises__WEBPACK_IMPORTED_MODULE_1__.cp(path__WEBPACK_IMPORTED_MODULE_0__.join(project, `target/lambda/`, parsed.name, "bootstrap"), path__WEBPACK_IMPORTED_MODULE_0__.join(input.out, "bootstrap"));
                }
                catch (ex) {
                    throw new _error_js__WEBPACK_IMPORTED_MODULE_9__/* .VisibleError */ .q("Failed to build");
                }
            }
            return {
                type: "success",
                handler: "handler",
            };
        },
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=160.index.js.map