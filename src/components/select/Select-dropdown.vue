<template>
    <div
      class="s-select-dropdown"
      :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
      :style="{ minWidth: minWidth }">
        <slot></slot>
    </div>
</template>

<script>
  import Popper from '../extra/utils/vue-popper';
  export default {
    name: 's-select-dropdown',
    componentName: 'SSelectDropdown',
    mixins: [Popper],
    props: {
      placement: {
        default: 'bottom-start'
      },
      boundariesPadding: {
        default: 0
      },
      popperOptions: {
        default() {
          return {
            forceAbsolute: true,
            gpuAcceleration: false
          };
        }
      }
    },
    data() {
      return {
        minWidth: ''
      };
    },
    computed: {
      popperClass() {
        return this.$parent.popperClass;
      }
    },
    watch: {
      '$parent.inputWidth'() {
        this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
      }
    },
    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', this.updatePopper);
      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>

<style>
    .s-select-dropdown{
        position: absolute;
        z-index: 1001;
        border: 1px solid #344458;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        box-sizing: border-box;
        margin: 5px 0;
    }
    .s-select-dropdown {
        padding: 0;
    }
    .s-select-dropdown__item.selected {
        background-image: -moz-linear-gradient( 90deg, rgb(22,117,203) 0%, rgb(19,129,228) 100%);
        background-image: -webkit-linear-gradient( 90deg, rgb(22,117,203) 0%, rgb(19,129,228) 100%);
        background-image: -ms-linear-gradient( 90deg, rgb(22,117,203) 0%, rgb(19,129,228) 100%);
        color:#e5f5fa;
        border:1px solid #206daa;
    }
    .s-select-dropdown.is-multiple .s-select-dropdown__item.selected::after{
        position: absolute;
        right: 10px;
        font-family: 'element-icons';
        content: "\E608";
        font-size: 11px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .s-select-dropdown__empty{
        padding: 10px 0;
        margin: 0;
        text-align: center;
        color: #999;
        font-size: 14px;
        background:#000009;
    }
    .s-select-dropdown__wrap{
        max-height: 274px;
    }
    .s-select-dropdown__list{
        list-style: none;
        padding: 6px 0;
        margin: 0;
        box-sizing: border-box;
    }

    .s-select-dropdown__item {
        font-size: 14px;
        padding: 8px 10px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgb(72, 87, 106);
        height: 36px;
        line-height: 1.5;
        box-sizing: border-box;
        cursor: pointer;
    }
    .s-select-dropdown__item {
        font-size: 14px;
        padding: 8px 10px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #b7c4ca;
        height: 36px;
        line-height: 1.5;
        box-sizing: border-box;
        cursor: pointer;
    }

</style>

