import{b as n,d,f as l,v as m,w as f,x as p}from"./chunk-PT6L7NJD.mjs";import"./chunk-7H2TFXPN.mjs";import"./chunk-IQOVF5LO.mjs";import{a as c}from"./chunk-5PARVRO5.mjs";import"./chunk-3PEVV4HI.mjs";import"./chunk-R6PYGTER.mjs";import"./chunk-SUBS3TDM.mjs";import"./chunk-KU6QELUJ.mjs";import"./chunk-ISPMX3VH.mjs";import"./chunk-THC7OU5T.mjs";import"./chunk-7S7IXY6P.mjs";import t from"path";import u from"fs/promises";import{exec as y,spawn as I}from"child_process";import{promisify as v}from"util";var w=v(y),E=c.memo(async()=>{let s=await p(),h=await f(),b=m(),a=new Map,i=new Map,g=process.platform==="win32"?"handler.exe":"handler";b.register({shouldBuild:r=>{if(!r.file.endsWith(".rs"))return!1;let e=i.get(r.functionID);return e?l(e,r.file):!1},canHandle:r=>r.startsWith("rust"),startWorker:async r=>{let e=I(t.join(r.out,g),{env:{...process.env,...r.environment,IS_LOCAL:"true",RUST_BACKTRACE:"1",AWS_LAMBDA_RUNTIME_API:`http://localhost:${h.port}/${r.workerID}`,AWS_LAMBDA_FUNCTION_MEMORY_SIZE:"1024"},cwd:r.out});e.on("exit",()=>s.exited(r.workerID)),e.stdout.on("data",o=>{s.stdout(r.workerID,o.toString())}),e.stderr.on("data",o=>{s.stdout(r.workerID,o.toString())}),a.set(r.workerID,e)},stopWorker:async r=>{let e=a.get(r);e&&(e.kill(),a.delete(r))},build:async r=>{let e=t.parse(r.props.handler),o=await d(e.dir,"Cargo.toml");if(!o)return{type:"error",errors:["Could not find a Cargo.toml file"]};if(i.set(r.functionID,o),r.mode==="start")try{await w(`cargo build --bin ${e.name}`,{cwd:o,env:{...process.env}}),await u.cp(t.join(o,"target/debug",e.name),t.join(r.out,"handler"))}catch{throw new n("Failed to build")}if(r.mode==="deploy")try{await w(`cargo lambda build --release --bin ${e.name}`,{cwd:o,env:{...process.env}}),await u.cp(t.join(o,"target/lambda/",e.name,"bootstrap"),t.join(r.out,"bootstrap"))}catch{throw new n("Failed to build")}return{type:"success",handler:"handler"}}})});export{E as useRustHandler};
