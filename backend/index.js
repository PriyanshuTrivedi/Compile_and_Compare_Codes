const fs=require('fs');
const path=require('path');
const express=require('express');
const {generateFile}=require('./generateFile');
const {generateInput}=require('./generateInput');
const {comparingCodes}=require('./comparingCodes');
const {executeCode}=require('./executeCode');
const {finallyCompCodes}=require('./finallyCompCodes');
const cors=require('cors');
const { setInputForGeneratingInputandCodes } = require('./setInputForGeneratingInputandCodes');
const multer=require('multer');
const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/',(req,res)=>{
    return res.json({message:'Hello World!'});
});

app.post('/run',async(req,res)=>{
    const {lang="cpp",code,input}=req.body;
    

    // console.log(code,lang,input);

    if(code===undefined){
        return res.status(400).json({success:false,error:'Empty code!'})
    }

    try{
        // generate a file with code from req 
        const jobId=await generateFile(lang,code,input);
        console.log(jobId);
        // run the file and send response 
        const msg=await executeCode(jobId,lang);
        console.log(msg);

        const dirCodes=path.join(__dirname,'codes');
        let language='cpp';
        switch(lang){
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
        let outputPath=path.join(folderPath,'CF')+'output.txt';
        if(lang!=='java'){
            outputPath=path.join(folderPath,jobId)+'output.txt';
        }

        console.log('The path of the output file is-> ',outputPath);

        const content=fs.readFileSync(outputPath,'utf8');
        const output=JSON.stringify(content);
        console.log(output);
        return res.json({success:true,result:output,jobId:jobId});
    }
    catch(err){
        console.log(err.stderr);
        return res.status(500).json({success:false,error:err.stderr});
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const inpPath=path.join(__dirname,'compareCodes')
        cb(null, inpPath)
    },
    filename: function (req, file, cb) {
        cb(null, 'testcases.txt')
    }
});
  
const upload = multer({ storage: storage })

app.post('/upload',upload.single('fileInput'),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.json({ message: 'File uploaded successfully' });
})

app.post('/compare', async(req,res)=>{
    const {lang="cpp",code1,code2,genInp,input}=req.body;
    
    if(code1===undefined){
        return res.status(400).json({success:false,error:'Empty code1!'});
    }
    if(code2===undefined){
        return res.status(400).json({success:false,error:'Empty code2!'});
    }



    if(genInp.inpType!=="custom"){
        let myParam={
            data:genInp.inpData
        };
        let fileThatGeneratesInput;
        switch(genInp.inpType){
            case 'number':{
                fileThatGeneratesInput='randomNoGen';
                myParam.generate='number';
                break;
            }
            case 'array':{
                fileThatGeneratesInput='randomArray'
                myParam.generate='array';
                break;
            }
            case 'permutation':{
                fileThatGeneratesInput='randomPerm'
                myParam.generate='permutation';
                break;
            }
            case 'string':{
                fileThatGeneratesInput='randomString'
                myParam.generate='string';
                break;
            }
        }
        console.log('We are generating ',fileThatGeneratesInput);
        myParam.testcases=genInp.tcases;
        // generating testcases times new input and comparing the outputs of the codes
        try{
            let msg= await setInputForGeneratingInputandCodes(myParam,code1,code2,lang);
            console.log(msg);
            msg= await generateInput(fileThatGeneratesInput);
            console.log(msg);
            msg= await comparingCodes(lang);
            console.log(msg);
            // comparing files 
            msg= await finallyCompCodes();
            console.log(msg);
            const finalResPath=path.join(path.join(__dirname,'compareCodes'),'finalRes.txt');
            const finalResult=fs.readFileSync(finalResPath,'utf8');
            return res.json({msg:finalResult});
        }
        catch(e){
            return res.json({msg:e.stderr});
        }
    }
    else{
        try{
            const dirCompCodes=path.join(__dirname,'compareCodes');
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
            if(lang==='java'){
                code1='package javaFolder; '+code1;
                code2='package javaFolder; '+code2;
            }
            fs.writeFileSync(filePath1,code1);
            fs.writeFileSync(filePath2,code2);
            msg= await comparingCodes(lang);
            console.log(msg);
            // comparing files 
            msg= await finallyCompCodes();
            console.log(msg);
            const finalResPath=path.join(path.join(__dirname,'compareCodes'),'finalRes.txt');
            const finalResult=fs.readFileSync(finalResPath,'utf8');
            return res.json({msg:finalResult});
        }
        catch(err){
            res.json({error:err});
        }
    }
});

app.get('/downloadTestcase', (req, res) => {
    const filePath = path.join(path.join(__dirname,'compareCodes'),'testcases.txt');
    res.download(filePath,"downloaded-testcase.txt",
    (err)=>{
        if (err) {
            res.send({
                error : err,
                msg   : "Problem downloading the file"
            })
        }
    });
});

app.listen(5000,()=>{
    console.log('Listening on port 5000!');
});