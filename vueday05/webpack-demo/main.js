// ES6的模块化语法  import $ from 'jquery'
import $ from 'jquery'
// CommonJS规范在node中使用
// const $ = require('jquery')

$(function () {
  $('li:odd').css('backgroundColor', 'pink')
  $('li:even').css('backgroundColor', 'skyblue')
})