"use strict";
exports.id = 311;
exports.ids = [311];
exports.modules = {

/***/ 96311:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "publishDeployAssets": () => (/* binding */ publishDeployAssets)
/* harmony export */ });
/* harmony import */ var sst_aws_cdk_lib_logging_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(939367);
/* harmony import */ var sst_aws_cdk_lib_api_util_cloudformation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(554498);
/* harmony import */ var sst_aws_cdk_lib_api_toolkit_info_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(250400);
/* harmony import */ var sst_aws_cdk_lib_assets_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(566510);
/* harmony import */ var sst_aws_cdk_lib_util_asset_publishing_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(408586);
/* harmony import */ var sst_aws_cdk_lib_util_asset_manifest_builder_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(747318);
/* harmony import */ var _cloudformation_deployments_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(709318);
/* harmony import */ var _deploy_stack_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(438267);
/* harmony import */ var _context_context_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(386382);









async function publishDeployAssets(sdkProvider, options) {
    const { deployment, toolkitInfo, stackSdk, resolvedEnvironment, cloudFormationRoleArn, } = await useDeployment().get(sdkProvider, options);
    await deployment.publishStackAssets(options.stack, toolkitInfo, {
        buildAssets: options.buildAssets ?? true,
        publishOptions: {
            quiet: options.quiet,
            parallel: options.assetParallelism,
        },
    });
    return deployStack({
        stack: options.stack,
        noMonitor: true,
        resolvedEnvironment,
        deployName: options.deployName,
        notificationArns: options.notificationArns,
        quiet: options.quiet,
        sdk: stackSdk,
        sdkProvider,
        roleArn: cloudFormationRoleArn,
        reuseAssets: options.reuseAssets,
        toolkitInfo,
        tags: options.tags,
        deploymentMethod: options.deploymentMethod,
        force: options.force,
        parameters: options.parameters,
        usePreviousParameters: options.usePreviousParameters,
        progress: options.progress,
        ci: options.ci,
        rollback: options.rollback,
        hotswap: options.hotswap,
        extraUserAgent: options.extraUserAgent,
        resourcesToImport: options.resourcesToImport,
        overrideTemplate: options.overrideTemplate,
        assetParallelism: options.assetParallelism,
    });
}
const useDeployment = _context_context_js__WEBPACK_IMPORTED_MODULE_6__/* .Context.memo */ ._.memo(() => {
    const state = new Map();
    return {
        async get(sdkProvider, options) {
            const region = options.stack.environment.region;
            if (!state.has(region)) {
                const deployment = new _cloudformation_deployments_js__WEBPACK_IMPORTED_MODULE_7__.CloudFormationDeployments({ sdkProvider });
                const { stackSdk, resolvedEnvironment, cloudFormationRoleArn } = await deployment.prepareSdkFor(options.stack, options.roleArn);
                const toolkitInfo = await sst_aws_cdk_lib_api_toolkit_info_js__WEBPACK_IMPORTED_MODULE_2__/* .ToolkitInfo.lookup */ .Oo.lookup(resolvedEnvironment, stackSdk, options.toolkitStackName);
                // Do a verification of the bootstrap stack version
                await deployment.validateBootstrapStackVersion(options.stack.stackName, options.stack.requiresBootstrapStackVersion, options.stack.bootstrapStackVersionSsmParameter, toolkitInfo);
                state.set(region, {
                    deployment,
                    toolkitInfo,
                    stackSdk,
                    resolvedEnvironment,
                    cloudFormationRoleArn,
                });
            }
            return state.get(region);
        },
    };
});
async function deployStack(options) {
    const stackArtifact = options.stack;
    const stackEnv = options.resolvedEnvironment;
    options.sdk.appendCustomUserAgent(options.extraUserAgent);
    const cfn = options.sdk.cloudFormation();
    const deployName = options.deployName || stackArtifact.stackName;
    let cloudFormationStack = await sst_aws_cdk_lib_api_util_cloudformation_js__WEBPACK_IMPORTED_MODULE_1__.CloudFormationStack.lookup(cfn, deployName);
    if (cloudFormationStack.stackStatus.isCreationFailure) {
        (0,sst_aws_cdk_lib_logging_js__WEBPACK_IMPORTED_MODULE_0__.debug)(`Found existing stack ${deployName} that had previously failed creation. Deleting it before attempting to re-create it.`);
        await cfn.deleteStack({ StackName: deployName }).promise();
        const deletedStack = await (0,sst_aws_cdk_lib_api_util_cloudformation_js__WEBPACK_IMPORTED_MODULE_1__.waitForStackDelete)(cfn, deployName);
        if (deletedStack && deletedStack.stackStatus.name !== "DELETE_COMPLETE") {
            throw new Error(`Failed deleting stack ${deployName} that had previously failed creation (current state: ${deletedStack.stackStatus})`);
        }
        // Update variable to mark that the stack does not exist anymore, but avoid
        // doing an actual lookup in CloudFormation (which would be silly to do if
        // we just deleted it).
        cloudFormationStack = sst_aws_cdk_lib_api_util_cloudformation_js__WEBPACK_IMPORTED_MODULE_1__.CloudFormationStack.doesNotExist(cfn, deployName);
    }
    // Detect "legacy" assets (which remain in the metadata) and publish them via
    // an ad-hoc asset manifest, while passing their locations via template
    // parameters.
    const legacyAssets = new sst_aws_cdk_lib_util_asset_manifest_builder_js__WEBPACK_IMPORTED_MODULE_5__/* .AssetManifestBuilder */ .N();
    const assetParams = await (0,sst_aws_cdk_lib_assets_js__WEBPACK_IMPORTED_MODULE_3__/* .addMetadataAssetsToManifest */ .h)(stackArtifact, legacyAssets, options.toolkitInfo, options.reuseAssets);
    const finalParameterValues = { ...options.parameters, ...assetParams };
    const templateParams = sst_aws_cdk_lib_api_util_cloudformation_js__WEBPACK_IMPORTED_MODULE_1__.TemplateParameters.fromTemplate(stackArtifact.template);
    const stackParams = options.usePreviousParameters
        ? templateParams.updateExisting(finalParameterValues, cloudFormationStack.parameters)
        : templateParams.supplyAll(finalParameterValues);
    const bodyParameter = await (0,_deploy_stack_js__WEBPACK_IMPORTED_MODULE_8__/* .makeBodyParameter */ .lu)(stackArtifact, options.resolvedEnvironment, legacyAssets, options.toolkitInfo, options.sdk, options.overrideTemplate);
    await (0,sst_aws_cdk_lib_util_asset_publishing_js__WEBPACK_IMPORTED_MODULE_4__/* .publishAssets */ .nf)(legacyAssets.toManifest(stackArtifact.assembly.directory), options.sdkProvider, stackEnv, {
        parallel: options.assetParallelism,
    });
    return {
        isUpdate: cloudFormationStack.exists &&
            cloudFormationStack.stackStatus.name !== "REVIEW_IN_PROGRESS",
        params: {
            StackName: deployName,
            TemplateBody: bodyParameter.TemplateBody,
            TemplateURL: bodyParameter.TemplateURL,
            Parameters: stackParams.apiParameters,
            Capabilities: [
                "CAPABILITY_IAM",
                "CAPABILITY_NAMED_IAM",
                "CAPABILITY_AUTO_EXPAND",
            ],
            Tags: options.tags,
        },
    };
}


/***/ })

};
;
//# sourceMappingURL=311.index.js.map