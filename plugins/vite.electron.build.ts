// 生产环境的插件electron
import type { Plugin } from 'vite'
import fs from 'node:fs'
import * as electronBuilder from 'electron-builder'
import path from 'path'
// 防止没有执行过npm run dev直接执行npm run build导致没有编译background.ts
const buildBackground = () => {
  require('esbuild').buildSync({
    entryPoints: ['src/background.ts'],
    bundle: true,
    outfile: 'dist/background.js',
    target: 'node18',
    external: ['electron']
  })
}
// 打包 需要先等vite打完包之后就有index.html文件，再执行electron-builder打包
export const ElectronBuildPlugin = (): Plugin => {
  return {
    name: 'electron-build',
    // apply: 'build',
    closeBundle() {
      buildBackground()
      // electron-builder 需要指定package.json
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'background.js'
      fs.writeFileSync('dist/package.json', JSON.stringify(json, null, 4))
      // bug electron-builder 他会给你下载垃圾文件
      fs.mkdirSync('dist/node_modules')

      electronBuilder.build({
        config: {
          directories: {
            output: path.resolve(process.cwd(), 'release'), // 根目录
            app: path.resolve(process.cwd(), 'dist'), // 根目录
          },
          // asar: true, // 打包成一个压缩包
          appId: 'com.example.app',
          productName: 'musicPlayer',
          nsis: { // 安装配置
            oneClick: false, // 取消一键安装
            allowToChangeInstallationDirectory: true, // 允许用户选择安装目录
          }
        }
      })
    },
  }
}
