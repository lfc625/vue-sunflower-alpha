<template>
  <transition name="dialog-fade">
    <div class="s-dialog-wrapper" v-show="visible">
      <div
              class="s-dialog"
              :class="[sizeClass, customClass]"
              ref="dialog"
              :style="style">
        <div class="s-dialog-header">
          <slot name="title">
            <span class="s-dialog-title">{{title}}</span>
          </slot>
          <div class="s-dialog-headerbtn">
            <i v-if="showClose" class="s-dialog-close iconfont icon-error" @click.self="handleClose"></i>
          </div>
        </div>
        <div class="s-dialog-body" v-if="rendered"><slot></slot></div>
        <div class="s-dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from '../extra/utils/popup';
  import emitter from '../extra/mixins/emitter';
  export default {
    name: 's-dialog',
    mixins: [Popup, emitter],
    props: {
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '600px'
      },
      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'small'
      },
      customClass: {
        type: String,
        default: ''
      },
      top: {
        type: String,
        default: '15%'
      },
      beforeClose: Function
    },
    data() {
      return {
        visible: false
      };
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val);
        if (val) {
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          this.$emit('close');
        }
      }
    },
    computed: {
      sizeClass() {
        return `s-dialog-${ this.size }`;
      },
      style() {
        return {
          'width': this.width,
          'top': this.top
        };
      }
    },
    methods: {
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.close);
        } else {
          this.close();
        }
      },
      updatePopper() {
        this.broadcast('SSelectDropdown', 'updatePopper');
        this.broadcast('SDropdownMenu', 'updatePopper');
      }
    },
    mounted() {
      if (this.value) {
        this.rendered = true;
        this.open();
      }
    }
  };
</script>

<style>
  .s-dialog {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000a17;
    border: 1px solid rgba(168, 168, 168, 0.54);
    border-radius: 3px;
    font-size: 16px;
    box-shadow: inset 0 0 9px #ccc;
    text-align: left;
  }
  .s-dialog-tiny {
    width: 30%
  }

  .s-dialog-small {
    width: 600px;
  }

  .s-dialog-large {
    width: 90%
  }

  .s-dialog-full {
    width: 100%;
    top: 0;
    height: 100%;
    overflow: auto
  }

  .s-dialog-wrapper {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
    margin: 0
  }

  .s-dialog-header {
    position: relative;
    background-image: -moz-linear-gradient( 90deg, rgba(11,118,246,0.38) 0%, rgba(45,146,254,0.38) 84%, rgba(46,153,255,0.38) 100%);
    background-image: -webkit-linear-gradient( 90deg, rgba(11,118,246,0.38) 0%, rgba(45,146,254,0.38) 84%, rgba(46,153,255,0.38) 100%);
    background-image: linear-gradient( 90deg, rgba(11,118,246,0.38) 0%, rgba(45,146,254,0.38) 84%, rgba(46,153,255,0.38) 100%);
    height: 36px;
  }

  .s-dialog-close {
    position: absolute;
    top: 9px;
    right: 20px;
    color: #b3e5ff;
    cursor: pointer;
    font-size: 20px;
  }

  .s-dialog-close:hover {
    color: #20a0ff
  }

  .s-dialog-title {
    display: block;
    font-size: 16px;
    color: #e5f5fa;
    padding: 7px 21px;
  }

  .s-dialog-body {
    padding: 20px;
    color: #e5f5fa;
    font-size: 14px;
    position: relative;
  }

  .s-dialog-headerbtn {
    float: right
  }

  .s-dialog-footer {
    padding: 20px;
    text-align: right
  }
  .s-dialog-footer button + button {
    margin-left: 10px;
  }

  .dialog-fade-enter-active {
    animation: dialog-fade-in .3s
  }

  .dialog-fade-leave-active {
    animation: dialog-fade-out .3s
  }

  @keyframes dialog-fade-in {
    0% {
      transform: translate3d(0,-20px,0);
      opacity: 0
    }

    to {
      transform: translateZ(0);
      opacity: 1
    }
  }

  @keyframes dialog-fade-out {
    0% {
      transform: translateZ(0);
      opacity: 1
    }

    to {
      transform: translate3d(0,-20px,0);
      opacity: 0
    }
  }

</style>