
// import figlet from "figlet"

// figlet("Hello World!!", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

function sayHi(name){
    return `Hi, ${name}`
}

function add(a,b){
    return a+b
}

function sub(a,b){
    return a-b
}

function mul(a,b){
    return a*b
}

function div(a,b){
    return a/b
}
// named export
// export {sayHi,add,sub,mul,div}

// default export
export default {sayHi,add, sub, mul,div}