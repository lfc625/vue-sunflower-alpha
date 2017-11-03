<template>
  <transition name="s-message-fade">
    <div
      class="s-message"
      :class="`${customClass} s-message-${type}`"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <img class="s-message-img" :src="typeImg" alt="" v-if="!iconClass">
      <div class="s-message-warpper">
        <div class="s-message-group" :class="{ 'is-with-icon': iconClass }">
            <p v-if="!dangerouslyUseHTMLString">
              <i class="s-message-icon" :class="iconClass" v-if="iconClass"></i>{{ message }}
            </p>
            <p v-else>
              <i class="s-message-icon" :class="iconClass" v-if="iconClass"></i><span v-html="message"></span>
            </p>
          <div v-if="showClose" class="s-message-closeBtn iconfont icon-error" @click="close"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  let icon = {};
  import error from './assets/error.svg';
  import info from './assets/info.svg';
  import success from './assets/success.svg';
  import warning from './assets/warning.svg';
  icon = {
    error: error,
    info: info,
    success: success,
    warning: warning
  }
  export default {
    data() {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null,
        dangerouslyUseHTMLString: false
      };
    },

    computed: {
      typeImg() {
        return icon[this.type];
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      }
    },

    mounted() {
      this.startTimer();
    }
  };
</script>
<style>
  .s-message{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    min-width: 300px;
    position: fixed;
    left: 50%;
    top: 20px;
    border-radius: 3px;
    transform: translateX(-50%);
    transition: opacity .3s, transform .4s;
  }
  .s-message>div {

    min-width: 300px;
    padding: 10px 12px;
    box-sizing: border-box;
    border: solid 1px rgb(52, 68, 88);
    border-radius: 3px;
    background: #000009;
    overflow: hidden
  }

 /*
  .s-message.s-message-info {
    border: solid 1px rgba(0, 147, 231, 0.749);
    background-color: rgba(5, 90, 170, 0.749);
  }

  .s-message.s-message-warning {
    border: solid 1px rgba(241, 116, 8, 0.749);
    background-color: rgba(173, 81, 0, 0.749);
  }

  .s-message.s-message-success {
    border: solid 1px rgba(0, 195, 0, 0.749);
    background-color: rgba(0, 134, 0, 0.749);
  }

  .s-message.s-message-error {
    border: solid 1px rgba(210, 3, 0, 0.749);
    background-color: rgba(153, 1, 0, 0.749);
  }
 */
  .s-message .el-icon-circle-check {
    color: #13ce66
  }

  .s-message .el-icon-circle-cross {
    color: #ff4949
  }

  .s-message .el-icon-information {
    color: #50bfff
  }

  .s-message .el-icon-warning {
    color: #f7ba2a
  }

  .s-message-group {
    margin-left: 38px;
    position: relative;
    height: 20px;
    line-height: 20px
  }

  .s-message-group p {
    font-size: 14px;
    margin: 0 34px 0 0;
    white-space: nowrap;
    color: #ffffff;
    text-align: justify
  }

  .s-message-group.is-with-icon {
    margin-left: 0
  }

  .s-message-img {
    width: 51px;
    height: 42px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .s-message-icon {
    vertical-align: middle;
    margin-right: 8px
  }

  .s-message-closeBtn {
    top: 0;
    right: 0;
    position: absolute;
    cursor: pointer;
    color: #bfcbd9;
    font-size: 14px
  }

  .s-message-closeBtn:hover {
    color: #97a8be
  }

  .s-message-fade-enter,
  .s-message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%)
  }

</style>
