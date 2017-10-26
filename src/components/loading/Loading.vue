<template>
  <transition name="s-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="s-loading-mask"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="s-loading-spinner">
        <svg class="circular" viewBox="25 25 62 62">
          <path stroke-width="3" stroke="url('#leftGradient')" fill="none"
                d="M56 30 A 26 26 0 0 0 56 82">
          </path>
          <path stroke-width="3" stroke="url('#rightGradient')" fill="none"
                d="M56 30 A 26 26 0 0 1 56 82">
          </path>

          <defs>
            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:rgb(0, 147, 214);stop-opacity:0.5"/>
              <stop offset="100%" style="stop-color:rgb(0, 147, 214);stop-opacity:0"/>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="rightGradient" x1="0%" y1="0%" x2="0" y2="100%">
              <stop offset="0%" style="stop-color:rgb(0, 147, 214);stop-opacity:0.5"/>
              <stop offset="100%" style="stop-color:rgb(0, 147, 214);stop-opacity:1"/>
            </linearGradient>
          </defs>
        </svg>
        <p v-if="text" class="s-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        fullscreen: true,
        visible: false,
        customClass: ''
      };
    },

    methods: {
      handleAfterLeave() {
        this.$emit('after-leave');
      }
    }
  };
</script>

<style>
  .s-loading-mask {
    position: absolute;
    z-index: 10000;
    background-color: rgba(28, 37, 49, 0.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
  }

  .s-loading-mask.is-fullscreen {
    position: fixed;
  }

  .s-loading-mask.is-fullscreen .s-loading-spinner {
    margin-top: -25px;
  }

  .s-loading-mask.is-fullscreen .s-loading-spinner .circular {
    width: 50px;
    height: 50px;
  }

  .s-loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
  }

  .s-loading-spinner .s-loading-text {
    color: #fff;
    margin: 3px 0;
    font-size: 14px;
  }

  .s-loading-spinner .circular {
    width: 62px;
    height: 62px;
    animation: loading-rotate 2s linear infinite;
  }

  .s-loading-spinner .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #20a0ff;
    stroke-linecap: round;
  }

  .s-loading-fade-enter, .s-loading-fade-leave-active {
    opacity: 0;
  }

  @keyframes loading-rotate {
    to {
      transform: rotate(1turn);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }

    to {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }

</style>
