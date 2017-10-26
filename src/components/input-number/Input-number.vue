<template>
  <div class="s-input-number"
       :class="[
      type ? 's-input-number-' + type : '',
      size ? 's-input-number-' + size : '',
      { 'is-disabled': disabled },
      { 'is-without-controls': !controls}
    ]"
  >

    <span
      v-if="controls"
      class="s-input-number-increase"
      :class="{'is-disabled': maxDisabled}"
      v-repeat-click="increase"
    >
      <i v-if='type=="topBottom"' class="iconfont icon-plusB"></i>
      <i class="iconfont icon-top" v-else></i>
    </span>
    <span
      v-if="controls"
      class="s-input-number-decrease"
      :class="{'is-disabled': minDisabled}"
      v-repeat-click="decrease"
    >
      <i v-if='type=="topBottom"' class="iconfont  icon-minusB"></i>
      <i class="iconfont icon-bottom" v-else></i>
    </span>
    <s-input
      :value="currentValue"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @input="handleInput"
      :disabled="disabled"
      :size="size"
      :max="max"
      :min="min"
      ref="input"
    >
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
    </s-input>
  </div>
</template>
<script>
  import SInput from '../input';
  import {once, on} from '../extra/utils/dom';

  export default {
    name: 's-input-number',
    directives: {
      repeatClick: {
        bind(el, binding, vnode) {
          let interval = null;
          let startTime;
          const handler = () => vnode.context[binding.expression].apply();
          const clear = () => {
            if (new Date() - startTime < 100) {
              handler();
            }
            clearInterval(interval);
            interval = null;
          };

          on(el, 'mousedown', () => {
            startTime = new Date();
            once(document, 'mouseup', clear);
            interval = setInterval(handler, 100);
          });
        }
      }
    },
    components: {
      SInput
    },
    props: {
      type: {
        type: String,
        default: "default"
      },
      step: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      value: {
        default: 0
      },
      disabled: Boolean,
      size: String,
      controls: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentValue: 0
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          let newVal = Number(value);
          if (isNaN(newVal)) return;
          if (newVal >= this.max) newVal = this.max;
          if (newVal <= this.min) newVal = this.min;
          this.currentValue = newVal;
          this.$emit('input', newVal);
        }
      }
    },
    computed: {
      minDisabled() {
        return this._decrease(this.value, this.step) < this.min;
      },
      maxDisabled() {
        return this._increase(this.value, this.step) > this.max;
      },
      precision() {
        const {value, step, getPrecision} = this;
        return Math.max(getPrecision(value), getPrecision(step));
      }
    },
    methods: {
      toPrecision(num, precision) {
        if (precision === undefined) precision = this.precision;
        return parseFloat(parseFloat(Number(num).toFixed(precision)));
      },
      getPrecision(value) {
        const valueString = value.toString();
        const dotPosition = valueString.indexOf('.');
        let precision = 0;
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      },
      _increase(val, step) {
        if (typeof val !== 'number') return this.currentValue;

        const precisionFactor = Math.pow(10, this.precision);

        return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
      },
      _decrease(val, step) {
        if (typeof val !== 'number') return this.currentValue;

        const precisionFactor = Math.pow(10, this.precision);

        return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
      },
      increase() {
        if (this.disabled || this.maxDisabled) return;
        const value = this.value || 0;
        const newVal = this._increase(value, this.step);
        if (newVal > this.max) return;
        this.setCurrentValue(newVal);
      },
      decrease() {
        if (this.disabled || this.minDisabled) return;
        const value = this.value || 0;
        const newVal = this._decrease(value, this.step);
        if (newVal < this.min) return;
        this.setCurrentValue(newVal);
      },
      handleBlur() {
        this.$refs.input.setCurrentValue(this.currentValue);
      },
      setCurrentValue(newVal) {
        const oldVal = this.currentValue;
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        if (oldVal === newVal) return;
        this.$emit('change', newVal, oldVal);
        this.$emit('input', newVal);
        this.currentValue = newVal;
      },
      handleInput(value) {
        const newVal = Number(value);
        if (!isNaN(newVal)) {
          this.setCurrentValue(newVal);
        }
      }
    }
  };
</script>

