<template>
  <label class="s-switch"
         :class="{
            'is-disabled': disabled,
            'is-checked': checked,
            's-switch-wide': hasText
         }">
    <input class="s-switch-input"
           type="checkbox"
           ref="input"
           @change="handleChange"
           :true-value="onValue"
           :false-value="offValue"
           :disabled="disabled" />
    <span class="s-switch-core" ref="core" :style="{'width': coreWidth + 'px'}">
      <span class="s-switch-button" ref="ball" :style="{ transform }"></span>
    </span>
    <transition name="label-fade">
      <div class="s-switch-label s-switch-label-left"
           v-show="checked"
           :style="{ 'width': coreWidth + 'px' }">
        <i :class="[onIconClass]" v-if="onIconClass"></i>
        <span v-if="!onIconClass && onText">{{ onText }}</span>
      </div>
    </transition>
    <transition name="label-fade">
      <div class="s-switch-label s-switch-label-right"
           v-show="!checked" :style="{ 'width': coreWidth + 'px' }">
        <i :class="[offIconClass]" v-if="offIconClass"></i>
        <span v-if="!offIconClass && offText">{{ offText }}</span>
      </div>
    </transition>
  </label>
</template>

<script>
  export default {
    name: 's-switch',
    props: {
      value: {
        type: [Boolean, String, Number],
        default: true
      },
      onValue: {
        type: [Boolean, String, Number],
        default: true
      },
      offValue: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      onText: {
        type: String,
        default: ''
      },
      offText: {
        type: String,
        default: ''
      },
      width: {
        default: Number,
        default: 0
      },
      onIconClass: {
        type: String,
        default: ''
      },
      offIconClass: {
        type: String,
        default: ''
      },
      onColor: {
        type: String,
        default: ''
      },
      offColor: {
        type: String,
        default: ''
      },
      ballColor: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        coreWidth: this.width
      }
    },
    computed: {
      checked() {
        return this.value === this.onValue;
      },
      hasText() {
        return Boolean(this.onText || this.offText);
      },
      transform() {
        return this.checked ? 'translate(' + (this.coreWidth - 20) + 'px, 2px)' : 'translate(2px, 2px)';
      }
    },
    methods: {
      handleChange() {
        this.$emit('change', this.checked ? this.offValue : this.onValue);
        this.$emit('input', this.checked ? this.offValue : this.onValue);
        this.$nextTick(() => {
          this.$refs.input.checked = this.checked;
        });
      },
      setBackgroundColor() {
        let newColor = this.checked ? this.onColor : this.offColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      setBallColor() {
        this.$refs.ball.style.backgroundColor = this.ballColor;
      }
    },
    watch: {
      checked() {
        if (this.onColor || this.offColor) {
          this.setBackgroundColor();
        }
      }
    },
    created() {
      if (!~[this.onValue, this.offValue].indexOf(this.value)) {
        this.$emit('input', this.offValue);
      }
    },
    mounted() {
      if (this.width === 0) {
        this.coreWidth = this.hasText ? 58 : 46;
      }
      if (this.onColor || this.offColor) {
        this.setBackgroundColor();
      }
      if (this.ballColor) {
        this.setBallColor();
      }
      this.$refs.input.checked = this.checked;
    }
  }
</script>

<style>
  .s-switch {
    display: inline-block;
    position: relative;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
    vertical-align: middle;
  }
  .s-switch .label-fade-enter,
  .s-switch .label-fade-leave-active {
    opacity: 0;
  }
  .s-switch.is-disabled .s-switch-core {
    border-color: #344458 !important;
    background: #1f2938 !important;
  }
  .s-switch.is-disabled .s-switch-core .s-switch-button {
    background-color: #2c394b !important;
  }
  .s-switch.is-disabled .s-switch-core,
  .s-switch.is-disabled .s-switch-label {
    cursor: not-allowed;
  }
  .s-switch.is-checked .s-switch-core {
    border-color: #115c9b;
    background-color: transparent;
  }
  .s-switch.is-checked .s-switch-core .s-switch-button {
    background-color: #115c9b;
  }
  .s-switch-label {
    transition: .2s;
    width: 46px;
    height: 22px;
    left: 0;
    top: 0;
    cursor: pointer;
  }
  .s-switch-label,
  .s-switch-label * {
    position: absolute;
    display: inline-block;
    font-size: 14px;
  }
  .s-switch-label * {
    line-height: 1;
    top: 4px;
    color: #fff;
  }
  .s-switch-label-left i {
    left: 6px;
  }
  .s-switch-label-right i {
    right: 6px;
  }
  .s-switch-input {
    display: none;
  }
  .s-switch-core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 46px;
    height: 22px;
    border: 1px solid #344458;
    outline: none;
    border-radius: 12px;
    box-sizing: border-box;
    background: transparent;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
  }
  .s-switch-core .s-switch-button {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 100%;
    transition: transform .3s;
    width: 16px;
    height: 16px;
    background-color: #44576e;
  }
  .s-switch-wide .s-switch-label.s-switch-label-left span {
    left: 10px;
  }
  .s-switch-wide .s-switch-label.s-switch-label-right span {
    right: 10px;
  }
</style>
