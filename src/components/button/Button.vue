<template>
  <button class="s-button" type="button"
          :title="title"
          :disabled="disabled"
          :class="[
              type ? 's-button-' + type : '',
              size ? 's-button-' + size : '',
              {
                'is-disabled': disabled,
                'is-loading': loading,
                's-button-icon': icon && $slots.default,
                's-button-icon-only': !$slots.default
              }
          ]"
          @click="handleClick"
  >
    <i :class="'iconfont icon-' + icon" v-if="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
  // 添加type类型，transparent(无边框，无背景)
  export default {
    name: "s-button",

    props: {
      type: {
        type: String,
        default: "default"
      },
      title: [String, Number],
      icon: {
        type: String,
        default: ""
      },
      disabled: Boolean,
      loading: Boolean,
      size: String
    },

    methods: {
      handleClick(event) {
        this.$emit("click", event);
      }
    }
  }
</script>

<style>
  .s-button {
    display: inline-block;
    line-height: 1;
    white-space: normal;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    padding: 8px 18px;
    margin: 0;
    font-size: 12px;
    border-radius: 2px;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
  }
  .s-button.is-disabled, .s-button.is-disabled:hover, .s-button.is-disabled:active {
    color: #677383;
    border: 1px solid #344458;
    background: rgba(33, 44, 61, 0.6);
    cursor: not-allowed;
    opacity: 1;
  }
  .s-button-default {
    color: #dee9f3;
    background: #053b66;
    border: 1px solid #125f9f;
  }
  .s-button-default:hover {
    border: 1px solid #04a1e9;
    background: #0070b2;
  }
  .s-button-default:active {
    opacity: 0.8;
  }
  .s-button-cancel {
    color: #8997a3;
    border: 1px solid #125f9f;
    background: rgba(5, 59, 102, 0.49);
  }
  .s-button-cancel:hover {
    background: #002847;
  }
  .s-button-cancel:active {
    background: #011f37;
  }
  .s-button-icon-only {
    padding: 5px 10px;
  }
  .s-button-icon-only .iconfont {
    font-size: 18px;
  }
  .s-button-icon {
    padding: 7px 14px;
  }
  .s-button-icon .iconfont {
    font-size: 14px;
  }
  .s-button-icon span {
    padding-left: 4px;
  }
  .s-button-transparent {
    background-color: transparent;
    border-color: transparent;
    padding: 0;
    color: rgba(49, 170, 255, 0.6);
    line-height: 16px;
  }
  .s-button-transparent > i, .s-button-transparent > span {
    color: rgba(49, 170, 255, 0.6);
  }
  .s-button-transparent:focus > i, .s-button-transparent:focus > span, .s-button-transparent:hover > i, .s-button-transparent:hover > span {
    background-color: transparent;
    border-color: transparent;
    color: #31aaff;
  }
  .s-button-transparent:active {
    outline: none;
  }
  .s-button-transparent.is-active, .s-button-transparent:active {
    color: #1d96eb;
  }
  .s-button-large {
    padding: 11px 19px;
    font-size: 16px;
    border-radius: 4px;
  }
  .s-button-large.s-button-icon .iconfont {
    font-size: 16px;
    vertical-align: center;
  }
  .s-button-large.s-button-icon-only {
    padding-top: 9px;
    padding-bottom: 9px;
  }
  .s-button-large.s-button-icon-only .iconfont {
    font-size: 20px;
  }
  .s-button-mini {
    padding: 4px;
  }
  .s-button-mini.s-button-icon-only .iconfont {
    font-size: 12px;
  }
  .s-button-mini.s-button-icon .iconfont {
    font-size: 12px;
  }
  .s-button-mini.s-button-icon span {
    padding: 0;
  }
  .s-button-normal {
    font-size: 14px;
    padding: 10px 15px;
  }
  .s-button-normal.s-button-icon {
    padding-bottom: 8px;
  }
  .s-button-normal.s-button-icon .iconfont {
    font-size: 16px;
    vertical-align: middle;
  }
  .s-button-normal.s-button-icon-only {
    padding-top: 9px;
    padding-bottom: 7px;
  }
  .s-button-normal.s-button-icon-only .iconfont {
    font-size: 18px;
    vertical-align: middle;
  }
</style>