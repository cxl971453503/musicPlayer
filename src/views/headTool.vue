<template>
  <div class="header">
    <!-- 左侧工具栏 -->
    <div class="header-tool-box">
      <button class="header-tool">文件</button>
    </div>
    <!-- 右侧按钮：最小化，最大化，关闭 -->
    <div>
      <button class="header-operate" @click="minimizeWindow">最小</button>
      <button class="header-operate" @click="maximizeWindow">最大</button>
      <button class="header-operate operate-close" @click="closeWindow">关闭</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { ipcRenderer, dialog } = require('electron')
const electron = require('electron')
function maximizeWindow() {
  console.log(ipcRenderer)
  console.log(dialog)
  console.log(electron)
  // ipcRenderer.send('maximizeWindow')
}
function minimizeWindow() {
  ipcRenderer.send('minimizeWindow')
}
function closeWindow() {
  ipcRenderer.send('closeWindow')
}
</script>

<style lang="scss" scoped>
.header {
  // 禁止选中文字
  user-select: none;
  -webkit-user-select: none;
  // 允许拖拽窗口
  -webkit-app-region: drag;
  height: 44px;
  background-color: var(--vt-c-black-mute);
  display: flex;
  justify-content: space-between;
  button {
    // 按钮区域禁止拖拽
    -webkit-app-region: no-drag;
  }
  .header-tool-box {
    display: flex;
    align-items: center;
    .header-tool {
      width: 50px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 4px;
      border-width: 0px;
      background-color: transparent;
      color: #bfbfbf;
      &:hover {
        background-color: var(--vt-c-black-light);
      }
    }
  }
  .header-operate {
    border-width: 0;
    background-color: transparent;
    color: #bfbfbf;
    width: 50px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    &:hover {
      background-color: #565656;
    }
  }
  .header-operate.operate-close:hover {
    background-color: var(--color-dangrous);
  }
}
</style>
