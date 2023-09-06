const {exec}=require('child_process');
const path=require('path');

const dirCompCodes=path.join(__dirname,'compareCodes');

const finallyCompCodes=async ()=>{
    const filePath=path.join(dirCompCodes,'compCodes.cpp');
    const exeFilePath=path.join(dirCompCodes,'compCodes.exe');
    let terminalCommand=`cd "${dirCompCodes}" && g++ "${filePath}" -o "${exeFilePath}" && "${exeFilePath}"`;
    return new Promise((resolve,reject)=>{
        exec(terminalCommand,(error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve('Code1 and Code2 Comparision Done Successfully!');
        })
    })
}

module.exports={
    finallyCompCodes,
}