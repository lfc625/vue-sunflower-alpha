<template>
    <ul class="s-select-group__wrap">
        <li class="s-select-group__title" v-show="visible">{{ label }}</li>
        <li>
            <ul class="s-select-group">
                <slot></slot>
            </ul>
        </li>
    </ul>
</template>

<script>
  import Emitter from '../extra/mixins/emitter';
  export default {
    mixins: [Emitter],
    name: 's-option-group',
    componentName: 'SOptionGroup',
    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: true
      };
    },
    watch: {
      disabled(val) {
        this.broadcast('SOption', 'handleGroupDisabled', val);
      }
    },
    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },
    created() {
      this.$on('queryChange', this.queryChange);
    },
    mounted() {
      if (this.disabled) {
        this.broadcast('SOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>

<style>
    .s-select-group {
        margin: 0;
        padding: 0
    }
    .s-select-group {
        padding-left: 20px
    }
    .s-select-group__wrap{
        list-style: none;
        margin: 0;
        padding: 0
    }
    .s-select-group__title{
        padding-left: 10px;
        font-size: 12px;
        color: #999;
        height: 30px;
        line-height: 30px
    }


</style>

