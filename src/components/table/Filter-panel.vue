<template>
  <transition name="s-zoom-in-top">
    <div class="s-table-filter" v-if="multiple" v-show="showPopper">
      <div class="s-table-filter-content">
        <s-checkbox-group class="s-table-filter-checkbox-group" v-model="filteredValue">
          <s-checkbox
            v-for="filter in filters"
            :key="filter.value"
            :label="filter.value">{{ filter.text }}</s-checkbox>
        </s-checkbox-group>
      </div>
      <div class="s-table-filter-bottom">
        <button @click="handleConfirm"
                :class="{ 'is-disabled': filteredValue.length === 0 }"
                :disabled="filteredValue.length === 0">{{ t('el.table.confirmFilter') }}</button>
        <button @click="handleReset">{{ t('el.table.resetFilter') }}</button>
      </div>
    </div>
    <div class="s-table-filter" v-else v-show="showPopper">
      <ul class="s-table-filter-list">
        <li class="s-table-filter-list-item"
            :class="{ 'is-active': filterValue === undefined || filterValue === null }"
            @click="handleSelect(null)">{{ t('el.table.clearFilter') }}</li>
        <li class="s-table-filter-list-item"
            v-for="filter in filters"
            :label="filter.value"
            :key="filter.value"
            :class="{ 'is-active': isActive(filter) }"
            @click="handleSelect(filter.value)" >{{ filter.text }}</li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popper from '../extra/utils/vue-popper';
  import { PopupManager } from '../extra/utils/popup';
  import Locale from '../extra/mixins/locale';
  import Clickoutside from '../extra/utils/clickoutside';
  import Dropdown from './dropdown';
  import {Checkbox, CheckboxGroup} from '../checkbox';

  export default {
    name: 's-table-filter-panel',
    mixins: [Popper, Locale],
    directives: {
      Clickoutside
    },
    components: {
      's-checkbox': Checkbox,
      's-checkbox-group': CheckboxGroup
    },
    props: {
      placement: {
        type: String,
        default: 'bottom-end'
      }
    },
    customRender(h) {
      return (<div class="s-table-filter">
        <div class="s-table-filter-content">
        </div>
        <div class="s-table-filter-bottom">
          <button on-click={ this.handleConfirm }>{ this.t('el.table.confirmFilter') }</button>
          <button on-click={ this.handleReset }>{ this.t('el.table.resetFilter') }</button>
        </div>
      </div>);
    },
    methods: {
      isActive(filter) {
        return filter.value === this.filterValue;
      },
      handleOutsideClick() {
        this.showPopper = false;
      },
      handleConfirm() {
        this.confirmFilter(this.filteredValue);
        this.handleOutsideClick();
      },
      handleReset() {
        this.filteredValue = [];
        this.confirmFilter(this.filteredValue);
        this.handleOutsideClick();
      },
      handleSelect(filterValue) {
        this.filterValue = filterValue;
        if ((typeof filterValue !== 'undefined') && (filterValue !== null)) {
          this.confirmFilter(this.filteredValue);
        } else {
          this.confirmFilter([]);
        }
        this.handleOutsideClick();
      },
      confirmFilter(filteredValue) {
        this.table.store.commit('filterChange', {
          column: this.column,
          values: filteredValue
        });
      }
    },
    data() {
      return {
        table: null,
        cell: null,
        column: null
      };
    },
    computed: {
      filters() {
        return this.column && this.column.filters;
      },
      filterValue: {
        get() {
          return (this.column.filteredValue || [])[0];
        },
        set(value) {
          if (this.filteredValue) {
            if ((typeof value !== 'undefined') && (value !== null)) {
              this.filteredValue.splice(0, 1, value);
            } else {
              this.filteredValue.splice(0, 1);
            }
          }
        }
      },
      filteredValue: {
        get() {
          if (this.column) {
            return this.column.filteredValue || [];
          }
          return [];
        },
        set(value) {
          if (this.column) {
            this.column.filteredValue = value;
          }
        }
      },
      multiple() {
        if (this.column) {
          return this.column.filterMultiple;
        }
        return true;
      }
    },
    mounted() {
      this.popperElm = this.$el;
      this.referenceElm = this.cell;
      this.table.bodyWrapper.addEventListener('scroll', () => {
        this.updatePopper();
      });
      this.$watch('showPopper', (value) => {
        if (this.column) this.column.filterOpened = value;
        if (value) {
          Dropdown.open(this);
        } else {
          Dropdown.close(this);
        }
      });
    },
    watch: {
      showPopper(val) {
        if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < PopupManager.zIndex) {
          this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
        }
      }
    }
  };
</script>