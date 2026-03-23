// import module
import fs from "fs";

//  write file operation
// fs.writeFileSync("sandeep.txt","Hi, I am sandeep")

//  append file operation
// fs.appendFileSync("sandeep.txt"," \nI'm learning Nodejs")

//  read file opeartion

// const data = fs.readFileSync("sandeep.txt","utf-8")
// console.log(data)

// unlink File Operation
// fs.unlinkSync("sandeep.txt")

// async operation

// fs.writeFile("sandeep.txt","Today is Thrusday",(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("file create susscefully")
//     }
// })

// fs.readFile("sandeep.txt", "utf-8", (err, data) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("reading done")
//         console.log(data)
//     }
// })

// fs.appendFile("sandeep.txt","\nToday is Fisrt day of navratri",(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("writting is done")
//     }
// })

fs.unlink("sandeep.txt",(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("file is unlinked")
    }
})