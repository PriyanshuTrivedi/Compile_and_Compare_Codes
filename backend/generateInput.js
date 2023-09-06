const path=require('path');
const fs=require('fs');
const {exec}=require('child_process');
const { error } = require('console');

const dirCompCodes=path.join(__dirname,'compareCodes');
if(!fs.existsSync(dirCompCodes)){
    fs.mkdirSync(dirCompCodes,{recursive:true});
}

const generateInput= async(fileThatGeneratesInput)=>{
    const terminalCommand=`cd "${dirCompCodes}" && g++ ${fileThatGeneratesInput}.cpp -o gen.exe && gen.exe`;
    return new Promise((resolve,reject)=>{
        exec(terminalCommand,(error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve('Test Case Generated Successfully!');
        })
    });
}

module.exports={
    generateInput,
}