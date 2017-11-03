<template>
  <div class="s-input-number"
       :class="[
      inputNumberSize ? 's-input-number-' + inputNumberSize : '',
      { 'is-disabled': disabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]">
    <span
      v-if="controls"
      class="s-input-number-decrease"
      :class="{'is-disabled': minDisabled}"
      v-repeat-click="decrease"
      @keydown.enter="decrease"
      role="button">
      <i :class="['iconfont ', `icon-${controlsAtRight ? 'bottom' : 'minus'}`]"></i>
    </span>
    <span
      v-if="controls"
      class="s-input-number-increase"
      :class="{'is-disabled': maxDisabled}"
      v-repeat-click="increase"
      @keydown.enter="increase"
      role="button">
      <i :class="['iconfont', `icon-${controlsAtRight ? 'top' : 'plus'}`]"></i>
    </span>
    <s-input
      :value="currentValue"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="debounceHandleInput"
      :disabled="disabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      ref="input"
      :label="label">
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
  import debounce from 'throttle-debounce/debounce';
  import Focus from '../extra/mixins/focus';
  import RepeatClick from '../extra/directives/repeat-click';

  export default {
    name: 's-input-number',
    mixins: [Focus('input')],
    inject: {
      elFormItem: {
        default: ''
      }
    },
    directives: {
      repeatClick: RepeatClick
    },
    components: {
      SInput
    },
    props: {
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
      size: {
        type: String,
        default: 'medium'
      },
      controls: {
        type: Boolean,
        default: true
      },
      controlsPosition: {
        type: String,
        default: 'right'
      },
      debounce: {
        type: Number,
        default: 300
      },
      name: String,
      label: String
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
        const { value, step, getPrecision } = this;
        return Math.max(getPrecision(value), getPrecision(step));
      },
      controlsAtRight() {
        return this.controlsPosition !== 'bothSide';
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      inputNumberSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
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
      handleBlur(event) {
        this.$emit('blur', event);
        this.$refs.input.setCurrentValue(this.currentValue);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      setCurrentValue(newVal) {
        const oldVal = this.currentValue;
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        if (oldVal === newVal) {
          this.$refs.input.setCurrentValue(this.currentValue);
          return;
        }
        this.$emit('change', newVal, oldVal);
        this.$emit('input', newVal);
        this.currentValue = newVal;
      },
      handleInput(value) {
        if (value === '') {
          return;
        }

        if (value.indexOf('.') === (value.length - 1)) {
          return;
        }

        if (value.indexOf('-') === (value.length - 1)) {
          return;
        }

        const newVal = Number(value);
        if (!isNaN(newVal)) {
          this.setCurrentValue(newVal);
        } else {
          this.$refs.input.setCurrentValue(this.currentValue);
        }
      }
    },
    created() {
      this.debounceHandleInput = debounce(this.debounce, value => {
        this.handleInput(value);
      });
    },
    mounted() {
      let innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('role', 'spinbutton');
      innerInput.setAttribute('aria-valuemax', this.max);
      innerInput.setAttribute('aria-valuemin', this.min);
      innerInput.setAttribute('aria-valuenow', this.currentValue);
      innerInput.setAttribute('aria-disabled', this.disabled);
    },
    updated() {
      let innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('aria-valuenow', this.currentValue);
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
    border-radius: 4px;
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

  .s-input-number-decrease,
  .s-input-number-increase {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    height: auto;
    text-align: center;
    border-left: 1px solid #344458;
    line-height: 20px;
    font-size: 13px;
    color: #c9daeb;
    cursor: pointer;
  }

  .s-input-number-decrease:hover,
  .s-input-number-increase:hover {
    color: #c9daeb;
    background: -moz-linear-gradient(top, #02f2ff, #0275ce); /*Mozilla*/
    background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#02f2ff), to(#0275ce)); /*Old gradient for webkit*/
    background: -webkit-linear-gradient(top, #02f2ff, #0275ce); /*new gradient for Webkit*/
    background: -o-linear-gradient(top, #02f2ff, #0275ce); /*Opera11*/
  }

  .s-input-number-decrease:hover:not(.is-disabled) ~ .s-input:not(.is-disabled) .s-input-inner:not(.is-disabled),
  .s-input-number-increase:hover:not(.is-disabled) ~ .s-input:not(.is-disabled) .s-input-inner:not(.is-disabled) {
    border-color: #20a0ff
  }

  .s-input-number-decrease.is-disabled,
  .s-input-number-increase.is-disabled {
    color: #d1dbe5;
    cursor: not-allowed
  }

  .s-input-number-increase {
    right: 1px;
    border-bottom: 1px solid #344458;
  }

  .s-input-number-decrease {
    left:1px;
    border-right:1px solid #344458
  }

  .s-input-number.is-disabled .s-input-number-decrease,
  .s-input-number.is-disabled .s-input-number-increase {
    border: 1px solid rgb(52, 68, 88);
    color: #4d617b;
    background: #2c394b;
  }

  .s-input-number.is-disabled .s-input-number-decrease:hover,
  .s-input-number.is-disabled .s-input-number-increase:hover {
    cursor: not-allowed
  }

  .s-input-number-large {
    width: 200px
  }

  .s-input-number-large .s-input-number-decrease,
  .s-input-number-large .s-input-number-increase {
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

  .s-input-number-medium {
    width:200px;
    line-height:34px
  }

  .s-input-number-medium .s-input-number-decrease,
  .s-input-number-medium .s-input-number-increase {
    width:36px;
    font-size:14px
  }

  .s-input-number-medium .s-input-inner {
    padding-left:43px;
    padding-right:43px
  }

  .s-input-number-small {
    width: 130px;
    line-height:30px
  }

  .s-input-number-small .s-input-number-decrease,
  .s-input-number-small .s-input-number-increase {
    width: 32px;
    font-size: 13px
  }

  .s-input-number-small .s-input-number-decrease [class*=icon],
  .s-input-number-small .s-input-number-increase [class*=icon] {
    transform:scale(.9)
  }

  .s-input-number-small .s-input-inner {
    padding-left:39px;
    padding-right:39px
  }

  .s-input-number-mini {
    width:130px;
    line-height:26px
  }

  .s-input-number-mini .s-input-number-decrease,
  .s-input-number-mini .s-input-number-increase {
    width:28px;
    font-size:12px
  }

  .s-input-number-mini .s-input-number-decrease [class*=icon],
  .s-input-number-mini .s-input-number-increase [class*=icon] {
    transform:scale(.8)
  }

  .s-input-number-mini .s-input-inner {
    padding-left:35px;
    padding-right:35px
  }

  .s-input-number.is-without-controls .s-input-inner {
    padding-left:15px;
    padding-right:15px
  }

  .s-input-number.is-controls-right .s-input-inner {
    padding-left:15px;
    padding-right:50px
  }

  .s-input-number.is-controls-right .s-input-number-decrease,
  .s-input-number.is-controls-right .s-input-number-increase {
    height:auto;
    line-height:20px
  }

  .s-input-number.is-controls-right .s-input-number-decrease [class*=icon],
  .s-input-number.is-controls-right .s-input-number-increase [class*=icon] {
    transform:scale(.8)
  }

  .s-input-number.is-controls-right .s-input-number-increase {
    border-radius:0 4px 0 0;
  }

  .s-input-number.is-controls-right .s-input-number-decrease {
    right:1px;
    bottom: -2px;
    top:auto;
    left:auto;
    border-right:none;
    border-radius:0 0 4px 0
  }

  .s-input-number.is-controls-right[class*=medium] [class*=decrease],
  .s-input-number.is-controls-right[class*=medium] [class*=increase] {
    line-height:17px
  }

  .s-input-number.is-controls-right[class*=small] [class*=decrease],
  .s-input-number.is-controls-right[class*=small] [class*=increase] {
    line-height:15px
  }

  .s-input-number.is-controls-right[class*=mini] [class*=decrease],
  .s-input-number.is-controls-right[class*=mini] [class*=increase] {
    line-height:13px
  }
</style>
