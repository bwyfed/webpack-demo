import css from './css/index.css'
import less from './css/black.less'
import sass from './css/bb.scss'
import jspang from './jspang.js'
{
  let jspangString = 'Hello JSPang!'
  document.getElementById("title").innerHTML=jspangString
}
$('#title').html('Hello ChunGold')
jspang()

var json = require('../config.json')
document.getElementById("json").innerHTML = json.name + ",website:" + json.website