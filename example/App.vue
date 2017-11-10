<template>
  <div class="demo">
    <header>
      <div class="header">
        <div class="logo">
          <img src="../sunflower.png" alt="sunflower"/>
          Sunflower —— 基于Vue的组件库
        </div>
        <div class="menu">
          <router-link to="/components" tag="li">组件</router-link>
          <router-link to="/echarts" tag="li">Echarts</router-link>
          <s-switch v-model="themeValue" @change="setTheme" on-color="#000009" off-color="#1674CB" ball-color="#fff"></s-switch>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        themeValue: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        let mainTheme = localStorage.getItem('theme') || 'theme-dark'
        let themeLink = document.querySelector('link[name="theme"]');
        let path = themeLink.getAttribute('href');
        let idx = path.lastIndexOf('\/');
        let targetStr = path.substring(idx + 1, path.length - 4);
        let newStr = path.replace(targetStr, mainTheme)
        themeLink.setAttribute('href', newStr);
        mainTheme === 'theme-dark' ? this.themeValue = true : this.themeValue = false
      })
    },
    methods: {
      setTheme() {
        this.$nextTick(() => {
          let mainTheme = this.themeValue ? 'theme-dark' : 'theme-chalk'
          this.changePath(mainTheme)
          localStorage.setItem('theme',mainTheme)
        })
      },
      changePath(str) {
        let themeLink = document.querySelector('link[name="theme"]');
        let path = themeLink.getAttribute('href');
        let idx = path.lastIndexOf('\/');
        let targetStr = path.substring(idx + 1, path.length - 4);
        let newStr = path.replace(targetStr, str)
        themeLink.setAttribute('href', newStr);
      }
    }
  }
</script>