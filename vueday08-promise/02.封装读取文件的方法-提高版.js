// 需求：你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读取文件，并把内容返回给我

const fs = require('fs')
const path = require('path')


function getFileByPath(fpath, succCb, errCb) {
  fs.readFile(fpath, 'utf-8', (err, dataStr) => {
    if (err) return errCb(err)
    succCb(dataStr)
  })
}

// getFileByPath(path.join(__dirname, './files/11.txt'), function (data) {
//   console.log(data + '娃哈哈，成功了！！！')
// }, function (err) {
//   console.log('失败的结果，我们使用失败的回调处理了一下：' + err.message)
// })

// 需求： 先读取文件1，再读取文件2，最后再读取文件3
// 回调地狱
// 使用 ES6 中的 Promise，来解决 回调地狱的问题；
// 问： Promise 的本质是要干什么的：就是单纯的为了解决回调地狱问题；并不能帮我们减少代码量；
getFileByPath(path.join(__dirname, './files/1.txt'), function (data) {
  console.log(data)

  getFileByPath(path.join(__dirname, './files/2.txt'), function (data) {
    console.log(data)

    getFileByPath(path.join(__dirname, './files/3.txt'), function (data) {
      console.log(data)
    })
  })
})

// getFileByPath(path.join(__dirname, './files/1.txt'), function (data) {  
//   console.log(data)
// })

// getFileByPath(path.join(__dirname, './files/2.txt'), function (data) {  
//   console.log(data)
// })

// getFileByPath(path.join(__dirname, './files/3.txt'), function (data) {  
//   console.log(data)
// })