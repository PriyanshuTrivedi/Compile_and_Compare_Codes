const path=require('path');
const fs=require('fs');
// v4 is renamed as uuid(unique uid) 
const {v4:uuid}=require('uuid')

const dirCodes=path.join(__dirname,'codes');
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}

function uuidToVariable(uuid) {
    // Remove hyphens and replace with underscores
    const cleanUuid = uuid.replace(/-/g, '_');
    // Ensure the variable name starts with a letter or underscore
    if (/^\d/.test(cleanUuid)) {
      return 'uuid_' + cleanUuid;
    }
    // Ensure the variable name is valid and not a reserved keyword
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(cleanUuid)) {
      return 'uuid_' + cleanUuid;
    }
    return cleanUuid;
}

const generateFile= async(format,code,input)=>{
    // making a folder within dirCodes for each language 
    const jobId=uuidToVariable(uuid());
    let language='cpp';
    switch(format){
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
    if(!fs.existsSync(langFolder)){
        fs.mkdirSync(langFolder,{recursive:true});
    }
    // making a folder within langFolder for each compilation that will contain code input and output
    
    const folderName=path.join(langFolder,jobId);
    fs.mkdirSync(folderName,{recursive:true});
    let fileName='CF.java';
    if(format!=='java'){
        fileName=`${jobId}.${format}`;
    }
    let inputFile=`CFinput.txt`;
    if(format!=='java'){
        inputFile=`${jobId}input.txt`;
    }
    const filePath=path.join(folderName,fileName);
    const inputFilePath=path.join(folderName,inputFile);
    // synchronously writing to specified 
    if(format==='java'){
        fs.writeFileSync(filePath,`package ${jobId}; `);
    }
    await fs.writeFileSync(filePath,code,{flag:'a'});
    await fs.writeFileSync(inputFilePath,input);
    return jobId;
};

module.exports={
    generateFile
};