<style>
  .s-input-number {
    display: inline-block;
    overflow: hidden;
    width: 180px;
    position: relative;
    background: #000009;
  }

  .s-input-number .s-input {
    display: block
  }

  .s-input-number .s-input-inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 82px
  }

  .s-input-number.is-without-controls .s-input-inner {
    padding-right: 10px;
  }

  .s-input-number.is-disabled .s-input-number-decrease, .s-input-number.is-disabled .s-input-number-increase {
    border: 1px solid rgb(52, 68, 88);
    color: #4d617b;
    background: #2c394b;
  }

  .s-input-number.is-disabled .s-input-number-increase {
    border-top-right-radius: 4px;
  }

  .s-input-number.is-disabled .s-input-number-decrease {
    border-bottom-right-radius: 9px;
  }

  .s-input-number.is-disabled .s-input-number-decrease:hover, .s-input-number.is-disabled .s-input-number-increase:hover {
    cursor: not-allowed
  }

  .s-input-number-decrease, .s-input-number-increase {
    height: auto;
    border-left: 1px solid #344458;
    width: 36px;
    line-height: 18px;
    top: 0px;
    text-align: center;
    color: #c9daeb;
    cursor: pointer;
    position: absolute;
    z-index: 1;
  }

  .s-input-number-decrease {
    top: 19px;
    right: 0
  }

  .s-input-number-decrease:hover {
    color: #c9daeb;
    background: -moz-linear-gradient(bottom, #02f2ff, #0275ce); /*Mozilla*/
    background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#02f2ff), to(#0275ce)); /*Old gradient for webkit*/
    background: -webkit-linear-gradient(bottom, #02f2ff, #0275ce); /*new gradient for Webkit*/
    background: -o-linear-gradient(bottom, #02f2ff, #0275ce); /*Opera11*/
  }

  .s-input-number-increase:hover {
    color: #c9daeb;
    background: -moz-linear-gradient(top, #02f2ff, #0275ce); /*Mozilla*/
    background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#02f2ff), to(#0275ce)); /*Old gradient for webkit*/
    background: -webkit-linear-gradient(top, #02f2ff, #0275ce); /*new gradient for Webkit*/
    background: -o-linear-gradient(top, #02f2ff, #0275ce); /*Opera11*/
  }

  .s-input-number-decrease:hover:not(.is-disabled) ~ .s-input:not(.is-disabled) .s-input-inner:not(.is-disabled), .s-input-number-increase:hover:not(.is-disabled) ~ .s-input:not(.is-disabled) .s-input-inner:not(.is-disabled) {
    border-color: #20a0ff
  }

  .s-input-number-decrease.is-disabled, .s-input-number-increase.is-disabled {
    color: #d1dbe5;
    cursor: not-allowed
  }

  .s-input-number-increase {
    right: 0;
    border-bottom: 1px solid #344458;
  }

  .s-input-number-large {
    width: 200px
  }

  .s-input-number-large .s-input-number-decrease, .s-input-number-large .s-input-number-increase {
    line-height: 20px;
    width: 42px;
    font-size: 16px
  }

  .s-input-number-large .s-input-number-decrease {
    top: 22px
  }

  .s-input-number-large .s-input-inner {
    padding-right: 94px
  }

  .s-input-number-small {
    width: 130px
  }

  .s-input-number-small .s-input-number-decrease, .s-input-number-small .s-input-number-increase {
    line-height: 13px;
    width: 30px;
    font-size: 13px
  }

  .s-input-number-small .s-input-number-decrease {
    top: 15px
  }

  .s-input-number-small .s-input-inner {
    padding-right: 70px
  }

  .s-input-number-topBottom .s-input-number-decrease, .s-input-number-topBottom .s-input-number-increase {
    height: auto;
    width: 36px;
    line-height: 34px;
    top: 1px;
    text-align: center;
    color: #97a8be;
    cursor: pointer;
    position: absolute;
    z-index: 1;
  }

  .s-input-number-topBottom .s-input-number-increase {
    right: 0;
  }

  .s-input-number-topBottom .s-input-number-decrease {
    right: 37px;
  }

  .s-input-number-topBottom .s-input-number-large .s-input-number-decrease, .s-input-number-topBottom .s-input-number-large .s-input-number-increase {
    line-height: 42px;
    width: 42px;
    font-size: 16px
  }

  .s-input-number-topBottom .s-input-number-large .s-input-number-decrease {
    right: 43px
  }

  .s-input-number-topBottom .s-input-number-small .s-input-number-decrease, .s-input-number-topBottom .s-input-number-small .s-input-number-increase {
    line-height: 30px;
    width: 30px;
    font-size: 13px
  }

  .s-input-number-topBottom .s-input-number-small .s-input-number-decrease {
    right: 31px
  }


</style>
