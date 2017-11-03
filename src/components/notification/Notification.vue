<template>
  <transition name="s-notification-fade">
    <div
      :class="['s-notification', customClass]"
      v-show="visible"
      :style="{ bottom: top ? top + 'px' : 'auto' }"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click">
      <i
        class="s-notification-icon"
        :class="[ typeClass, iconClass ]"
        v-if="type || iconClass">
      </i>
      <div class="s-notification-group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="s-notification-title" v-text="title"></h2>
        <div class="s-notification-content">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div
          class="s-notification-closeBtn iconfont icon-error"
          v-if="showClose"
          @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  let typeMap = {
    success: 'circle-check',
    info: 'info',
    warning: 'warning',
    error: 'circle-cross'
  };

  export default {
    data() {
      return {
        visible: false,
        title: '',
        message: '',
        duration: 4500,
        type: '',
        showClose: true,
        customClass: '',
        iconClass: '',
        onClose: null,
        onClick: null,
        closed: false,
        top: null,
        timer: null,
        dangerouslyUseHTMLString: false
      };
    },

    computed: {
      typeClass() {
        return this.type && typeMap[this.type] ? `s-notify-icon-${typeMap[this.type]}` : '';
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

      click() {
        if (typeof this.onClick === 'function') {
          this.onClick();
        }
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose();
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
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  };
</script>
<style>
  .s-notification {
    width: 330px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #0c416d;
    position: fixed;
    right: 16px;
    background-color: #042948;
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    transition: opacity .3s, transform .3s, right .3s, bottom .4s;
    overflow: hidden
  }

  .s-notification-group {
    margin-left: 0
  }

  .s-notification-group.is-with-icon {
    margin-left: 55px
  }

  .s-notification-title {
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    margin: 0
  }

  .s-notification-content {
    font-size: 14px;
    line-height: 21px;
    margin: 10px 0 0;
    color: #f3f3f3;
    text-align: justify
  }

  .s-notification-icon {
    width: 40px;
    height: 40px;
    font-size: 40px;
    float: left;
    position: relative;
    top: 3px
  }

  .s-notification-closeBtn {
    top: 20px;
    right: 20px;
    position: absolute;
    cursor: pointer;
    color: #bfcbd9;
    font-size: 14px
  }

  .s-notification-closeBtn:hover {
    color: #97a8be
  }

  .s-notification-fade-enter {
    transform: translateX(100%);
    right: 0
  }

  .s-notification-fade-leave-active {
    opacity: 0
  }

  .s-notify-icon-circle-check {
    background: url(./assets/icon-notify-circle-check.svg);
  }

  .s-notify-icon-info {
    background: url(./assets/icon-notify-info.svg);
  }

  .s-notify-icon-warning {
    background: url(./assets/icon-notify-warning.svg);
  }

  .s-notify-icon-circle-cross {
    background: url(./assets/icon-notify-circle-cross.svg);
  }
</style>