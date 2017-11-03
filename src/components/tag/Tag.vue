<template>
  <transition :name="disableTransitions ? '' : 's-zoom-in-center'">
    <span
      class="s-tag"
      :class="[
        type ? 's-tag-' + type : '',
        tagSize && `s-tag-${tagSize}`,
        {'is-hit': hit}
      ]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="iconfont icon-error-bold s-tag-close s-icon-close"
         v-if="closable"
         @click="handleClose">
      </i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 's-tag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    }
  };

</script>

<style>
  .s-tag {
    background-color: rgb(5, 59, 105);
    display: inline-block;
    padding: 0 5px;
    margin: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgb(18, 93, 157);
    white-space: nowrap
  }

  .s-tag .s-icon-close {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    -ms-transform: scale(.75, .75);
    transform: scale(.75, .75);
    height: 18px;
    width: 18px;
    line-height: 18px;
    vertical-align: middle;
    top: -1px;
    right: -2px
  }

  .s-tag .s-icon-close:hover {
    background-color: #fff;
    color: rgb(5, 59, 105);
  }

  .s-tag-gray {
    background-color: rgb(31, 41, 56);
    border-color: rgb(52, 68, 88);
    color: rgb(72, 87, 105)
  }

  .s-tag-gray .s-tag-close:hover {
    background-color: #fff;
    color: rgb(31, 41, 56);
  }

  .s-tag-gray.is-hit {
    border-color: rgb(31, 41, 56)
  }

  .s-tag-primary {
    background-color: rgb(0, 112, 178);
    border-color: rgb(48, 163, 250);
    color: #ffffff;
  }

  .s-tag-primary .s-tag-close:hover {
    background-color: #fff;
    color: rgb(0, 112, 178);
  }

  .s-tag-primary.is-hit {
    border-color: #20a0ff
  }

  .s-tag-success {
    background-color: rgb(32, 162, 101);
    border-color: rgb(18, 94, 75);
    color: #ffffff;
  }

  .s-tag-success .s-tag-close:hover {
    background-color: #ffffff;
    color: rgb(32, 162, 101)
  }

  .s-tag-success.is-hit {
    border-color: rgb(32, 162, 101)
  }

  .s-tag-warning {
    background-color: rgb(255, 144, 45);
    border-color: rgb(98, 11, 20);
    color: #ffffff;
  }

  .s-tag-warning .s-tag-close:hover {
    background-color: #ffffff;
    color: rgb(255, 144, 45);
  }

  .s-tag-warning.is-hit {
    border-color: rgb(255, 144, 45);
  }

  .s-tag-danger {
    background-color: rgb(223, 67, 54);
    border-color: rgb(98, 11, 20);
    color: #ffffff;
  }

  .s-tag-danger .s-tag-close:hover {
    background-color: #ffffff;
    color: rgb(223, 67, 54);
  }

  .s-tag-danger.is-hit {
    border-color: rgb(223, 67, 54);
  }

  .input-new-tag {
      margin-left: 10px;
      height: 24px;
      line-height: 22px;
      padding-top: 0;
      padding-bottom: 0;
      display: inline-block;
      width: 80px;
  }

  .button-new-tag {
      margin-left: 10px;
      height: 24px;
      line-height: 22px;
      padding-top: 0;
      padding-bottom: 0;
      display: inline-block;
  }

  .s-tag-medium {
    height:28px;
    line-height:26px
  }

  .s-tag-medium .s-icon-close {
    -webkit-transform:scale(.8);
    transform:scale(.8)
  }

  .s-tag-small {
    height:24px;
    padding:0 8px;
    line-height:22px
  }

  .s-tag-small .s-icon-close {
    -webkit-transform:scale(.8);
    transform:scale(.8)
  }

  .s-tag-mini {
    height:20px;
    padding:0 5px;
    line-height:19px
  }
  .s-tag-mini .s-icon-close {
    margin-left:-3px;
    -webkit-transform:scale(.7);
    transform:scale(.7)
  }
</style>

