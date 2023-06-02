"use strict";
exports.id = 287;
exports.ids = [287];
exports.modules = {

/***/ 486287:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(371017);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(657147);
/* harmony import */ var _Stack_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(647438);
/* harmony import */ var _Construct_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(446330);
/* harmony import */ var _Function_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(976235);
/* harmony import */ var _util_functionBinding_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(977691);
/* harmony import */ var _FunctionalStack_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(371409);
/* harmony import */ var module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(498188);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(981785);
/* harmony import */ var _deferred_task_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(495684);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(570819);
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(296250);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(364003);
/* harmony import */ var aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(479913);
/* harmony import */ var aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(160966);
/* harmony import */ var aws_cdk_lib_aws_s3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(812251);
/* harmony import */ var aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(503232);
/* harmony import */ var aws_cdk_lib_aws_logs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(652351);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Auth_js__WEBPACK_IMPORTED_MODULE_10__, _Construct_js__WEBPACK_IMPORTED_MODULE_12__, _Function_js__WEBPACK_IMPORTED_MODULE_13__, _util_functionBinding_js__WEBPACK_IMPORTED_MODULE_14__, _Stack_js__WEBPACK_IMPORTED_MODULE_15__, _FunctionalStack_js__WEBPACK_IMPORTED_MODULE_17__]);
([_Auth_js__WEBPACK_IMPORTED_MODULE_10__, _Construct_js__WEBPACK_IMPORTED_MODULE_12__, _Function_js__WEBPACK_IMPORTED_MODULE_13__, _util_functionBinding_js__WEBPACK_IMPORTED_MODULE_14__, _Stack_js__WEBPACK_IMPORTED_MODULE_15__, _FunctionalStack_js__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


















const require = (0,module__WEBPACK_IMPORTED_MODULE_2__.createRequire)(import.meta.url);
function exitWithMessage(message) {
    console.error(message);
    process.exit(1);
}
/**
 * The App construct extends cdk.App and is used internally by SST.
 */
class App extends aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.App {
    /**
     * Whether or not the app is running locally under `sst start`
     */
    local = false;
    /**
     * Whether the app is running locally under start, deploy or remove
     */
    mode;
    /**
     * The name of your app, comes from the `name` in your `sst.config.ts`
     */
    name;
    /**
     * The stage the app is being deployed to. If this is not specified as the --stage option, it'll default to the stage configured during the initial run of the SST CLI.
     */
    stage;
    /**
     * The region the app is being deployed to. If this is not specified as the --region option in the SST CLI, it'll default to the region in your sst.config.ts.
     */
    region;
    /**
     * The AWS account the app is being deployed to. This comes from the IAM credentials being used to run the SST CLI.
     */
    account;
    /** @internal */
    debugStartedAt;
    /** @internal */
    debugIncreaseTimeout;
    /** @internal */
    appPath;
    /** @internal */
    isActiveStack;
    /** @internal */
    defaultFunctionProps;
    _defaultRemovalPolicy;
    /** @internal */
    get defaultRemovalPolicy() {
        return this._defaultRemovalPolicy;
    }
    /**
     * @internal
     */
    constructor(deployProps, props = {}) {
        super(props);
        _context_js__WEBPACK_IMPORTED_MODULE_8__/* .AppContext.provide */ .Il.provide(this);
        this.appPath = process.cwd();
        this.mode = deployProps.mode;
        this.local = this.mode === "dev";
        this.stage = deployProps.stage || "dev";
        this.name = deployProps.name || "my-app";
        this.region =
            deployProps.region || process.env.CDK_DEFAULT_REGION || "us-east-1";
        this.account =
            deployProps.account || process.env.CDK_DEFAULT_ACCOUNT || "my-account";
        this.isActiveStack = deployProps.isActiveStack;
        this.defaultFunctionProps = [];
        if (this.mode === "dev") {
            this.debugStartedAt = deployProps.debugStartedAt;
            this.debugIncreaseTimeout = deployProps.debugIncreaseTimeout;
        }
    }
    /**
     * Use this method to prefix resource names in your stacks to make sure they don't thrash when deployed to different stages in the same AWS account. This method will prefix a given resource name with the stage and app name. Using the format `${stage}-${name}-${logicalName}`.
     * @example
     * ```js
     * console.log(app.logicalPrefixedName("myTopic"));
     *
     * // dev-my-app-myTopic
     * ```
     */
    logicalPrefixedName(logicalName) {
        const namePrefix = this.name === "" ? "" : `${this.name}-`;
        return `${this.stage}-${namePrefix}${logicalName}`;
    }
    /**
     * The default removal policy that'll be applied to all the resources in the app. This can be useful to set ephemeral (dev or feature branch) environments to remove all the resources on deletion.
     * :::danger
     * Make sure to not set the default removal policy to `DESTROY` for production environments.
     * :::
     * @example
     * ```js
     * app.setDefaultRemovalPolicy(app.mode === "dev" ? "destroy" : "retain")
     * ```
     */
    setDefaultRemovalPolicy(policy) {
        this._defaultRemovalPolicy = policy;
    }
    /**
     * The default function props to be applied to all the Lambda functions in the app. These default values will be overridden if a Function sets its own props.
     * This needs to be called before a stack with any functions have been added to the app.
     *
     * @example
     * ```js
     * app.setDefaultFunctionProps({
     *   runtime: "nodejs12.x",
     *   timeout: 30
     * })
     * ```
     */
    setDefaultFunctionProps(props) {
        this.defaultFunctionProps.push(props);
    }
    /**
     * Adds additional default Permissions to be applied to all Lambda functions in the app.
     *
     * @example
     * ```js
     * app.addDefaultFunctionPermissions(["s3"])
     * ```
     */
    addDefaultFunctionPermissions(permissions) {
        this.defaultFunctionProps.push({
            permissions,
        });
    }
    /**
     * Adds additional default environment variables to be applied to all Lambda functions in the app.
     *
     * @example
     * ```js
     * app.addDefaultFunctionEnv({
     *   "MY_ENV_VAR": "my-value"
     * })
     * ```
     */
    addDefaultFunctionEnv(environment) {
        this.defaultFunctionProps.push({
            environment,
        });
    }
    /**
     * Binds additional default resources to be applied to all Lambda functions in the app.
     *
     * @example
     * ```js
     * app.addDefaultFunctionBinding([STRIPE_KEY, bucket]);
     * ```
     */
    addDefaultFunctionBinding(bind) {
        this.defaultFunctionProps.push({ bind });
    }
    /**
     * Adds additional default layers to be applied to all Lambda functions in the stack.
     */
    addDefaultFunctionLayers(layers) {
        this.defaultFunctionProps.push({
            layers,
        });
    }
    isFinished = false;
    async finish() {
        if (this.isFinished)
            return;
        this.isFinished = true;
        await (0,_deferred_task_js__WEBPACK_IMPORTED_MODULE_9__/* .useDeferredTasks */ .A)().run();
        _Auth_js__WEBPACK_IMPORTED_MODULE_10__/* .Auth.injectConfig */ .g.injectConfig();
        this.buildConstructsMetadata();
        this.ensureUniqueConstructIds();
        this.codegenTypes();
        this.createBindingSsmParameters();
        this.removeGovCloudUnsupportedResourceProperties();
        const { config } = (0,_project_js__WEBPACK_IMPORTED_MODULE_11__.useProject)();
        for (const child of this.node.children) {
            if ((0,_Construct_js__WEBPACK_IMPORTED_MODULE_12__/* .isStackConstruct */ .Xp)(child)) {
                // Tag stacks
                aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.Tags.of(child).add("sst:app", this.name);
                aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.Tags.of(child).add("sst:stage", this.stage);
                // Set removal policy
                if (this._defaultRemovalPolicy)
                    this.applyRemovalPolicy(child, this._defaultRemovalPolicy);
                // Stack names need to be parameterized with the stage name
                if (config.advanced?.disableParameterizedStackNameCheck !== true &&
                    !child.stackName.startsWith(`${this.stage}-`) &&
                    !child.stackName.endsWith(`-${this.stage}`) &&
                    child.stackName.indexOf(`-${this.stage}-`) === -1) {
                    throw new Error(`Stack "${child.stackName}" is not parameterized with the stage name. The stack name needs to either start with "$stage-", end in "-$stage", or contain the stage name "-$stage-".`);
                }
            }
        }
    }
    isRunningSSTTest() {
        // Check the env var set inside test/setup-tests.js
        return process.env.SST_RESOURCES_TESTS === "enabled";
    }
    getInputFilesFromEsbuildMetafile(file) {
        let metaJson;
        try {
            metaJson = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync(file).toString());
        }
        catch (e) {
            exitWithMessage("There was a problem reading the esbuild metafile.");
        }
        return Object.keys(metaJson.inputs).map((input) => path__WEBPACK_IMPORTED_MODULE_0__.resolve(input));
    }
    createBindingSsmParameters() {
        class CreateSsmParameters {
            visit(c) {
                if (!(0,_Construct_js__WEBPACK_IMPORTED_MODULE_12__/* .isSSTConstruct */ .we)(c)) {
                    return;
                }
                if (c instanceof _Function_js__WEBPACK_IMPORTED_MODULE_13__/* .Function */ .N && c._doNotAllowOthersToBind) {
                    return;
                }
                (0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_14__/* .bindParameters */ .$v)(c);
            }
        }
        aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.Aspects.of(this).add(new CreateSsmParameters());
    }
    buildConstructsMetadata() {
        const constructs = this.buildConstructsMetadata_collectConstructs(this);
        const byStack = {};
        const local = [];
        for (const c of constructs) {
            const stack = _Stack_js__WEBPACK_IMPORTED_MODULE_15__/* .Stack.of */ .K.of(c);
            const list = byStack[stack.node.id] || [];
            const metadata = c.getConstructMetadata();
            const item = {
                id: c.node.id,
                addr: c.node.addr,
                stack: _Stack_js__WEBPACK_IMPORTED_MODULE_15__/* .Stack.of */ .K.of(c).stackName,
                ...metadata,
            };
            local.push(item);
            list.push({
                ...item,
                local: undefined,
            });
            byStack[stack.node.id] = list;
        }
        // Register constructs
        for (const child of this.node.children) {
            if (child instanceof _Stack_js__WEBPACK_IMPORTED_MODULE_15__/* .Stack */ .K) {
                const stackName = child.node.id;
                child.addOutputs({
                    SSTMetadata: JSON.stringify({
                        app: this.name,
                        stage: this.stage,
                        version: (0,_project_js__WEBPACK_IMPORTED_MODULE_11__.useProject)().version,
                        metadata: byStack[stackName] || [],
                    }),
                });
            }
        }
    }
    buildConstructsMetadata_collectConstructs(construct) {
        return [
            (0,_Construct_js__WEBPACK_IMPORTED_MODULE_12__/* .isSSTConstruct */ .we)(construct) ? construct : undefined,
            ...construct.node.children.flatMap((c) => this.buildConstructsMetadata_collectConstructs(c)),
        ].filter((c) => Boolean(c));
    }
    applyRemovalPolicy(current, policy) {
        if (current instanceof aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.CfnResource) {
            current.applyRemovalPolicy(aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.RemovalPolicy[policy.toUpperCase()]);
        }
        // Had to copy this in to enable deleting objects in bucket
        // https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/aws-s3/lib/bucket.ts#L1910
        if (current instanceof aws_cdk_lib_aws_s3__WEBPACK_IMPORTED_MODULE_5__.Bucket &&
            !current.node.tryFindChild("AutoDeleteObjectsCustomResource")) {
            const AUTO_DELETE_OBJECTS_RESOURCE_TYPE = "Custom::S3AutoDeleteObjects";
            const provider = aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.CustomResourceProvider.getOrCreateProvider(current, AUTO_DELETE_OBJECTS_RESOURCE_TYPE, {
                codeDirectory: path__WEBPACK_IMPORTED_MODULE_0__.join(require.resolve("aws-cdk-lib/aws-s3"), "../lib/auto-delete-objects-handler"),
                runtime: aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.CustomResourceProviderRuntime.NODEJS_16_X,
                description: `Lambda function for auto-deleting objects in ${current.bucketName} S3 bucket.`,
            });
            // Use a bucket policy to allow the custom resource to delete
            // objects in the bucket
            current.addToResourcePolicy(new aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_6__.PolicyStatement({
                actions: [
                    // list objects
                    "s3:GetBucket*",
                    "s3:List*",
                    // and then delete them
                    "s3:DeleteObject*",
                ],
                resources: [current.bucketArn, current.arnForObjects("*")],
                principals: [new aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_6__.ArnPrincipal(provider.roleArn)],
            }));
            const customResource = new aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.CustomResource(current, "AutoDeleteObjectsCustomResource", {
                resourceType: AUTO_DELETE_OBJECTS_RESOURCE_TYPE,
                serviceToken: provider.serviceToken,
                properties: {
                    BucketName: current.bucketName,
                },
            });
            // Ensure bucket policy is deleted AFTER the custom resource otherwise
            // we don't have permissions to list and delete in the bucket.
            // (add a `if` to make TS happy)
            if (current.policy) {
                customResource.node.addDependency(current.policy);
            }
        }
        current.node.children.forEach((resource) => this.applyRemovalPolicy(resource, policy));
    }
    removeGovCloudUnsupportedResourceProperties() {
        if (!this.region.startsWith("us-gov-")) {
            return;
        }
        class RemoveGovCloudUnsupportedResourceProperties {
            visit(node) {
                if (node instanceof aws_cdk_lib_aws_lambda__WEBPACK_IMPORTED_MODULE_4__.CfnFunction) {
                    node.addPropertyDeletionOverride("EphemeralStorage");
                }
                else if (node instanceof aws_cdk_lib_aws_logs__WEBPACK_IMPORTED_MODULE_7__.CfnLogGroup) {
                    node.addPropertyDeletionOverride("Tags");
                }
            }
        }
        aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.Aspects.of(this).add(new RemoveGovCloudUnsupportedResourceProperties());
    }
    ensureUniqueConstructIds() {
        // "ids" has the shape of:
        // {
        //   Table: {
        //     "id_with_hyphen": "id-with-hyphen",
        //     "id_with_underscore": "id_with_underscore",
        //   }
        // }
        const ids = {};
        class EnsureUniqueConstructIds {
            visit(c) {
                if (!(0,_Construct_js__WEBPACK_IMPORTED_MODULE_12__/* .isSSTConstruct */ .we)(c)) {
                    return;
                }
                if (c instanceof _Function_js__WEBPACK_IMPORTED_MODULE_13__/* .Function */ .N && c._doNotAllowOthersToBind) {
                    return;
                }
                const className = c.constructor.name;
                const id = c.id;
                const normId = id.replace(/-/g, "_");
                const existingIds = ids[className] || {};
                if (!id.match(/^[a-zA-Z]([a-zA-Z0-9-_])*$/)) {
                    throw new Error([
                        `Invalid id "${id}" for ${className} construct.`,
                        ``,
                        `Starting v1.16, construct ids can only contain alphabetic characters, hyphens ("-"), and underscores ("_"), and must start with an alphabetic character. If you are migrating from version 1.15 or earlier, please see the upgrade guide — https://docs.serverless-stack.com/upgrade-guide#upgrade-to-v116`,
                    ].join("\n"));
                }
                else if (["Parameter", "Secret"].includes(className)) {
                    const existingConfigId = ids.Secret?.[normId] || ids.Parameter?.[normId];
                    if (existingConfigId === id) {
                        throw new Error(`ERROR: Config with id "${id}" already exists.`);
                    }
                    else if (existingConfigId) {
                        throw new Error(`ERROR: You cannot have the same Config id with an underscore and hyphen: "${existingConfigId}" and "${id}".`);
                    }
                }
                else if (existingIds[normId]) {
                    throw new Error([
                        existingIds[normId] === id
                            ? `${className} with id "${id}" already exists.`
                            : `You cannot have the same ${className} id with an underscore and hyphen: "${existingIds[normId]}" and "${id}".`,
                        ``,
                        `Starting v1.16, constructs must have unique ids for a given construct type. If you are migrating from version 1.15 or earlier, set the "cdk.id" in the construct with the existing id, and pick a unique id for the construct. Please see the upgrade guide — https://docs.serverless-stack.com/upgrade-guide#upgrade-to-v116`,
                        ``,
                        `    For example, if you have two Bucket constructs with the same id:`,
                        `      new Bucket(this, "bucket");`,
                        `      new Bucket(this, "bucket");`,
                        ``,
                        `    Change it to:`,
                        `      new Bucket(this, "usersBucket", {`,
                        `        cdk: {`,
                        `          id: "bucket"`,
                        `        }`,
                        `      });`,
                        `      new Bucket(this, "adminBucket", {`,
                        `        cdk: {`,
                        `          id: "bucket"`,
                        `        }`,
                        `      });`,
                    ].join("\n"));
                }
                existingIds[normId] = id;
                ids[className] = existingIds;
            }
        }
        aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.Aspects.of(this).add(new EnsureUniqueConstructIds());
    }
    codegenTypes() {
        const project = (0,_project_js__WEBPACK_IMPORTED_MODULE_11__.useProject)();
        const typesPath = path__WEBPACK_IMPORTED_MODULE_0__.resolve(project.paths.out, "types");
        _logger_js__WEBPACK_IMPORTED_MODULE_16__/* .Logger.debug */ .Y.debug(`Generating types in ${typesPath}`);
        fs__WEBPACK_IMPORTED_MODULE_1__.rmSync(typesPath, {
            recursive: true,
            force: true,
        });
        fs__WEBPACK_IMPORTED_MODULE_1__.mkdirSync(typesPath, {
            recursive: true,
        });
        fs__WEBPACK_IMPORTED_MODULE_1__.appendFileSync(`${typesPath}/index.ts`, [
            `import "sst/node/config";`,
            `declare module "sst/node/config" {`,
            `  export interface ConfigTypes {`,
            `    APP: string;`,
            `    STAGE: string;`,
            `  }`,
            `}`,
        ].join("\n"));
        class CodegenTypes {
            visit(c) {
                if (!(0,_Construct_js__WEBPACK_IMPORTED_MODULE_12__/* .isSSTConstruct */ .we)(c)) {
                    return;
                }
                if (c instanceof _Function_js__WEBPACK_IMPORTED_MODULE_13__/* .Function */ .N && c._doNotAllowOthersToBind) {
                    return;
                }
                const binding = (0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_14__/* .bindType */ .xz)(c);
                if (!binding) {
                    return;
                }
                const className = c.constructor.name;
                const id = c.id;
                // Case 1: variable does not have properties, ie. Secrets and Parameters
                fs__WEBPACK_IMPORTED_MODULE_1__.appendFileSync(`${typesPath}/index.ts`, (binding.variables[0] === "."
                    ? [
                        `import "sst/node/${binding.clientPackage}";`,
                        `declare module "sst/node/${binding.clientPackage}" {`,
                        `  export interface ${className}Resources {`,
                        `    "${id}": string;`,
                        `  }`,
                        `}`,
                    ]
                    : [
                        `import "sst/node/${binding.clientPackage}";`,
                        `declare module "sst/node/${binding.clientPackage}" {`,
                        `  export interface ${className}Resources {`,
                        `    "${id}": {`,
                        ...binding.variables.map((p) => `      ${p}: string;`),
                        `    }`,
                        `  }`,
                        `}`,
                    ]).join("\n"));
            }
        }
        aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.Aspects.of(this).add(new CodegenTypes());
    }
    // Functional Stack
    // This is a magical global to avoid having to pass app everywhere.
    // We only every have one instance of app
    stack(fn, props) {
        return (0,_FunctionalStack_js__WEBPACK_IMPORTED_MODULE_17__/* .stack */ .kn)(this, fn, props);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 981785:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ Auth)
/* harmony export */ });
/* harmony import */ var aws_cdk_lib_aws_ssm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(410760);
/* harmony import */ var aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(503232);
/* harmony import */ var constructs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(146804);
/* harmony import */ var _Stack_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(647438);
/* harmony import */ var _util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(977691);
/* harmony import */ var aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(479913);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Stack_js__WEBPACK_IMPORTED_MODULE_4__, _util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__]);
([_Stack_js__WEBPACK_IMPORTED_MODULE_4__, _util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const PUBLIC_KEY_PROP = "publicKey";
const PRIVATE_KEY_PROP = "privateKey";
const PREFIX_PROP = "prefix";
/**
 * SST Auth is a lightweight authentication solution for your applications. With a simple set of configuration you can deploy a function attached to your API that can handle various authentication flows.  *
 * @example
 * ```
 * import { Auth } from "sst/constructs"
 *
 * new Auth(stack, "auth", {
 *   authenticator: "functions/authenticator.handler"
 * })
 */
class Auth extends constructs__WEBPACK_IMPORTED_MODULE_2__.Construct {
    id;
    authenticator;
    apis = new Set();
    /** @internal */
    static list = new Set();
    constructor(scope, id, props) {
        super(scope, props.cdk?.id || id);
        if (!props.authenticator ||
            "defaults" in props ||
            "login" in props ||
            "triggers" in props ||
            "identityPoolFederation" in props ||
            "cdk" in props) {
            throw new Error(`It looks like you may be passing in Cognito props to the Auth construct. The Auth construct was renamed to Cognito in version 1.10.0`);
        }
        Auth.list.add(this);
        this.id = id;
        const stack = _Stack_js__WEBPACK_IMPORTED_MODULE_4__/* .Stack.of */ .K.of(scope);
        this.authenticator = props.authenticator;
        const policy = new aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_1__.Policy(this, "CloudFrontInvalidatorPolicy", {
            statements: [
                new aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_1__.PolicyStatement({
                    actions: [
                        "ssm:GetParameter",
                        "ssm:PutParameter",
                        "ssm:DeleteParameter",
                    ],
                    resources: [
                        `arn:${stack.partition}:ssm:${stack.region}:${stack.account}:parameter/*`,
                    ],
                }),
            ],
        });
        stack.customResourceHandler.role?.attachInlinePolicy(policy);
        const resource = new aws_cdk_lib_core__WEBPACK_IMPORTED_MODULE_3__.CustomResource(this, "StackMetadata", {
            serviceToken: stack.customResourceHandler.functionArn,
            resourceType: "Custom::AuthKeys",
            properties: {
                publicPath: (0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getParameterPath */ .Rq)(this, PUBLIC_KEY_PROP),
                privatePath: (0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getParameterPath */ .Rq)(this, PRIVATE_KEY_PROP),
            },
        });
        resource.node.addDependency(policy);
    }
    /** @internal */
    getConstructMetadata() {
        return {
            type: "Auth",
            data: {},
        };
    }
    /** @internal */
    getFunctionBinding() {
        const app = this.node.root;
        return {
            clientPackage: "auth",
            variables: {
                publicKey: {
                    type: "secret",
                },
                // Example of referencing a secret
                //publicKey2: {
                //  type: "secret_reference",
                //  secret: this.publicKey2,
                //},
            },
            permissions: {
                "ssm:GetParameters": [
                    `arn:${_Stack_js__WEBPACK_IMPORTED_MODULE_4__/* .Stack.of */ .K.of(this).partition}:ssm:${app.region}:${app.account}:parameter${(0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getParameterPath */ .Rq)(this, PUBLIC_KEY_PROP)}`,
                ],
            },
        };
    }
    /**
     * Attaches auth construct to an API
     *
     * @example
     * ```js
     * const api = new Api(stack, "Api", {});
     * const auth = new Auth(stack, "Auth", {
     *   authenticator: "functions/authenticator.handler"
     * })
     * auth.attach(stack, {
     *   api
     * })
     * ```
     */
    attach(scope, props) {
        const app = this.node.root;
        // Validate: one Auth can only be attached to one Api
        if (this.apis.has(props.api)) {
            throw new Error("This Auth construct has already been attached to this Api construct.");
        }
        // Validate: one Api can only have one Auth attached to it
        if (Array.from(Auth.list).some((auth) => auth.apis.has(props.api))) {
            throw new Error("This Api construct already has an Auth construct attached.");
        }
        const prefix = props.prefix || "/auth";
        for (let path of [`ANY ${prefix}/{proxy+}`, `GET ${prefix}`]) {
            props.api.addRoutes(scope, {
                [path]: {
                    type: "function",
                    function: this.authenticator,
                    authorizer: "none",
                },
            });
            // Auth construct has two types of Function bindinds:
            // - Api routes: bindings defined in `getFunctionBinding()`
            //     ie. calling `bind([auth])` will grant functions access to the public key
            // - Auth authenticator: binds manually. Need to grant access to the prefix and private key
            const fn = props.api.getFunction(path);
            fn.addEnvironment((0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getEnvironmentKey */ .JV)(this, PREFIX_PROP), prefix);
            fn.addEnvironment((0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getEnvironmentKey */ .JV)(this, PUBLIC_KEY_PROP), (0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .placeholderSecretValue */ .vG)());
            fn.addEnvironment((0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getEnvironmentKey */ .JV)(this, PRIVATE_KEY_PROP), (0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .placeholderSecretValue */ .vG)());
            fn.attachPermissions([
                new aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_1__.PolicyStatement({
                    actions: ["ssm:GetParameters"],
                    effect: aws_cdk_lib_aws_iam__WEBPACK_IMPORTED_MODULE_1__.Effect.ALLOW,
                    resources: [
                        `arn:${_Stack_js__WEBPACK_IMPORTED_MODULE_4__/* .Stack.of */ .K.of(this).partition}:ssm:${app.region}:${app.account}:parameter${(0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getParameterPath */ .Rq)(this, "*")}`,
                    ],
                }),
            ]);
        }
        // Create a parameter for prefix
        // note: currently if an Auth construct is attached to multiple Apis,
        //       the prefix has to be the same for this to work.
        if (this.apis.size === 0) {
            new aws_cdk_lib_aws_ssm__WEBPACK_IMPORTED_MODULE_0__.StringParameter(this, "prefix", {
                parameterName: (0,_util_functionBinding_js__WEBPACK_IMPORTED_MODULE_5__/* .getParameterPath */ .Rq)(this, PREFIX_PROP),
                stringValue: prefix,
            });
        }
        this.apis.add(props.api);
    }
    /**
     * @internal
     */
    injectConfig() {
        for (const api of this.apis) {
            for (const route of api.routes) {
                const fn = api.getFunction(route);
                if (!fn)
                    continue;
                fn.bind([this]);
            }
        }
    }
    /**
     * @internal
     */
    static injectConfig() {
        for (const auth of Auth.list) {
            auth.injectConfig();
        }
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 371409:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "kn": () => (/* binding */ stack)
/* harmony export */ });
/* unused harmony exports use, dependsOn, getStack */
/* harmony import */ var _Stack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(647438);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Stack_js__WEBPACK_IMPORTED_MODULE_0__]);
_Stack_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function stack(app, fn, props) {
    currentApp = app;
    currentStack = fn;
    const id = props?.id || fn.name;
    const exists = getExports(app).has(fn);
    if (exists)
        throw new Error(`StackDuplicates: Attempting to initialize stack ${id} several times`);
    class EmptyStack extends _Stack_js__WEBPACK_IMPORTED_MODULE_0__/* .Stack */ .K {
        constructor(scope, id, props) {
            super(scope, id, props);
        }
    }
    const stack = new EmptyStack(app, id, props);
    getStacks(app).set(fn, stack);
    const ctx = {
        app,
        stack,
    };
    const returns = fn.bind(stack)(ctx);
    if (returns && "then" in returns)
        return returns.then((data) => {
            getExports(app).set(fn, data);
        });
    getExports(app).set(fn, returns);
    return app;
}
let currentApp;
let currentStack;
const exportsCache = new Map();
const stackCache = new Map();
function getExports(app) {
    if (!exportsCache.has(app))
        exportsCache.set(app, new Map());
    return exportsCache.get(app);
}
function getStacks(app) {
    if (!stackCache.has(app))
        stackCache.set(app, new Map());
    return stackCache.get(app);
}
function use(stack) {
    if (!currentApp)
        throw new Error("No app is set");
    const exports = getExports(currentApp);
    if (!exports.has(stack))
        throw new Error(`StackWrongOrder: Initialize "${stack.name}" stack before "${currentStack?.name}" stack`);
    return exports.get(stack);
}
function dependsOn(stack) {
    const current = getStack(currentStack);
    const target = getStack(stack);
    current.addDependency(target);
}
function getStack(stack) {
    if (!currentApp)
        throw new Error("No app is set");
    const stacks = getStacks(currentApp);
    if (!stacks.has(stack))
        throw new Error(`StackWrongOrder: Initialize "${stack.name}" stack before "${currentStack?.name}" stack`);
    return stacks.get(stack);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=287.index.js.map