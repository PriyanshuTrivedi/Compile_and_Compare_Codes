const path=require('path');
const fs=require('fs');

const dirCompCodes=path.join(__dirname,'compareCodes');
if(!fs.existsSync(dirCompCodes)){
    fs.mkdirSync(dirCompCodes,{recursive:true});
}

const setInputForGeneratingInputandCodes= async(myParams,code1,code2,lang)=>{
    let language=lang;
    if(lang==='py'){
        language='python';
    }
    if(lang==='java'){
        language='javaFolder';
    }
    const folderPath=path.join(dirCompCodes,language);
    const filePath1=path.join(folderPath,`code1.${lang}`);
    const filePath2=path.join(folderPath,`code2.${lang}`);
    const inputFilePath=path.join(dirCompCodes,'input.txt');
    if(lang==='java'){
        code1='package javaFolder; '+code1;
        code2='package javaFolder; '+code2;
    }
    fs.writeFileSync(filePath1,code1);
    fs.writeFileSync(filePath2,code2);
    let inputFileContent=''+myParams.testcases+' ';
    inputFileContent=inputFileContent+myParams.data.n_lowerLimit+' ';
    inputFileContent=inputFileContent+myParams.data.n_upperLimit+' ';
    if(myParams.generate==='array'){
        inputFileContent=inputFileContent+myParams.data.arri_lowerLimit+' ';
        inputFileContent=inputFileContent+myParams.data.arri_upperLimit+' ';
    }
    fs.writeFileSync(inputFilePath,inputFileContent);
    return 'Set input for generating an input and also synchronously wrote the code';
}

module.exports={
    setInputForGeneratingInputandCodes,
}