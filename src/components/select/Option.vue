<template>
    <li
      @mouseenter="hoverItem"
      @click.stop="selectOptionClick"
      class="s-select-dropdown__item"
      v-show="visible"
      :class="{
      'selected': itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': parent.hoverIndex === index
    }">
        <slot>
            <span>{{ currentLabel }}</span>
        </slot>
    </li>
</template>

<script>
  import Emitter from '../extra/mixins/emitter';
  export default {
    mixins: [Emitter],
    name: 's-option',
    componentName: 'SOption',
    props: {
      value: {
        required: true
      },
      label: [String, Number],
      created: Boolean,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        index: -1,
        groupDisabled: false,
        visible: true,
        hitState: false
      };
    },
    computed: {
      currentLabel() {
        return this.label || ((typeof this.value === 'string' || typeof this.value === 'number') ? this.value : '');
      },
      currentValue() {
        return this.value || this.label || '';
      },
      parent() {
        let result = this.$parent;
        while (!result.isSelect) {
          result = result.$parent;
        }
        return result;
      },
      itemSelected() {
        if (!this.parent.multiple) {
          return this.value === this.parent.value;
        } else {
          return this.parent.value.indexOf(this.value) > -1;
        }
      },
      limitReached() {
        if (this.parent.multiple) {
          return !this.itemSelected &&
            this.parent.value.length >= this.parent.multipleLimit &&
            this.parent.multipleLimit > 0;
        } else {
          return false;
        }
      }
    },
    watch: {
      currentLabel() {
        if (!this.created && !this.parent.remote) this.dispatch('SSelect', 'setSelected');
      },
      value() {
        if (!this.created && !this.parent.remote) this.dispatch('SSelect', 'setSelected');
      }
    },
    methods: {
      handleGroupDisabled(val) {
        this.groupDisabled = val;
      },
      hoverItem() {
        if (!this.disabled && !this.groupDisabled) {
          this.parent.hoverIndex = this.parent.options.indexOf(this);
        }
      },
      selectOptionClick() {
        if (this.disabled !== true && this.groupDisabled !== true) {
          this.dispatch('SSelect', 'handleOptionClick', this);
        }
      },
      queryChange(query) {
        // query 里如果有正则中的特殊字符，需要先将这些字符转义
        let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
        this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
        if (!this.visible) {
          this.parent.filteredOptionsCount--;
        }
      },
      resetIndex() {
        this.$nextTick(() => {
          this.index = this.parent.options.indexOf(this);
        });
      }
    },
    created() {
      this.parent.options.push(this);
      this.parent.cachedOptions.push(this);
      this.parent.optionsCount++;
      this.parent.filteredOptionsCount++;
      this.index = this.parent.options.indexOf(this);
      this.$on('queryChange', this.queryChange);
      this.$on('handleGroupDisabled', this.handleGroupDisabled);
      this.$on('resetIndex', this.resetIndex);
    },
    beforeDestroy() {
      this.dispatch('SSelect', 'onOptionDestroy', this);
    }
  };
</script>

<style >
    .s-select-dropdown{
        position: absolute;
        z-index: 1001;
        border: 1px solid #344458;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        box-sizing: border-box;
        margin-top: 2px;
        padding: 0;
    }

    .s-select-dropdown.is-multiple .s-select-dropdown__item.selected{
        color: #fff;
        background: rgba(19, 129, 228, 0.4);
    }
    .s-select-dropdown.is-multiple .s-select-dropdown__item.selected.hover{
        background: rgb(0, 112, 178);
    }
    .s-select-dropdown.is-multiple .s-select-dropdown__item.selected::after{
        position: absolute;
        right: 10px;
        font-family: 'iconfont';
        content: "\e692";
        font-size: 11px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .s-select-dropdown__empty{
        padding: 10px 0;
        margin: 0;
        text-align: center;
        color: #999;
        font-size: 14px;
    }
    .s-select-dropdown__wrap{
        max-height: 274px;
    }
    .s-select-dropdown__list{
        list-style: none;
        padding: 6px 0;
        margin: 0;
        box-sizing: border-box;
        background: #000009
    }
    .s-select-dropdown__item {
        font-size: 14px;
        padding: 8px 10px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgb(183, 196, 202);
        height: 36px;
        line-height: 1.5;
        box-sizing: border-box;
        cursor: pointer
    }
    .s-select-dropdown__item.hover{
        box-sizing: border-box;
        line-height: 1.4;
        background: rgb(0, 112, 178);
        border: solid 1px rgb(32, 109, 170);
    }
    .s-select-dropdown__item.selected {
        color: #fff;
        box-sizing: border-box;
        line-height: 1.4;
        background: rgba(19, 129, 228, 0.4);
        border: solid 1px rgb(32, 109, 170);
    }
    .s-select-dropdown__item.selected.hover{
        background-color: #053b68
    }
    .s-select-dropdown__item span {
        line-height: 1.5 !important
    }
    .s-select-dropdown__item.is-disabled{
        color: rgb(191, 203, 217);
        background-color: #344458;
        cursor: not-allowed
    }
</style>
