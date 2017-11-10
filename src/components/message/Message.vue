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
  import info from '../../theme-dark/img/icon-message-info.svg';
  import success from '../../theme-dark/img/icon-message-success.svg';
  import error from '../../theme-dark/img/icon-message-error.svg';
  import warning from '../../theme-dark/img/icon-message-warning.svg';
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