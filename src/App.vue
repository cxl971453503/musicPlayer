<script setup lang="ts">
import headTool from './views/headTool.vue'
import musicMenu from './views/musicMenu.vue'
import operateArea from './views/operateArea.vue'
</script>

<template>
  <headTool />
  <div class="container">
    <musicMenu />
    <operateArea />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  .musicMenu {
    flex-grow: 0;
  }
}
</style>
