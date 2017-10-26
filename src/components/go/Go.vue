<template>
  <div class="s-go">
    <div class="s-go-head" :style="{textAlign: align}">{{title}}</div>
    <i v-if="icon" :class="iClass" @click="hanldeClick"></i>
    <s-scrollbar :wrap-class="bodyClass">
      <div class="s-go-item" v-for="item in data">
        <template v-if="prop">{{showText(item)}}</template>
        <template v-else>{{item}}</template>
      </div>
    </s-scrollbar>
  </div>
</template>

<script>
  export default {
    name: 's-go',
    props: {
      title: {
        required: true,
        type: String
      },
      align: {
        default: 'center',
        type: String
      },
      icon: {
        type: String
      },
      bodyClass: {
        default: 's-go-height',
        type: String
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      prop: {
        type: Array
      }
    },
    computed: {
      iClass() {
        return `iconfont icon-${this.icon}`;
      }
    },
    methods: {
      hanldeClick() {
        this.$emit('config');
      },
      showText(item) {
        let str = '';
        for (let i = 0; i < this.prop.length; i++) {
          let _prop = this.prop[i];
          if (!item[_prop]) {
            item[_prop] = '';
          }
          if (i === 0) {
            str += item[_prop];
          } else if (i === 1) {
            if (this.prop.length < 3) {
              str += ('(' + item[_prop] + ')');
            } else {
              str += ('(' + item[_prop]);
            }
          } else {
            str += ':' + item[_prop];
            if (i === this.prop.length - 1) {
              str += ')';
            }
          }
        }
        return str;
      }
    }
  }
</script>

<style>
  .s-go {
    border: 1px solid #0b2647;
    position: relative;
  }
  .s-go-head {
    height: 35px;
    line-height: 35px;
    background: rgba(15, 37, 63, 0.6);
    color: #8a9db3;
    border-bottom: 1px solid #0b2647;
    font-weight: bold;
    font-size: 14px;
    position: relative;
  }
  .s-go .iconfont {
    position: absolute;
    right: 10px;
    top: 10px;
    font-weight: bolder;
    cursor: pointer;
  }
  .s-go-item {
    text-align: center;
    line-height: 25px;
    color: #e5f5fa;
    white-space: nowrap;
  }
  .s-go-height {
    height: 200px;
  }
</style>