// import lodash from "lodash-es";
import {isArray} from "lodash-es";
import item from "./sync.css";
const sync = function(){
    console.log("sync");
    fetch("/api/test")
    .then(response=>response.json())
    .then(data=>{
        console.log("收到的信息:", data.message)
    })
    //document.getElementById("app").innerHTML = `<h1 class="${item.test}">Hello Yideng Webpack</h1></h1>`;
}
const isArrayFun = function(args){
    // console.log(lodash.isArray(args));
    console.log(isArray(args));
}
export {
    sync,
    isArrayFun
}