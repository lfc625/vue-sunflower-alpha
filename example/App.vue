<template>
  <div class="demo">
    <header>
      <div class="header">
        <div class="menu">
          <router-link to="/components" tag="li">组件</router-link>
          <router-link to="/echarts" tag="li">Echarts</router-link>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>
<style>
  @import "./demo.css";
  @import "docs.css";
</style>