const {exec}=require('child_process');
const path=require('path');

const dirCompCodes=path.join(__dirname,'compareCodes');

const comparingCodes=async (lang)=>{
    let language=lang;
    if(lang==='py'){
        language='python';
    }
    if(lang==='java'){
        language='javaFolder';
    }
    const folderName=path.join(dirCompCodes,language);
    let inpName='testcases.txt';
    const inputPath=path.join(dirCompCodes,inpName);
    const outputCode1Path=path.join(dirCompCodes,'outputCode1.txt');
    const outputCode2Path=path.join(dirCompCodes,'outputCode2.txt');
    const fileCode1Path=path.join(folderName,`code1.${lang}`);
    const fileCode2Path=path.join(folderName,`code2.${lang}`);
    const exeFileCode1Path=path.join(folderName,'code1.exe');
    const exeFileCode2Path=path.join(folderName,'code2.exe');
    let terminalCommand=`cd "${folderName}" && g++ "${fileCode1Path}" -o "${exeFileCode1Path}" && "${exeFileCode1Path}" < "${inputPath}" > "${outputCode1Path}" && cd "${folderName}" && g++ "${fileCode2Path}" -o "${exeFileCode2Path}" && "${exeFileCode2Path}" < "${inputPath}" > "${outputCode2Path}"`;
    switch(lang){
        case 'py':{
            terminalCommand=`cd "${folderName}" && python "${fileCode1Path}" < "${inputPath}" > "${outputCode1Path}" && cd "${folderName}" && python "${fileCode2Path}" < "${inputPath}" > "${outputCode2Path}"`;
            break;
        }
        case 'java':{
            terminalCommand=`cd "${dirCompCodes}" && javac "${fileCode1Path}" && java javaFolder.code1 < "${inputPath}" > "${outputCode1Path}" && cd "${dirCompCodes}" && javac "${fileCode2Path}" && java javaFolder.code2 < "${inputPath}" > "${outputCode2Path}"`;
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
            resolve('Code1 and Code2 Compiled Successfully! Their output files are generated and are ready to be compared!');
        })
    })
}

module.exports={
    comparingCodes,
}