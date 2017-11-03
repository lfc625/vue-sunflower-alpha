<template>
  <div :class="[
    type === 'textarea' ? 's-textarea' : 's-input',
    inputSize ? 's-input-' + inputSize : '',
    {
      'is-disabled': disabled,
      's-input-group': $slots.prepend || $slots.append,
      's-input-group-append': $slots.append,
      's-input-group-prepend': $slots.prepend,
      's-input-prefix': $slots.prefix || prefixIcon,
      's-input-suffix': $slots.suffix || suffixIcon
    }
  ]">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="s-input-group_prepend" v-if="$slots.prepend" tabindex="0">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        class="s-input-inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="s-input_prefix" v-if="$slots.prefix || prefixIcon" :style="prefixOffset">
        <slot name="prefix"></slot>
        <i
          v-if="prefixIcon"
          :class="['iconfont', prefixIcon?`icon-${prefixIcon}`:'']"
          class="s-input-icon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="s-input_suffix"
        v-if="$slots.suffix || suffixIcon || validateState && needStatusIcon"
        :style="suffixOffset">
        <span class="s-input_suffix-inner">
          <slot name="suffix"></slot>
          <i
            v-if="suffixIcon"
            class="s-input-icon"
            :class="['iconfont', suffixIcon?`icon-${suffixIcon}`:'']">
          </i>
        </span>
        <i class="s-input-icon"
          v-if="validateState"
          :class="['s-input_validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="s-input-group_append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="s-textarea-inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
  import emitter from '../extra/mixins/emitter';
  import Focus from '../extra/mixins/focus';
  import Migrating from '../extra/mixins/migrating';
  import calcTextareaHeight from './calcTextareaHeight';
  import merge from '../extra/utils/merge';

  export default {
    name: 's-input',

    componentName: 'SInput',

    mixins: [emitter, Focus('input'), Migrating],

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    data() {
      return {
        currentValue: this.value,
        textareaCalcStyle: {},
        prefixOffset: null,
        suffixOffset: null
      };
    },

    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      name: String,
      form: String,
      id: String,
      maxlength: Number,
      minlength: Number,
      readonly: Boolean,
      autofocus: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      validateState() {
        return this.elFormItem ? this.elFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.elForm ? this.elForm.statusIcon : false;
      },
      validateIcon() {
        return {
          validating: 's-icon-loading',
          success: 'el-icon-circle-check',
          error: 's-icon-error'
        }[this.validateState];
      },
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      isGroup() {
        return this.$slots.prepend || this.$slots.append;
      }
    },

    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('SFormItem', 'el.form.blur', [this.currentValue]);
        }
      },
      inputSelect() {
        this.$refs.input.select();
      },
      resizeTextarea() {
        if (this.$isServer) return;
        var { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.$nextTick(_ => {
          this.resizeTextarea();
        });
        this.currentValue = value;
        if (this.validateEvent) {
          this.dispatch('SFormItem', 'el.form.change', [value]);
        }
      },
      calcIconOffset(place) {
        const pendantMap = {
          'suf': 'append',
          'pre': 'prepend'
        };

        const pendant = pendantMap[place];

        if (this.$slots[pendant]) {
          return { transform: `translateX(${place === 'suf' ? '-' : ''}${this.$el.querySelector(`.s-input-group_${pendant}`).offsetWidth}px)` };
        }
      }
    },

    created() {
      this.$on('inputSelect', this.inputSelect);
    },

    mounted() {
      this.resizeTextarea();
      if (this.isGroup) {
        this.prefixOffset = this.calcIconOffset('pre');
        this.suffixOffset = this.calcIconOffset('suf');
      }
    }
  };
</script>

