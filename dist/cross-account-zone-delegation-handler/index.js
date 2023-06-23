"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handler=void 0;const aws_sdk_1=require("aws-sdk");async function handler(event){const resourceProps=event.ResourceProperties;switch(event.RequestType){case"Create":case"Update":return cfnEventHandler(resourceProps,!1);case"Delete":return cfnEventHandler(resourceProps,!0)}}exports.handler=handler;async function cfnEventHandler(props,isDeleteEvent){const{AssumeRoleArn,ParentZoneId,ParentZoneName,DelegatedZoneName,DelegatedZoneNameServers,TTL,UseRegionalStsEndpoint}=props;if(!ParentZoneId&&!ParentZoneName)throw Error("One of ParentZoneId or ParentZoneName must be specified");const credentials=await getCrossAccountCredentials(AssumeRoleArn,!!UseRegionalStsEndpoint),route53=new aws_sdk_1.Route53({credentials}),parentZoneId=ParentZoneId??await getHostedZoneIdByName(ParentZoneName,route53);await route53.changeResourceRecordSets({HostedZoneId:parentZoneId,ChangeBatch:{Changes:[{Action:isDeleteEvent?"DELETE":"UPSERT",ResourceRecordSet:{Name:DelegatedZoneName,Type:"NS",TTL,ResourceRecords:DelegatedZoneNameServers.map(ns=>({Value:ns}))}}]}}).promise()}async function getCrossAccountCredentials(roleArn,regionalEndpoint){const sts=new aws_sdk_1.STS(regionalEndpoint?{stsRegionalEndpoints:"regional"}:{}),timestamp=new Date().getTime(),{Credentials:assumedCredentials}=await sts.assumeRole({RoleArn:roleArn,RoleSessionName:`cross-account-zone-delegation-${timestamp}`}).promise();if(!assumedCredentials)throw Error("Error getting assume role credentials");return new aws_sdk_1.Credentials({accessKeyId:assumedCredentials.AccessKeyId,secretAccessKey:assumedCredentials.SecretAccessKey,sessionToken:assumedCredentials.SessionToken})}async function getHostedZoneIdByName(name,route53){const matchedZones=(await route53.listHostedZonesByName({DNSName:name}).promise()).HostedZones.filter(zone=>zone.Name===`${name}.`);if(matchedZones.length!==1)throw Error(`Expected one hosted zone to match the given name but found ${matchedZones.length}`);return matchedZones[0].Id}