<template>
  <label class="s-checkbox">
    <span class="s-checkbox-input"
          :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
    >
      <span class="s-checkbox-inner"></span>
      <input
              v-if="trueLabel || falseLabel"
              class="s-checkbox-original"
              type="checkbox"
              :name="name"
              :disabled="disabled"
              :true-value="trueLabel"
              :false-value="falseLabel"
              v-model="model"
              @change="handleChange"
              @focus="focus = true"
              @blur="focus = false">
      <input
              v-else
              class="s-checkbox-original"
              type="checkbox"
              :disabled="disabled"
              :value="label"
              :name="name"
              v-model="model"
              @change="handleChange"
              @focus="focus = true"
              @blur="focus = false">
    </span>
    <span class="s-checkbox-label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '../extra/mixins/emitter';

  export default {
    name: 's-checkbox',
    mixins: [Emitter],
    componentName: 'SCheckbox',
    data() {
      return {
        selfModel: false,
        focus: false
      };
    },
    computed: {
      model: {
        get() {
          return this.isGroup
              ? this.store : this.value !== undefined
                  ? this.value : this.selfModel;
        },
        set(val) {
          if (this.isGroup) {
            let isLimitExceeded = false;
            (this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (isLimitExceeded = true));
            (this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (isLimitExceeded = true));
            isLimitExceeded === false &&
            this.dispatch('SCheckboxGroup', 'input', [val]);
          } else if (this.value !== undefined) {
            this.$emit('input', val);
          } else {
            this.selfModel = val;
          }
        }
      },
      isChecked() {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'SCheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        return false;
      },
      store() {
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      }
    },
    props: {
      value: {},
      label: {},
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number]
    },
    methods: {
      addToStore() {
        if (
            Array.isArray(this.model) &&
            this.model.indexOf(this.label) === -1
        ) {
          this.model.push(this.label);
        } else {
          this.model = this.trueLabel || true;
        }
      },
      handleChange(ev) {
        this.$emit('change', ev);
        if (this.isGroup) {
          this.$nextTick(_ => {
            this.dispatch('SCheckboxGroup', 'change', [this._checkboxGroup.value]);
          });
        }
      }
    },
    created() {
      this.checked && this.addToStore();
    }
  };
</script>
<style>
  .s-checkbox {
    color: #e5f5fa;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none
  }

  .s-checkbox+.s-checkbox {
    margin-left: 15px
  }

  .s-checkbox-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle
  }

  .s-checkbox-input.is-indeterminate .s-checkbox-inner {
    background:-moz-linear-gradient(top,#02f2ff,#0275ce);/*Mozilla*/
    background:-webkit-gradient(linear,0 50%,100% 50%,from(#02f2ff),to(#0275ce));/*Old gradient for webkit*/
    background:-webkit-linear-gradient(top,#02f2ff,#0275ce);/*new gradient for Webkit*/
    background:-o-linear-gradient(top,#02f2ff,#0275ce); /*Opera11*/
    border-color: #0190fe
  }

  .s-checkbox-input.is-indeterminate .s-checkbox-inner:before {
    content: "";
    position: absolute;
    display: block;
    border: 1px solid #0275ce;
    margin-top: -1px;
    left: 3px;
    right: 3px;
    top: 50%
  }

  .s-checkbox-input.is-indeterminate .s-checkbox-inner:after {
    display: none
  }

  .s-checkbox-input.is-focus .s-checkbox-inner {
    border-color: #20a0ff
  }

  .s-checkbox-input.is-checked .s-checkbox-inner {
    background:-moz-linear-gradient(top,#02f2ff,#0275ce);/*Mozilla*/
    background:-webkit-gradient(linear,0 50%,100% 50%,from(#02f2ff),to(#0275ce));/*Old gradient for webkit*/
    background:-webkit-linear-gradient(top,#02f2ff,#0275ce);/*new gradient for Webkit*/
    background:-o-linear-gradient(top,#02f2ff,#0275ce); /*Opera11*/
    border-color: #0190fe
  }

  .s-checkbox-input.is-checked .s-checkbox-inner:after {
    -webkit-transform: rotate(45deg) scaleY(1);
    -moz-transform: rotate(45deg) scaleY(1);
    -o-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1)
  }

  .s-checkbox-input.is-disabled .s-checkbox-inner {
    background-color: #1f2938;
    border-color: #344458;
    cursor: not-allowed
  }

  .s-checkbox-input.is-disabled .s-checkbox-inner:after {
    cursor: not-allowed;
    border-color: #344458
  }

  .s-checkbox-input.is-disabled .s-checkbox-inner+.s-checkbox-label {
    cursor: not-allowed
  }

  .s-checkbox-input.is-disabled.is-checked .s-checkbox-inner {
    background: #1f2938;
    border-color: #344458
  }

  .s-checkbox-input.is-disabled.is-checked .s-checkbox-inner:after {
    border-color: #4e627c
  }

  .s-checkbox-input.is-disabled.is-indeterminate .s-checkbox-inner {
    background-color: #d1dbe5;
    border-color: #d1dbe5
  }

  .s-checkbox-input.is-disabled.is-indeterminate .s-checkbox-inner:before {
    border-color: #000009
  }

  .s-checkbox-input.is-disabled+.s-checkbox-label {
    color: #bbb;
    cursor: not-allowed
  }

  .s-checkbox-inner {
    display: inline-block;
    position: relative;
    border: 1px solid #344458;
    border-radius: 4px;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    background-color: #000009;
    z-index: 1;
    -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    -moz-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    -o-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)
  }

  .s-checkbox-inner:hover {
    border-color: #20a0ff
  }

  .s-checkbox-inner:after {
    box-sizing: content-box;
    content: "";
    border: 2px solid #000009;
    border-left: 0;
    border-top: 0;
    height: 8px;
    left: 5px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    -moz-transform: rotate(45deg) scaleY(0);
    -o-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 4px;
    -webkit-transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    -moz-transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    -o-transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    -webkit-transform-origin: center;
    -moz-transform-origin: center;
    -o-transform-origin: center;
    transform-origin: center
  }

  .s-checkbox-original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    left: -999px
  }

  .s-checkbox-label {
    font-size: 14px;
    padding-left: 5px
  }

</style>