<template>
    <label class="s-radio">
    <span class="s-radio__input"
          :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="s-radio__inner"></span>
      <input type="radio" class="s-radio__original"
             v-model="model"
             :value="label"
             :name="name"
             :disabled="isDisabled"
             :class="{'checked':model===label}"
             :checked="model === label"
      >
    </span>
        <span class="s-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
    </label>
</template>

<script>
    import Emitter from '../extra/mixins/emitter';

    export default {
        name: 's-radio',
        componentName: 'SRadio',
        mixins: [Emitter],
        props: {
            value: {},
            label: {},
            name: String,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'SRadioGroup') {
                        parent = parent.$parent;
                    } else {
                        return parent;
                    }
                }
                return false;
            },
            model: {
                get() {
                    return this.isGroup ? this.isGroup.value : this.value;
                },
                set(val) {
                    if (this.isGroup) {
                        this.dispatch('SRadioGroup', 'input', [val]);
                    } else {
                        this.$emit('input', val);
                    }
                }
            },
            isDisabled() {
                return this.isGroup
                    ? this.isGroup.disabled || this.disabled
                    : this.disabled;
            }
        }
    }
</script>

<style>
    .s-radio{
        color: #e5f5fa;
        position: relative;
        cursor: pointer;
        display: inline-block;
        white-space: nowrap;
        font-size: 0;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
    .s-radio + .s-radio{
        margin-left: 15px;
    }
    .s-radio__inner{
        border: 1px solid #344458;
        border-radius: 100%;
        width: 18px;
        height: 18px;
        background-color: #000009;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
    }
    .s-radio__inner:hover{
        border-color: #0275ce;
    }
    .s-radio__inner:after{
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #d1e9ff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        -ms-transform: translate(-50%, -50%) scale(0);
        transform: translate(-50%, -50%) scale(0);
        transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
    }
    .s-radio__input{
        cursor: pointer;
        vertical-align: middle;
        display: inline-block;
    }
    .s-radio__input .s-radio__original{
        display: none;
    }
    .s-radio__input.is-checked .s-radio__inner{
        border-color: #0275ce;
        background:-moz-linear-gradient(bottom,#02f2ff,#0275ce);/*Mozilla*/
        background:-webkit-gradient(linear,0 50%,100% 50%,from(#02f2ff),to(#0275ce));/*Old gradient for webkit*/
        background:-webkit-linear-gradient(bottom,#02f2ff,#0275ce);/*new gradient for Webkit*/
        background:-o-linear-gradient(bottom,#02f2ff,#0275ce); /*Opera11*/
    }
    .s-radio__input.is-disabled .s-radio__inner{
        background-color: #1f2938;
        border-color: #334357;
        cursor: not-allowed
    }
    .s-radio__input.is-disabled .s-radio__inner::after{
        cursor: not-allowed;
        background-color: #1f2938;
    }
    .s-radio__input.is-disabled .s-radio__inner + .s-radio__label{
        cursor: not-allowed;
    }
    .s-radio__input.is-disabled.is-checked .s-radio__inner{
        background: #1f2938;
        border-color: #344458;
    }
    .s-radio__input.is-disabled.is-checked .s-radio__inner::after{
        background-color: #4e627c;
    }
    .s-radio__input.is-disabled + .s-radio__label{
        color: #bbb;
        cursor: not-allowed;
    }
    .s-radio__input.is-checked .s-radio__inner::after{
        -ms-transform: translate(-50%, -50%) scale(1);
        transform: translate(-50%, -50%) scale(1);
    }
    .s-radio__label{
        font-size: 14px;
        padding-left: 5px;
        vertical-align: middle;
    }
    .s-radio-group{
        display: inline-block;
        font-size: 0;
        line-height: 1;
    }
    .s-radio-button{
        position: relative;
        display: inline-block;
    }
    .s-radio-button:first-child .s-radio-button__inner{
        border-left: 1px solid rgb(191, 203, 217);
        border-radius: 4px 0 0 4px;
        box-shadow: none !important;
    }
    .s-radio-button:last-child .s-radio-button__inner{
        border-radius: 0 4px 4px 0;
    }
    .s-radio-button__inner{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        background: #fff;
        border: 1px solid rgb(191, 203, 217);
        border-left: 0;
        color: #e5f5fa;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        position: relative;
        cursor: pointer;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 0;
    }
    .s-radio-button__inner:hover{
        color: #0275ce;
    }
    .s-radio-button__inner [class*="s-icon-"]{
        line-height: 0.9;
    }
    .s-radio-button__inner [class*="s-icon-"] + span{
        margin-left: 5px;
    }
    .s-radio-button__orig-radio{
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        left: -999px;
    }
    .s-radio-button__orig-radio:checked{}
    .s-radio-button__orig-radio:checked + .s-radio-button__inner{
        color: #fff;
        background:-moz-linear-gradient(bottom,#02f2ff,#0275ce);/*Mozilla*/
        background:-webkit-gradient(linear,0 50%,100% 50%,from(#02f2ff),to(#0275ce));/*Old gradient for webkit*/
        background:-webkit-linear-gradient(bottom,#02f2ff,#0275ce);/*new gradient for Webkit*/
        background:-o-linear-gradient(bottom,#02f2ff,#0275ce); /*Opera11*/
        border-color: #0275ce;
        box-shadow: -1px 0 0 0 #0275ce;
    }
    .s-radio-button__orig-radio:disabled{}
    .s-radio-button__orig-radio:disabled + .s-radio-button__inner{
        color: rgb(191, 203, 217);
        cursor: not-allowed;
        background-image: none;
        background-color: #1f2938;
        border-color: #334357;
    }
    .s-radio-button--large{}
    .s-radio-button--large .s-radio-button__inner{
        padding: 11px 19px;
        font-size: 16px;
        border-radius: 0;
    }
    .s-radio-button--small{}
    .s-radio-button--small .s-radio-button__inner{
        padding: 7px 9px;
        font-size: 12px;
        border-radius: 0;
    }
    .s-radio-button--mini{}
    .s-radio-button--mini .s-radio-button__inner{
        padding: 4px 4px;
        font-size: 12px;
        border-radius: 0;
    }


</style>
