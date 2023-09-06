const {exec}=require('child_process');
const { dir } = require('console');
const path=require('path');

const dirCodes=path.join(__dirname,"codes");

const executeCode=(jobId,format)=>{
    let language='cpp';
    switch(format){
        case 'cpp':{
            language='cpp';
            break;
        }
        case 'py':{
            language='python';
            break;
        }
        case 'java':{
            language='java';
            break;
        }
        default:{
            language='cpp';
        }
    }
    const langFolder=path.join(dirCodes,language);
    const folderPath=path.join(langFolder,jobId);
    let commonName=path.join(folderPath,'CF');
    if(format!=='java'){
        commonName=path.join(folderPath,jobId);
    }
    const codeFilePath=`${commonName}.${format}`;
    const inputFilePath=`${commonName}input.txt`;
    const outputFilePath=`${commonName}output.txt`;
    // this will be needed if the lang is not interpreted i.e. compiled like cpp
    const codeExeFilePath=commonName+'.exe';
    let terminalCommand=`cd "${folderPath}" && g++ "${codeFilePath}" -o "${codeExeFilePath}" && "${codeExeFilePath}" < "${inputFilePath}" > "${outputFilePath}"`;
    switch(format){
        case 'py':{
            terminalCommand=`cd "${folderPath}" && python "${codeFilePath}" < "${inputFilePath}" > "${outputFilePath}"`;
            break;
        }
        case 'java':{
            terminalCommand=`cd "${langFolder}" && javac "${codeFilePath}" && java ${jobId}.CF < "${inputFilePath}" > "${outputFilePath}"`;
            break;
        }
    }
    return new Promise((resolve,reject)=>{
        exec(terminalCommand,(error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve('Code Compiled Successfully!');
        });
    });
}

module.exports={
    executeCode,
};