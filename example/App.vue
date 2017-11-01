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
        let path = 'a/b/' + mainTheme + '.css';
        mainTheme === 'theme-dark' ? this.themeValue = true : this.themeValue = false
        themeLink.setAttribute('href', path);
      })
    },
    methods: {
      setTheme() {
        this.$nextTick(() => {
          let mainTheme = this.themeValue ? 'theme-dark' : 'theme-chalk'
          let themeLink = document.querySelector('link[name="theme"]');
          let path = 'a/b/' + mainTheme + '.css';
          themeLink.setAttribute('href', path);
          localStorage.setItem('theme',mainTheme)
        })
      }
    }
  }
</script>