<style>
  .s-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%
  }

  .s-input-inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #344458;
    box-sizing: border-box;
    color: #e5f5fa;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: none;
    padding: 0px 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%
  }

  .s-input-inner::-webkit-input-placeholder {
    color: #5c6269
  }
  .s-input-inner::-moz-placeholder {
    color: #5c6269
  }
  .s-input-inner:-ms-input-placeholder {
    color: #5c6269
  }
  .s-input-inner::placeholder {
    color: #5c6269
  }
  .s-input-inner:hover {
    border-color: #8391a5
  }
  .s-input-inner:focus {
    outline: none;
    border-color: #3099e3
  }

  .s-input_suffix {
    position:absolute;
    height:100%;
    right:5px;
    top:0;
    text-align:center;
    color:#b4bccc;
    transition:all .3s;
    pointer-events:none
  }

  .s-input_suffix-inner {
    pointer-events:all
  }

  .s-input_prefix {
    position:absolute;
    left:5px;
    top:0;
    color:#b4bccc
  }

  .s-input-icon,.s-input_prefix {
    height:100%;
    text-align:center;
    transition:all .3s
  }

  .s-input-icon {
    width:25px;
    line-height:40px
  }

  .s-input-icon:after {
    content:"";
    height:100%;
    width:0;
    display:inline-block;
    vertical-align:middle
  }

  .s-input_validateIcon {
    pointer-events:none
  }

  .s-input.is-active .s-input-inner {
    outline: none;
    border-color: #3099e3
  }

  .s-input.is-disabled .s-input-inner {
    background-color: rgba(52, 68, 88, 0.6);
    border-color: rgb(52, 68, 88);
    color: rgb(103, 115, 131);
    cursor: not-allowed
  }

  .s-input.is-disabled .s-input-inner::-webkit-input-placeholder {
    color: rgb(103, 115, 131);
  }
  .s-input.is-disabled .s-input-inner::-moz-placeholder {
    color: rgb(103, 115, 131);
  }
  .s-input.is-disabled .s-input-inner:-ms-input-placeholder {
    color: rgb(103, 115, 131);
  }
  .s-input.is-disabled .s-input-inner::placeholder {
    color: rgb(103, 115, 131);
  }

  .s-input-suffix .s-input-inner {
    padding-right:30px
  }

  .s-input-prefix .s-input-inner {
    padding-left:30px
  }

  .s-input-medium {
    font-size:14px
  }

  .s-input-medium .s-input-inner {
    height:36px
  }

  .s-input-medium .s-input-icon {
    line-height:36px
  }

  .s-input-small {
    font-size:13px
  }

  .s-input-small .s-input-inner {
    height:32px
  }

  .s-input-small .s-input-icon {
    line-height:32px
  }

  .s-input-mini {
    font-size:12px
  }

  .s-input-mini .s-input-inner {
    height:28px
  }

  .s-input-mini .s-input-icon {
    line-height:28px
  }

  .s-input-group {
    line-height:normal;
    display:inline-table;
    width:100%;
    border-collapse:separate
  }

  .s-input-group>.s-input-inner {
    vertical-align:middle;
    display:table-cell
  }

  .s-input-group_append,
  .s-input-group_prepend {
    background-color: transparent;
    color: #97a8be;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #344458;
    border-radius: 4px;
    padding: 0 10px;
    width: 1%;
    white-space: nowrap
  }

  .s-input-group_append:focus,
  .s-input-group_prepend:focus {
    outline:none
  }
  .s-input-group_append .s-button,
  .s-input-group_append .s-select,
  .s-input-group_prepend .s-button,
  .s-input-group_prepend .s-select {
    display:inline-block;
    margin:-20px
  }
  .s-input-group_append button.s-button,
  .s-input-group_append div.s-select .s-input-inner,
  .s-input-group_append div.s-select:hover .s-input-inner,
  .s-input-group_prepend button.s-button,
  .s-input-group_prepend div.s-select .s-input-inner,
  .s-input-group_prepend div.s-select:hover .s-input-inner {
    border-color:transparent;
    background-color:transparent;
    color:inherit;
    border-top:0;
    border-bottom:0
  }
  .s-input-group_append .s-button,
  .s-input-group_append .s-input,
  .s-input-group_prepend .s-button,
  .s-input-group_prepend .s-input {
    font-size:inherit
  }
  .s-input-group_prepend {
    border-right:0;
    border-top-right-radius:0;
    border-bottom-right-radius:0
  }
  .s-input-group_append {
    border-left:0
  }
  .s-input-group-prepend .s-input-inner,
  .s-input-group_append {
    border-top-left-radius:0;
    border-bottom-left-radius:0
  }
  .s-input-group-append .s-input-inner {
    border-top-right-radius:0;
    border-bottom-right-radius:0
  }

  .s-textarea {
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
  }

  .s-textarea-inner{
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;width:100%;
    font-size: 14px;
    color: #e5f5fa;
    background: transparent;
    border: 1px solid #344458;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1)
  }

  .s-textarea-inner::placeholder {
    color: #5c6269
  }

  .s-textarea-inner:hover {
    border-color: #8391a5
  }

  .s-textarea-inner:focus {
    outline: none;
    border-color: #3099e3
  }

  .s-textarea.is-disabled .s-textarea-inner {
    background-color: rgba(52, 68, 88, 0.6);
    border-color: rgb(52, 68, 88);
    color: rgb(103, 115, 131);
    cursor: not-allowed
  }

  .s-textarea.is-disabled .s-textarea-inner::placeholder {
    color: rgb(103, 115, 131);
  }
</style>
