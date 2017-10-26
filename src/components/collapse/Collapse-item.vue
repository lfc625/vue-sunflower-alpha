<template>
  <div class="s-collapse-item" :class="{'is-active': isActive}">
    <div class="s-collapse-item-header" @click="handleHeaderClick">
      <i class="iconfont icon-right"></i>
      <slot name="title">{{title}}</slot>
    </div>
    <collapse-transition>
      <div class="s-collapse-item-wrap" v-show="isActive">
        <div class="s-collapse-item-content">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
  import Emitter from '../extra/mixins/emitter';
  import CollapseTransition from '../extra/transitions/collapse-transition';
  export default {
    name: 's-collapse-item',
    componentName: 'SCollapseItem',
    mixins: [Emitter],
    components: {
      'collapse-transition': CollapseTransition
    },
    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0
      };
    },
    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      }
    },
    computed: {
      isActive() {
        return this.$parent.activeNames.indexOf(this.name) > -1;
      }
    },
    watch: {
      'isActive'(value) {
      }
    },
    methods: {
      handleHeaderClick() {
        this.dispatch('SCollapse', 'item-click', this);
      }
    },
    mounted() {
    }
  };
</script>
<style>
  .s-collapse-item.is-active > .s-collapse-item-header .iconfont.icon-right {
    transform: rotate(90deg);
  }

  .s-collapse-item-header {
    height: 43px;
    line-height: 43px;
    padding-left: 15px;
    background-color: rgb(9, 22, 41);
    color: rgb(222, 233, 243);
    cursor: pointer;
    border-bottom: 1px solid rgb(16, 41, 76);
    font-size: 13px
  }

  .s-collapse-item-header .iconfont.icon-right {
    display: inline-block;
    margin-right: 8px;
    color: rgb(29, 80, 132);
    transition: transform .3s
  }

  .s-collapse-item-wrap {
    will-change: height;
    background-color: transparent;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(16, 41, 76);
  }

  .s-collapse-item-content {
    padding: 10px 15px;
    font-size: 13px;
    color: rgb(98, 105, 115);
    line-height: 1.769230769230769
  }
</style>