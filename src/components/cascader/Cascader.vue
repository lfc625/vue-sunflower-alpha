<template>
  <span
    class="s-cascader"
    :class="[
      {
        'is-opened': menuVisible,
        'is-disabled': disabled
      },
      size ? 's-cascader-' + size : ''
    ]"
    @click="handleClick"
    @mouseenter="inputHover = true"
    @mouseleave="inputHover = false"
    ref="reference"
    v-clickoutside="handleClickoutside"
  >
    <s-input
      ref="input"
      :readonly="!filterable"
      :placeholder="currentLabels.length ? undefined : placeholder"
      v-model="inputValue"
      @change="debouncedInputChange"
      :validate-event="false"
      :size="size"
      :disabled="disabled"
    >
      <template slot="icon">
        <i
          key="1"
          v-if="clearable && inputHover && currentLabels.length"
          class="s-input-icon s-icon-circle-close s-cascader-clearIcon"
          @click="clearValue"
        ></i>
        <i
          key="2"
          v-else
          class="iconfont
          icon-bottom"
          :class="[{'is-reverse': menuVisible}]"></i>
      </template>
    </s-input>
    <span class="s-cascader-label" v-show="inputValue === ''">
      <template v-if="showAllLevels">
        <template v-for="(label, index) in currentLabels">
          {{ label }}
          <span v-if="index < currentLabels.length - 1"> / </span>
        </template>
      </template>
      <template v-else>
        {{ currentLabels[currentLabels.length - 1] }}
      </template>
    </span>
  </span>
</template>

