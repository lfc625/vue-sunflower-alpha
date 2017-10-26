<template>
  <transition name="s-alert-fade">
    <div class="s-alert" :class="typeClass" v-show="visible">
      <i class="s-alert-icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="s-alert-content">
        <span class="s-alert-title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
        <slot>
          <p class="s-alert-description" v-if="description">{{ description }}</p>
        </slot>
        <i class="s-alert-closebtn iconfont" :class="[{ 'is-customed': closeText !== '', 'icon-error': closeText === '' }]" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script>
  const TYPE_CLASSES_MAP = {
    'success': 's-alert-icon-success',
    'info': 's-alert-icon-info',
    'warning': 's-alert-icon-warning',
    'error': 's-alert-icon-error'
  };
  export default {
    name: 's-alert',

    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `s-alert-${this.type}`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 's-icon-information';
      },

      isBigIcon() {
        return this.description ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description ? 'is-bold' : '';
      }
    }
  };
</script>

<style lang="less">
  @import "../../theme-dark/common/var-dark.less";
  .s-alert {
    border: 1px solid;
    border-radius: 4px;
    text-align: left;
    position: relative;
    & + & {
      margin-top: 10px;
    }
    &-content {
       color: #fff;
       font-size: 14px;
       padding: 10px 35px;
       position: relative;
    }
    &-closebtn {
      position: absolute;
      right: 10px;
      top: 14px;
      cursor: pointer;
    }
    & .is-customed {
      font-style: normal;
      font-size: 12px;
      top: 12px;
    }
    & .is-big {
      font-size: 28px;
      width: 28px;
      height: 28px;
      left: 5px;
      top: 15px;
    }
    & .is-bold {
      font-weight: 700;
    }
    &-icon {
      width: 20px;
      height: 20px;
      left: 8px;
      top: 10px;
      display: block;
      position: absolute;
    }
    &-success {
      border-color: @success-border-color;
      background-color: @success-main-color;
    }
    &-info {
      border-color: @info-border-color;
      background-color: @info-main-color;
    }
    &-warning {
      border-color: @warn-border-color;
      background-color: @warn-main-color;
    }
    &-error {
      border-color: @error-border-color;
      background-color: @error-main-color;
    }
    &-icon-success {
      background: url(./assets/icon-alert-circle-check.svg);
    }
    &-icon-info {
      background: url(./assets/icon-alert-info.svg);
    }
    &-icon-warning {
      background: url(./assets/icon-alert-warning.svg);
    }
    &-icon-error {
      background: url(./assets/icon-alert-circle-cross.svg);
    }
  }
</style>
