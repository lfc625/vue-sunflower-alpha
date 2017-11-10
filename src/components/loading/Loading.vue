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