<script>
  import Vue from 'vue';
  import CascaderMenu from './Cascader-menu';
  import SInput from '../input';
  import Popper from '../extra/utils/vue-popper';
  import Clickoutside from '../extra/utils/clickoutside';
  import emitter from '../extra/mixins/emitter';
  import Locale from '../extra/mixins/locale';
  import {t} from '../extra/locale';
  import debounce from 'throttle-debounce/debounce';

  const popperMixin = {
    props: {
      placement: {
        type: String,
        default: 'bottom-start'
      },
      appendToBody: Popper.props.appendToBody,
      offset: Popper.props.offset,
      boundariesPadding: Popper.props.boundariesPadding,
      popperOptions: Popper.props.popperOptions
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
  };

  export default {
    name: 's-cascader',

    directives: {Clickoutside},

    mixins: [popperMixin, emitter, Locale],

    components: {
      SInput
    },

    props: {
      options: {
        type: Array,
        required: true
      },
      props: {
        type: Object,
        default() {
          return {
            children: 'children',
            label: 'label',
            value: 'value',
            disabled: 'disabled'
          };
        }
      },
      value: {
        type: Array,
        default() {
          return [];
        }
      },
      placeholder: {
        type: String,
        default() {
          return t('el.cascader.placeholder');
        }
      },
      disabled: Boolean,
      clearable: {
        type: Boolean,
        default: false
      },
      changeOnSelect: Boolean,
      popperClass: String,
      expandTrigger: {
        type: String,
        default: 'click'
      },
      filterable: Boolean,
      size: String,
      showAllLevels: {
        type: Boolean,
        default: true
      },
      debounce: {
        type: Number,
        default: 300
      }
    },

    data() {
      return {
        currentValue: this.value,
        menu: null,
        debouncedInputChange() {
        },
        menuVisible: false,
        inputHover: false,
        inputValue: '',
        flatOptions: null
      };
    },

    computed: {
      labelKey() {
        return this.props.label || 'label';
      },
      valueKey() {
        return this.props.value || 'value';
      },
      childrenKey() {
        return this.props.children || 'children';
      },
      currentLabels() {
        let options = this.options;
        let labels = [];
        this.currentValue.forEach(value => {
          const targetOption = options && options.filter(option => option[this.valueKey] === value)[0];
          if (targetOption) {
            labels.push(targetOption[this.labelKey]);
            options = targetOption[this.childrenKey];
          }
        });
        return labels;
      }
    },

    watch: {
      menuVisible(value) {
        value ? this.showMenu() : this.hideMenu();
      },
      value(value) {
        this.currentValue = value;
      },
      currentValue(value) {
        this.dispatch('SFormItem', 'el.form.change', [value]);
      },
      options: {
        deep: true,
        handler(value) {
          if (!this.menu) {
            this.initMenu();
          }
          this.flatOptions = this.flattenOptions(this.options);
          this.menu.options = value;
        }
      }
    },

    methods: {
      initMenu() {
        this.menu = new Vue(CascaderMenu).$mount();
        this.menu.options = this.options;
        this.menu.props = this.props;
        this.menu.expandTrigger = this.expandTrigger;
        this.menu.changeOnSelect = this.changeOnSelect;
        this.menu.popperClass = this.popperClass;
        this.popperElm = this.menu.$el;
        this.menu.$on('pick', this.handlePick);
        this.menu.$on('activeItemChange', this.handleActiveItemChange);
        this.menu.$on('menuLeave', this.doDestroy);
      },
      showMenu() {
        if (!this.menu) {
          this.initMenu();
        }

        this.menu.value = this.currentValue.slice(0);
        this.menu.visible = true;
        this.menu.options = this.options;
        this.$nextTick(_ => {
          this.updatePopper();
          this.menu.inputWidth = this.$refs.input.$el.offsetWidth - 2;
        });
      },
      hideMenu() {
        this.inputValue = '';
        this.menu.visible = false;
      },
      handleActiveItemChange(value) {
        this.$nextTick(_ => {
          this.updatePopper();
        });
        this.$emit('active-item-change', value);
      },
      handlePick(value, close = true) {
        this.currentValue = value;
        this.$emit('input', value);
        this.$emit('change', value);

        if (close) {
          this.menuVisible = false;
        }
      },
      handleInputChange(value) {
        if (!this.menuVisible) return;
        const flatOptions = this.flatOptions;

        if (!value) {
          this.menu.options = this.options;
          return;
        }

        let filteredFlatOptions = flatOptions.filter(optionsStack => {
          return optionsStack.some(option => new RegExp(value, 'i').test(option[this.labelKey]));
        });

        if (filteredFlatOptions.length > 0) {
          filteredFlatOptions = filteredFlatOptions.map(optionStack => {
            return {
              __IS__FLAT__OPTIONS: true,
              value: optionStack.map(item => item[this.valueKey]),
              label: this.renderFilteredOptionLabel(value, optionStack)
            };
          });
        } else {
          filteredFlatOptions = [{
            __IS__FLAT__OPTIONS: true,
            label: this.t('EL.cascader.noMatch'),
            value: '',
            disabled: true
          }];
        }
        this.menu.options = filteredFlatOptions;
      },
      renderFilteredOptionLabel(inputValue, optionsStack) {
        return optionsStack.map((option, index) => {
          const label = option[this.labelKey];
          const keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
          const labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
          const node = keywordIndex > -1 ? this.highlightKeyword(label, labelPart) : label;
          return index === 0 ? node : [' / ', node];
        });
      },
      highlightKeyword(label, keyword) {
        const h = this._c;
        return label.split(keyword)
          .map((node, index) => index === 0 ? node : [
            h('span', {class: {'s-cascader-menu__item-keyword': true}}, [this._v(keyword)]),
            node
          ]);
      },
      flattenOptions(options, ancestor = []) {
        let flatOptions = [];
        options.forEach((option) => {
          const optionsStack = ancestor.concat(option);
          if (!option[this.childrenKey]) {
            flatOptions.push(optionsStack);
          } else {
            if (this.changeOnSelect) {
              flatOptions.push(optionsStack);
            }
            flatOptions = flatOptions.concat(this.flattenOptions(option[this.childrenKey], optionsStack));
          }
        });
        return flatOptions;
      },
      clearValue(ev) {
        ev.stopPropagation();
        this.handlePick([], true);
      },
      handleClickoutside() {
        this.menuVisible = false;
      },
      handleClick() {
        if (this.disabled) return;
        if (this.filterable) {
          this.menuVisible = true;
          return;
        }
        this.menuVisible = !this.menuVisible;
      }
    },

    created() {
      this.debouncedInputChange = debounce(this.debounce, value => {
        this.handleInputChange(value);
      });
    },

    mounted() {
      this.flatOptions = this.flattenOptions(this.options);
    }
  };
</script>
<style>
  .s-cascader {
    display: inline-block;
    position: relative;
    background-color: transparent;
  }

  .s-cascader .s-input, .s-cascader .s-input-inner {
    cursor: pointer;
    background-color: transparent;
    border-color: rgb(52, 68, 88);
    color: rgb(52, 68, 88);
    z-index: 1;
    outline: none;
  }

  .s-cascader .s-input, .s-cascader .s-input-inner:focus {
    border-color: rgb(52, 68, 88);
  }

  .s-cascader .iconfont {
    position: absolute;
    right: 0;
    top: 0;
    width: 35px;
    height: 100%;
    line-height: 36px;
    text-align: center;
    transition: none
  }

  .s-cascader .icon-bottom {
    transition: transform .3s
  }

  .s-cascader .icon-bottom.is-reverse {
    transform: rotate(180deg)
  }

  .s-cascader-label {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    line-height: 34px;
    padding: 0 25px 0 10px;
    color: rgb(229, 245, 250);
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    text-align: left
  }

  .s-cascader-label span {
    color: #97a8be
  }

  .s-cascader-large {
    font-size: 16px
  }

  .s-cascader-large .s-cascader-label {
    line-height: 40px
  }

  .s-cascader-small {
    font-size: 13px
  }

  .s-cascader-small .s-cascader-label {
    line-height: 28px
  }

  .s-cascader-menus {
    white-space: nowrap;
    background: #fff;
    position: absolute;
    margin: 5px 0;
    z-index: 2;
    border: 1px solid rgb(52, 68, 88);
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .s-cascader-menu {
    display: inline-block;
    vertical-align: top;
    height: 204px;
    overflow: auto;
    border-right: 1px solid rgb(52, 68, 88);
    background: #000009;
    box-sizing: border-box;
    margin: 0;
    padding: 6px 0;
    min-width: 160px
  }

  .s-cascader-menu:last-child {
    border-right: 0
  }

  .s-cascader-menu__item {
    font-size: 14px;
    padding: 8px 30px 8px 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(183, 196, 202);
    height: 36px;
    line-height: 1.5;
    box-sizing: border-box;
    cursor: pointer;
  }

  .s-cascader-menu__item.iconfont.icon-right:before {
    position: absolute;
    right: 5px;
  }

  .s-cascader-menu__item:hover {
    background: rgb(0, 112, 178);
  }

  .s-cascader-menu__item.selected {
    color: #fff;
    background-color: #20a0ff
  }

  .s-cascader-menu__item.selected.hover {
    background-color: #1c8de0
  }

  .s-cascader-menu__item.is-active {
    box-sizing: border-box;
    line-height: 1.4;
    background: rgba(19, 129, 228, 0.4);
    border: solid 1px rgb(32, 109, 170);
  }

  .s-cascader-menu__item.is-active:hover {
    box-sizing: border-box;
    line-height: 1.4;
    background: rgb(0, 112, 178);
    border: solid 1px rgb(32, 109, 170);
  }

  .s-cascader-menu__item.is-disabled {
    color: rgb(103, 115, 131);
    cursor: not-allowed;
  }

  .s-cascader-menu__item.is-disabled:hover {
    background: rgb(31, 57, 81);
  }

  .s-cascader-menu__item-keyword {
    font-weight: 700
  }

  .s-cascader-menu__item-extensible:after {
    font-family: element-icons;
    content: "\E606";
    font-size: 12px;
    transform: scale(.8);
    color: #bfcbd9;
    position: absolute;
    right: 10px;
    margin-top: 1px
  }

  .s-cascader-menu-flexible {
    height: auto;
    max-height: 180px;
    overflow: auto
  }

  .s-cascader-menu-flexible .s-cascader-menu__item {
    overflow: visible
  }

  .s-cascader-menu__item-label {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }


</style>
