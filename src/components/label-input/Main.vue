<template>
  <div class="s-label-input" :style="groupStyle">
    <label :style="labelStyle" :class="size">{{ label }}</label>
    <div class="s-label-input-group-input" :style="inputStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'sLabelInput',
    computed: {
      groupStyle() {
        return 'width:' + this.width + 'px';
      },
      inputStyle() {
        return 'width:' + (this.width - this.labelWidth - 15) + 'px';
      },
      labelStyle() {
        return 'width:' + this.labelWidth + 'px';
      }
    },
    props: {
      label: {
        type: String
      },
      width: {
        type: Number,
        default: 200
      },
      labelWidth: {
        type: Number,
        default: 60
      },
      size: {
        type: String,
        // large small mini
        default: 'normal'
      }
    }
  }
</script>

<style>
  .s-label-input {
    display: inline-block;
    margin: 2px 8px 20px 8px;
  }

  .s-label-input label {
    display: inline-block;
    color: rgb(229, 245, 250);
    text-align: right;
    vertical-align: top;
    margin-right:10px
  }

  .s-label-input label.large {
    height: 42px;
    line-height: 42px;
    font-size: 20px;
  }

  .s-label-input label.normal {
    height: 36px;
    line-height: 36px;
    font-size: 18px;
  }

  .s-label-input label.small {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }

  .s-label-input label.mini {
    height: 22px;
    line-height: 22px;
    font-size: 14px;
  }

  .s-label-input .s-label-input-group-input {
    display: inline-block;
    vertical-align: top;
  }
</style>