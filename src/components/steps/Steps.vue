<template>
  <div
          class="s-steps"
          :class="['is-' + direction, center ? 'is-center' : '']">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SSteps',

    props: {
      space: {
        type: [Number, String]
      },
      current: Number,
      direction: {
        type: String,
        default: 'horizontal'
      },
      alignCenter: Boolean,
      center: Boolean,
      finishStatus: {
        type: String,
        default: 'finish'
      },
      processStatus: {
        type: String,
        default: 'process'
      },
      type:{
        type: String,
        default: 'default'
      },
      stepWidth: {
        type: [String, Number],
        default: '85px'
      }
    },

    data() {
      return {
        steps: [],
        stepOffset: 0
      };
    },

    watch: {
      current(newVal, oldVal) {
        this.$emit('change', newVal, oldVal);
      },

      steps(steps) {
        steps.forEach((child, index) => {
          child.index = index;
        });
      }
    }
  };
</script>
<style>

  .s-steps {
    font-size: 0;
  }
  .s-steps > :last-child .s-step__line {
    display: none;
  }
  .s-steps.is-horizontal {
    white-space: nowrap;
  }
  .s-steps.is-horizontal.is-center {
    text-align: center;
  }
  .s-steps.is-vertical {
    height: 100%;
  }
  .s-step {
    position: relative;
    vertical-align: top;
  }
  .s-step.is-vertical .s-step__head {
    display: inline-block;
  }
  .s-step.is-vertical .s-step__main {
    display: inline-block;
    padding-left: 10px;
  }
  .s-step.is-horizontal {
    display: inline-block;
  }
  .s-step__line {
    display: inline-block;
    position: absolute;
    border-color: inherit;
    background-color: #69819f;
  }
  .s-step__line.is-vertical {
    width: 2px;
    box-sizing: border-box;
    top: 68px;
    bottom: 8px;
    left: 30px;
  }
  .s-step__line.is-horizontal {
    top: 30px;
    height: 2px;
    left: 68px;
    right: 8px;
  }
  .s-step__line.is-icon.is-horizontal {
    right: 4px;
  }
  .s-step__line-inner {
    display: block;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    transition: all .15s;
    width: 0;
    height: 0;
  }
  .s-step__icon {
    display: block;
    line-height: 58px;
  }
  .s-step__icon > * {
    line-height: inherit;
    vertical-align: middle;
  }
  .s-step__icon i {
    font-size: 31px;
  }
  .s-step__head {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    text-align: center;
    line-height: 28px;
    font-size: 28px;
    vertical-align: top;
    transition: all 0.15s;
  }
  .s-step__head.is-finish {
    color: #0093d6;
    border-color: #04a1e9;
  }
  .s-step__head.is-error {
    color: #ff4949;
    border-color: #ff4949;
  }
  .s-step__head.is-success {
    color: #13ce66;
    border-color: #13ce66;
  }
  .s-step__head.is-process, .s-step__head.is-wait {
    color: #a4b6c3;
    border-color: #69819f;
  }
  .s-step__head.is-text {
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
  }
  .s-step__head.is-text.is-finish {
    color: #fff;
    background-color: #0070b2;
    border-color: #04a1e9;
  }
  .s-step__head.is-text.is-error {
    color: #fff;
    background-color: #ff4949;
    border-color: #ff4949;
  }
  .s-step__head.is-text.is-success {
    color: rgba(229, 245, 250, 0.6);
    background-color: #13ce66;
    border-color: #13ce66;
  }
  .s-step__head.is-text.is-wait {
    color: rgba(229, 245, 250, 0.6);
    background-color: #0b273c;
    border-color: #0b273c;
  }
  .s-step__head.is-text.is-process {
    color: #fff;
    background-color: #0093d6;
    border-color: #04a1e9;
  }
  .s-step__main {
    white-space: normal;
    padding-right: 10px;
    text-align: left;
  }
  .s-step__title {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    display: inline-block;
    white-space: nowrap;
  }
  .is-horizontal .s-step__title {
    width: 60px;
    line-height: 2.5;
    text-align: center;
  }
  .is-vertical .s-step__title {
    line-height: 60px;
    text-align: left;
  }
  .s-step__title.is-finish {
    font-weight: 700;
    color: #0070b2;
  }
  .s-step__title.is-error {
    font-weight: 700;
    color: #ff4949;
  }
  .s-step__title.is-success {
    font-weight: 700;
    color: #13ce66;
  }
  .s-step__title.is-wait {
    font-weight: 400;
    color: #a4b6c3;
  }
  .s-step__title.is-process {
    font-weight: 700;
    color: #0093d6;
  }
  .s-step__description {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
  }
  .s-step__description.is-finish {
    color: #0070b2;
  }
  .s-step__description.is-error {
    color: #ff4949;
  }
  .s-step__description.is-success {
    color: #13ce66;
  }
  .s-step__description.is-wait {
    color: #a4b6c3;
  }
  .s-step__description.is-process {
    color: #0093d6;
  }
  .s-steps .s-step.otherType {
    /*width: 85px;*/
    height: 36px;
    display: inline-block;
    margin-left: 23px;
    background-color: #0b273c;
    font-family: "Microsoft YaHei";
  }
  .s-steps .s-step.otherType:before, .s-steps .s-step.otherType:after {
    content: '';
    position: absolute;
    top: 0;
    display: block;
  }
  .s-steps .s-step.otherType:first-child {
    margin-left: 0;
  }
  .s-steps .s-step.otherType:first-child:before {
    left: -15px;
    width: 15px;
    height: 36px;
    background-color: #0b273c;
  }
  .s-steps .s-step.otherType:last-child:after {
    right: -15px;
    width: 15px;
    height: 36px;
    background-color: #0b273c;
  }
  .s-steps .s-step.otherType:not(:first-child):before {
    left: -18px;
    border-top: 18px solid #0b273c;
    border-left: 18px solid transparent;
    border-bottom: 18px solid #0b273c;
  }
  .s-steps .s-step.otherType:not(:last-child):after {
    right: -18px;
    border-left: 18px solid #0b273c;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
  }
  .s-steps .s-step.otherType.is-process {
    background-color: #0093d6;
  }
  .s-steps .s-step.otherType.is-process:first-child:before {
    background-color: #0093d6;
  }
  .s-steps .s-step.otherType.is-process:last-child:after {
    background-color: #0093d6;
  }
  .s-steps .s-step.otherType.is-process:not(:first-child):before {
    border-top-color: #0093d6;
    border-bottom-color: #0093d6;
  }
  .s-steps .s-step.otherType.is-process:not(:last-child):after {
    border-left-color: #0093d6;
  }
  .s-steps .s-step.otherType.is-finish {
    background-color: #0070b2;
  }
  .s-steps .s-step.otherType.is-finish:first-child:before {
    background-color: #0070b2;
  }
  .s-steps .s-step.otherType.is-finish:last-child:after {
    background-color: #0070b2;
  }
  .s-steps .s-step.otherType.is-finish:not(:first-child):before {
    border-top-color: #0070b2;
    border-bottom-color: #0070b2;
  }
  .s-steps .s-step.otherType.is-finish:not(:last-child):after {
    border-left-color: #0070b2;
  }
  .s-steps .s-step.otherType .s-step__head {
    width: 22px;
    height: 22px;
    display: inline-block;
    vertical-align: baseline;
    margin-left: 10px;
  }
  .s-steps .s-step.otherType .s-step__head .s-step__icon {
    line-height: 22px;
  }
  .s-steps .s-step.otherType .s-step__head .s-step__icon i {
    font-size: 16px;
  }
  .s-steps .s-step.otherType .s-step__head.is-text.is-wait {
    border-color: #206daa;
    background-color: rgba(3, 58, 112, 0.329);
  }
  .s-steps .s-step.otherType .s-step__head.is-text.is-process {
    border-color: white;
    background-color: #00a3e4;
  }
  .s-steps .s-step.otherType .s-step__head.is-text.is-finish {
    color: #fff;
    border-color: white;
    background-color: #0070b2;
  }
  .s-steps .s-step.otherType .s-step__head.is-text.is-error {
    color: #fff;
    background-color: #ff4949;
    border-color: #ff4949;
  }
  .s-steps .s-step.otherType .s-step__head.is-text.is-success {
    color: rgba(229, 245, 250, 0.6);
    background-color: #13ce66;
    border-color: #13ce66;
  }
  .s-steps .s-step.otherType .s-step__main {
    display: inline-block;
  }
  .s-steps .s-step.otherType .s-step__main .s-step__title {
    display: inline;
    margin-left: 10px;
    font-size: 12px;
    line-height: 36px;
  }
  .s-steps .s-step.otherType .s-step__main .s-step__title.is-finish, .s-steps .s-step.otherType .s-step__main .s-step__title.is-process {
    color: #fff;
    font-weight: 400;
  }
  .s-steps .s-step.otherType .s-step__main .s-step__title.is-wait {
    color: rgba(229, 245, 250, 0.6);
  }
</style>
