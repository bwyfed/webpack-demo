import css from './css/index.css'
import less from './css/black.less'
import sass from './css/bb.scss'
import jspang from './jspang.js'
// import('./jspang.js') // dynamic import
{
  let jspangString = 'Hello JSPang!'
  document.getElementById("title").innerHTML=jspangString
}
$('#title').html('Hello ChunGold')
var app = new Vue()
app.$destroy()
jspang()

var json = require('../config.json')
document.getElementById("json").innerHTML = json.name + ",website:" + json.website