import{b as U,c as N,h as C,j as v,v as E,x as O}from"./chunk-PT6L7NJD.mjs";import"./chunk-7H2TFXPN.mjs";import"./chunk-IQOVF5LO.mjs";import{a as P}from"./chunk-5PARVRO5.mjs";import"./chunk-3PEVV4HI.mjs";import"./chunk-R6PYGTER.mjs";import"./chunk-SUBS3TDM.mjs";import"./chunk-KU6QELUJ.mjs";import"./chunk-ISPMX3VH.mjs";import"./chunk-THC7OU5T.mjs";import{e as q}from"./chunk-7S7IXY6P.mjs";import r from"path";import h from"fs/promises";import{exec as A}from"child_process";import H from"fs";var W=q(N(),1);import M from"url";import{Worker as $}from"worker_threads";var oe=P.memo(async()=>{let w=await O(),_=E(),u={},g=C(),b=new Map;_.register({shouldBuild:e=>{var f;let t=u[e.functionID];if(!t)return!1;let s=r.relative(g.paths.root,e.file).split(r.sep).join(r.posix.sep);return!!((f=t.metafile)!=null&&f.inputs[s])},canHandle:e=>e.startsWith("nodejs"),startWorker:async e=>{new Promise(async()=>{let t=new $(M.fileURLToPath(new URL("../../support/nodejs-runtime/index.mjs",import.meta.url)),{env:{...e.environment,IS_LOCAL:"true"},execArgv:["--enable-source-maps"],workerData:e,stderr:!0,stdin:!0,stdout:!0});t.stdout.on("data",s=>{w.stdout(e.workerID,s.toString())}),t.stderr.on("data",s=>{w.stdout(e.workerID,s.toString())}),t.on("exit",()=>w.exited(e.workerID)),b.set(e.workerID,t)})},stopWorker:async e=>{let t=b.get(e);await(t==null?void 0:t.terminate())},build:async e=>{var I;let t=u[e.functionID],s=r.parse(e.props.handler),f=[".ts",".tsx",".mts",".cts",".js",".jsx",".mjs",".cjs"].map(n=>r.join(s.dir,s.name+n)).find(n=>H.existsSync(n));if(!f)return{type:"error",errors:[`Could not find file for handler "${e.props.handler}"`]};let i=e.props.nodejs||{},y=(i.format||"esm")==="esm",x=r.relative(g.paths.root,r.resolve(s.dir)),L=y?".mjs":".cjs",R=r.join(e.out,!x.startsWith("..")&&!r.isAbsolute(e.props.handler)?x:"",s.name+L),D=r.relative(e.out,R.replace(L,s.ext)).split(r.sep).join(r.posix.sep);if(t!=null&&t.rebuild){let n=await t.rebuild();return u[e.functionID]=n,{type:"success",handler:D}}let{external:j,...F}=i.esbuild||{},S=["sharp","pg-native",...y||e.props.runtime==="nodejs18.x"?[]:["aws-sdk"]],T={entryPoints:[f],platform:"node",external:[...S,...i.install||[],...j||[]],loader:i.loader,keepNames:!0,bundle:!0,logLevel:"silent",metafile:!0,...y?{format:"esm",target:"esnext",mainFields:["module","main"],banner:{js:["import { createRequire as topLevelCreateRequire } from 'module';","const require = topLevelCreateRequire(import.meta.url);",'import { fileURLToPath as topLevelFileUrlToPath, URL as topLevelURL } from "url"','const __dirname = topLevelFileUrlToPath(new topLevelURL(".", import.meta.url))',i.banner||""].join(`
`)}}:{format:"cjs",target:"node14",banner:i.banner?{js:i.banner}:void 0},outfile:R,sourcemap:e.mode==="start"?"linked":i.sourcemap,minify:i.minify,...F};try{let n=await W.default.build(T),m=[...i.install||[],...S.filter(o=>o!=="aws-sdk").filter(o=>!(j!=null&&j.includes(o))).filter(o=>{var a;return Object.values(((a=n.metafile)==null?void 0:a.inputs)||{}).some(({imports:l})=>l.some(({path:c})=>c===o))})],d=[];Object.entries(((I=n.metafile)==null?void 0:I.inputs)||{}).forEach(([o,{imports:a}])=>a.filter(({path:l})=>l.includes("sst/constructs")).forEach(({path:l})=>{d.push(`You are importing from "${l}" in "${o}". Did you mean to import from "sst/node"?`)}));async function p(o,a){if(o==="/")throw new U("Could not find a package.json file");return await h.access(r.join(o,a)).then(()=>!0).catch(()=>!1)?o:p(r.join(o,".."),a)}if(e.mode==="deploy"&&m){let o=await p(s.dir,"package.json"),a=JSON.parse(await h.readFile(r.join(o,"package.json")).then(c=>c.toString()));h.writeFile(r.join(e.out,"package.json"),JSON.stringify({dependencies:Object.fromEntries(m.map(c=>{var k;return[c,((k=a.dependencies)==null?void 0:k[c])||"*"]}))}));let l=["npm install"];m.includes("sharp")&&l.push("--platform=linux",e.props.architecture==="arm_64"?"--arch=arm64":"--arch=x64"),await new Promise(c=>{A(l.join(" "),{cwd:e.out}).on("exit",()=>c())})}if(e.mode==="start"){let o=r.join(await p(s.dir,"package.json"),"node_modules");try{await h.symlink(r.resolve(o),r.resolve(r.join(e.out,"node_modules")),"dir")}catch{}}return u[e.functionID]=n,{type:"success",handler:D}}catch(n){let m=n;return"errors"in m?{type:"error",errors:m.errors.flatMap(d=>{var p,o,a;return[v.bold(d.text),((p=d.location)==null?void 0:p.file)||"",v.dim((o=d.location)==null?void 0:o.line,"\u2502",(a=d.location)==null?void 0:a.lineText)]})}:{type:"error",errors:[n.toString()]}}}})});export{oe as useNodeHandler};
