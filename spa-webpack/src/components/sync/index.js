// import lodash from "lodash-es";
import {isArray} from "lodash-es";
import item from "./sync.css";
const sync = function(){
    console.log("sync");
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