// 开发环境的插件electron
import type { Plugin } from 'vite'
import type { AddressInfo } from 'net'
import { spawn } from 'child_process'
import fs from 'node:fs'

// vite 插件要求必须导出一个对象，对象必须有name属性
const buildBackground = () => {
  require('esbuild').buildSync({
    entryPoints: ['src/background.ts'],
    bundle: true,
    outfile: 'dist/background.js',
    target: 'node18',
    external: ['electron']
  })
}
export const ElectronDevPlugin = (): Plugin => {
  return {
    name: 'electron-dev',
    configureServer(server) {
      buildBackground()
      server.httpServer?.once('listening', () => {
        // 读取vite服务的信息
        const addressInfo = server.httpServer?.address() as AddressInfo
        // 拼接id地址 给electron 启动服务的时候用的
        const IP = `http://localhost:${addressInfo.port}`
        // 第一个参数是electron的入口文件
        // require 返回的是一个路径
        // electron 不认识ts文件 需要编译成js文件
        // 进程传参发送给electron IP地址
        let ElectronProcess = spawn(require('electron'), ['dist/background.js', IP])
        fs.watchFile('src/background.ts', () => {
          ElectronProcess.kill()
          buildBackground()
          ElectronProcess = spawn(require('electron'), ['dist/background.js', IP])
        })
        ElectronProcess.stderr.on('data', (data) => {
          console.log('日志', data.toString())
        })
      })
    },
  }
}