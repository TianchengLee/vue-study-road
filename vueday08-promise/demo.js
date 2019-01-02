// 创建对象会立即执行构造函数中传入的回调函数
// let p = new Promise(() => {
//   // 做一些异步操作
//   console.log('promise执行了')
// })

// 如果想让promise对象的回调函数按需执行
// 可以将创建对象这个步骤放到一个function中, 需要时调用即可

// function doSomething() {
//   let p = new Promise(() => {
//     // 做一些异步操作
//     console.log('promise执行了')
//   })
// }

// this.$http.get('url').then()

// const fs = require('fs')

// function getFileByPath(fpath) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(fpath, 'utf-8', (err, dataStr) => {

//       if (err) return reject(err)
//       resolve(dataStr)

//     })
//   })
// }

// let p = getFileByPath('./file/1.txt')
// p.then(function(data) { // 成功的回调

// }, function(err) { // 失败的回调

// })

// this.$http.get().then()

// getFileByPath('./files/1.txt').then((data) => {
//   console.log(data)
// }, (err) => {
//   console.log(err.message)
// })

// setTimeout(function () {  
//   console.log(1)
// }, 0)

// console.log(2)
// function getFileByPath(fpath) {
//   return new Promise(function (resolve, reject) {
//     // 同步执行
//     console.log('这是promise构造函数的回调函数')
//     // 异步读取文件
//     fs.readFile(fpath, 'utf-8', (err, dataStr) => { // 异步执行
//       console.log('这是读取文件的异步操作')
//       if (err) return reject(err)
//       resolve(dataStr)

//     })
//   })
// }

// getFileByPath('./files/1.txt')
//   .then(data => {
//     console.log(data)
//     // 在.then的回调函数中, 如果继续返回一个promise对象
//     // 则可以继续在当前promise对象后继续.then来处理 第二次返回的promise对象的结果
//     return getFileByPath('./files/2.txt') // 返回值就是一个promise对象
//   })
//   .then(data => {
//     console.log(data)
//     return getFileByPath('./files/3.txt')
//   })
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//      // 自己处理异常
// 
//    })

// console.log('这是最后面的代码主线程')

// vue-resource已经是基于promise封装的ajax请求框架

// this.$http.get('lunbotu')
//   .then(data => {
//     this.banners = data.body
//     return this.$http.get('jiugongge')
//   })
//   .then(data => {
//     this.jiugongge = data.body
//   })

// 不是所有的回调函数一定是异步操作!!!
// function Student(callback) {
//   callback() // 同步执行
// }

// new Student(function() {
//   console.log('这是Student构造函数的回调函数')
// })

// 常见的异步操作有: IO, 定时器, 事件
// Input / Output 输入输出
// 网络IO(Ajax)  文件IO(读写文件)
// async 异步  sync 同步
// synchronized 同步

// SSH/SSM
// Spring Stucts Hibernate
//               MyBatis