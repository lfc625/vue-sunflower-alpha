<template>
  <div class="s-table"
       :class="{
      's-table-fit': fit,
      's-table-striped': stripe,
      's-table-border': border,
      's-table-fluid-height': maxHeight,
      's-table-enable-row-hover': !store.states.isComplex,
      's-table-enable-row-transition': true || (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
    }"
       @mouseleave="handleMouseLeave($event)">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div class="s-table-header-wrapper" ref="headerWrapper" v-if="showHeader">
      <table-header
        :store="store"
        :layout="layout"
        :border="border"
        :default-sort="defaultSort"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }">
      </table-header>
    </div>
    <div
            class="s-table-body-wrapper"
            ref="bodyWrapper"
            :style="[bodyHeight]">
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :layout="layout"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{ width: bodyWidth }">
      </table-body>
      <div :style="{ width: bodyWidth }" class="s-table-empty-block" v-if="!data || data.length === 0">
        <span class="s-table-empty-text"><slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot></span>
      </div>
    </div>
    <div class="s-table-footer-wrapper" ref="footerWrapper" v-if="showSummary" v-show="data && data.length > 0">
      <table-footer
        :store="store"
        :layout="layout"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }">
      </table-footer>
    </div>
    <div class="s-table-fixed" ref="fixedWrapper"
         v-if="fixedColumns.length > 0"
         :style="[
        { width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' },
        fixedHeight
      ]">
      <div class="s-table-fixed-header-wrapper" ref="fixedHeaderWrapper" v-if="showHeader">
        <table-header
          fixed="left"
          :border="border"
          :store="store"
          :layout="layout"
          :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }"></table-header>
      </div>
      <div class="s-table-fixed-body-wrapper" ref="fixedBodyWrapper"
           :style="[
          { top: layout.headerHeight + 'px' },
          fixedBodyHeight
        ]">
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :layout="layout"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }">
        </table-body>
      </div>
      <div class="s-table-fixed-footer-wrapper" ref="fixedFooterWrapper" v-if="showSummary" v-show="data && data.length > 0">
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :layout="layout"
          :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }"></table-footer>
      </div>
    </div>
    <div class="s-table-fixed-right" ref="rightFixedWrapper"
         v-if="rightFixedColumns.length > 0"
         :style="[
        { width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' },
        { right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 1)) + 'px' : '' },
        fixedHeight
      ]">
      <div class="s-table-fixed-header-wrapper" ref="rightFixedHeaderWrapper" v-if="showHeader">
        <table-header
          fixed="right"
          :border="border"
          :store="store"
          :layout="layout"
          :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }"></table-header>
      </div>
      <div class="s-table-fixed-body-wrapper" ref="rightFixedBodyWrapper"
           :style="[
          { top: layout.headerHeight + 'px' },
          fixedBodyHeight
        ]">
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :layout="layout"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }">
        </table-body>
      </div>
      <div class="s-table-fixed-footer-wrapper" ref="rightFixedFooterWrapper" v-if="showSummary" v-show="data && data.length > 0">
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :layout="layout"
          :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }"></table-footer>
      </div>
    </div>
    <div class="s-table-fixed-right-patch"
         v-if="rightFixedColumns.length > 0"
         :style="{ width: layout.scrollY ? layout.gutterWidth + 'px' : '0', height: layout.headerHeight + 'px' }"></div>
    <div class="s-table-column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>

<script type="text/babel">
  import {Checkbox} from '../checkbox';
  import throttle from 'throttle-debounce/throttle';
  import debounce from 'throttle-debounce/debounce';
  import { addResizeListener, removeResizeListener } from '../extra/utils/resize-event';
  import Locale from '../extra/mixins/locale';
  import TableStore from './table-store';
  import TableLayout from './table-layout';
  import TableBody from './table-body';
  import TableHeader from './table-header';
  import TableFooter from './table-footer';
  import { mousewheel } from './util';
  import Scrollbar from '../scrollbar'

  let tableIdSeed = 1;
  export default {
    name: 's-table',
    mixins: [Locale],
    props: {
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },
      width: [String, Number],
      height: [String, Number],
      maxHeight: [String, Number],
      fit: {
        type: Boolean,
        default: true
      },
      stripe: Boolean,
      border: Boolean,
      rowKey: [String, Function],
      context: {},
      showHeader: {
        type: Boolean,
        default: true
      },
      showSummary: Boolean,
      sumText: String,
      summaryMethod: Function,
      rowClassName: [String, Function],
      rowStyle: [Object, Function],
      highlightCurrentRow: Boolean,
      currentRowKey: [String, Number],
      emptyText: String,
      expandRowKeys: Array,
      defaultExpandAll: Boolean,
      defaultSort: Object,
      tooltipEffect: String
    },
    components: {
      TableHeader,
      TableFooter,
      TableBody,
      Checkbox,
      's-scrollbar': Scrollbar
    },
    methods: {
      setCurrentRow(row) {
        this.store.commit('setCurrentRow', row);
      },
      toggleRowSelection(row, selected) {
        this.store.toggleRowSelection(row, selected);
        this.store.updateAllSelected();
      },
      clearSelection() {
        this.store.clearSelection();
      },
      handleMouseLeave() {
        this.store.commit('setHoverRow', null);
        if (this.hoverState) this.hoverState = null;
      },
      updateScrollY() {
        this.layout.updateScrollY();
      },
      bindEvents() {
        const { headerWrapper, footerWrapper } = this.$refs;
        const refs = this.$refs;
        this.bodyWrapper.addEventListener('scroll', function() {
          if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
          if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
          if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
          if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
        });
        const scrollBodyWrapper = event => {
          const deltaX = event.deltaX;
          if (deltaX > 0) {
            this.bodyWrapper.scrollLeft += 10;
          } else {
            this.bodyWrapper.scrollLeft -= 10;
          }
        };
        if (headerWrapper) {
          mousewheel(headerWrapper, throttle(16, scrollBodyWrapper));
        }
        if (footerWrapper) {
          mousewheel(footerWrapper, throttle(16, scrollBodyWrapper));
        }
        if (this.fit) {
          this.windowResizeListener = throttle(50, () => {
            if (this.$ready) this.doLayout();
          });
          addResizeListener(this.$el, this.windowResizeListener);
        }
      },
      doLayout() {
        this.store.updateColumns();
        this.layout.update();
        this.updateScrollY();
        this.$nextTick(() => {
          if (this.height) {
            this.layout.setHeight(this.height);
          } else if (this.maxHeight) {
            this.layout.setMaxHeight(this.maxHeight);
          } else if (this.shouldUpdateHeight) {
            this.layout.updateHeight();
          }
        });
      }
    },
    created() {
      this.tableId = 's-table-' + tableIdSeed + '-';
      this.debouncedLayout = debounce(50, () => this.doLayout());
    },
    computed: {
      bodyWrapper() {
        return this.$refs.bodyWrapper;
      },
      shouldUpdateHeight() {
        return typeof this.height === 'number' ||
          this.fixedColumns.length > 0 ||
          this.rightFixedColumns.length > 0;
      },
      selection() {
        return this.store.selection;
      },
      columns() {
        return this.store.states.columns;
      },
      tableData() {
        return this.store.states.data;
      },
      fixedColumns() {
        return this.store.states.fixedColumns;
      },
      rightFixedColumns() {
        return this.store.states.rightFixedColumns;
      },
      bodyHeight() {
        let style = {};
        if (this.height) {
          style = {
            height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          style = {
            'max-height': (this.showHeader
              ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight
              : this.maxHeight - this.layout.footerHeight) + 'px'
          };
        }
        return style;
      },
      bodyWidth() {
        const { bodyWidth, scrollY, gutterWidth } = this.layout;
        return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
      },
      fixedBodyHeight() {
        let style = {};
        if (this.height) {
          style = {
            height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;
          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }
          style = {
            'max-height': maxHeight + 'px'
          };
        }
        return style;
      },
      fixedHeight() {
        let style = {};
        if (this.maxHeight) {
          style = {
            bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
          };
        } else {
          style = {
            height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
          };
        }
        return style;
      }
    },
    watch: {
      height(value) {
        this.layout.setHeight(value);
      },
      currentRowKey(newVal) {
        this.store.setCurrentRowKey(newVal);
      },
      data: {
        immediate: true,
        handler(val) {
          this.store.commit('setData', val);
        }
      },
      expandRowKeys(newVal) {
        this.store.setExpandRowKeys(newVal);
      }
    },
    destroyed() {
      if (this.windowResizeListener) removeResizeListener(this.$el, this.windowResizeListener);
    },
    mounted() {
      this.bindEvents();
      this.doLayout();
      // init filters
      this.store.states.columns.forEach(column => {
        if (column.filteredValue && column.filteredValue.length) {
          this.store.commit('filterChange', {
            column,
            values: column.filteredValue,
            silent: true
          });
        }
      });
      this.$ready = true;
    },
    data() {
      const store = new TableStore(this, {
        rowKey: this.rowKey,
        defaultExpandAll: this.defaultExpandAll
      });
      const layout = new TableLayout({
        store,
        table: this,
        fit: this.fit,
        showHeader: this.showHeader
      });
      return {
        store,
        layout,
        renderExpanded: null,
        resizeProxyVisible: false
      };
    }
  };
</script>
<style>
  .s-table {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border: 1px solid rgb(11, 38, 71);;
    font-size: 14px;
    color: rgb(255, 255, 255);
  }

  .s-table .s-tooltip.cell {
    white-space: nowrap
  }

  .s-table td,.s-table th {
    height: 40px;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative
  }

  .s-table td.is-right,.s-table th.is-right {
    text-align: right
  }

  .s-table td.is-left,.s-table th.is-left {
    text-align: left
  }

  .s-table td.is-center,.s-table th.is-center {
    text-align: center
  }

  .s-table td,.s-table th.is-leaf {
    border-bottom: 1px solid rgb(11, 38, 71);
  }

  .s-table td.gutter,.s-table th.gutter {
    width: 15px;
    border-right-width: 0;
    border-bottom-width: 0;
    padding: 0
  }

  .s-table td.is-hidden>*,.s-table th.is-hidden>* {
    visibility: hidden
  }

  .s-table:before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px
  }

  .s-table:after,.s-table:before {
    content: "";
    position: absolute;
    background-color: rgb(11, 38, 71);;
    z-index: 1
  }

  .s-table:after {
    top: 0;
    right: 0;
    width: 1px;
    height: 100%
  }

  .s-table th {
    background-color: rgba(15, 37, 63, 0.6);
    text-align: left
  }

  .s-table th,.s-table th>div {
    white-space: nowrap;
    overflow: hidden
  }

  .s-table th>div {
    display: inline-block;
    padding-left: 18px;
    padding-right: 18px;
    line-height: 40px;
    text-overflow: ellipsis
  }

  .s-table td>div,.s-table th>div {
    box-sizing: border-box
  }

  .s-table th.required>div:before {
    display: inline-block;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff4d51;
    margin-right: 5px;
    vertical-align: middle
  }

  .s-table th>.cell {
    position: relative;
    word-wrap: normal;
    text-overflow: ellipsis;
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box
  }

  .s-table th>.cell.highlight {
    color: #20a0ff
  }

  .s-table .caret-wrapper {
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    margin-top: -2px;
    width: 16px;
    height: 34px;
    overflow: visible;
    overflow: initial
  }

  .s-table .sort-caret {
    display: inline-block;
    width: 0;
    height: 0;
    border: 0;
    content: "";
    position: absolute;
    left: 3px;
    z-index: 2
  }

  .s-table .sort-caret.ascending {
    top: 11px;
    border-top: none;
    border-bottom: 5px solid #97a8be
  }

  .s-table .sort-caret.ascending,.s-table .sort-caret.descending {
    border-right: 5px solid transparent;
    border-left: 5px solid transparent
  }

  .s-table .sort-caret.descending {
    bottom: 11px;
    border-top: 5px solid #97a8be;
    border-bottom: none
  }

  .s-table .ascending .sort-caret.ascending {
    border-bottom-color: #48576a
  }

  .s-table .descending .sort-caret.descending {
    border-top-color: #48576a
  }

  .s-table td.gutter {
    width: 0
  }

  .s-table .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 24px;
    padding-left: 18px;
    padding-right: 18px
  }

  .s-table tr input[type=checkbox] {
    margin: 0
  }

  .s-table tr {
    background-color: transparent;
  }

  .s-table .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1
  }

  .s-table-empty-block {
    position: relative;
    min-height: 60px;
    text-align: center;
    width: 100%;
    height: 100%
  }

  .s-table-empty-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #5e7382
  }

  .s-table-expand-column .cell {
    padding: 0;
    text-align: center
  }

  .s-table-expand-icon {
    position: relative;
    cursor: pointer;
    color: #666;
    font-size: 12px;
    transition: transform .2s ease-in-out;
    height: 40px
  }

  .s-table-expand-icon>.s-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -8px;
    margin-top: -12px
  }

  .s-table-expand-icon-expanded {
    transform: rotate(90deg)
  }

  .s-table-expanded-cell {
    padding: 20px 50px;
  }

  .s-table-fit {
    border-right: 0;
    border-bottom: 0
  }

  .s-table-border th {
    border-bottom: 1px solid rgb(11, 38, 71);
  }

  .s-table-fixed,.s-table-fixed-right {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 1px 0 10px #31aaff;
    overflow-x: hidden;
    background-color: #000009;
  }

  .s-table-fixed-right:before,.s-table-fixed:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(11, 38, 71);;
    z-index: 4
  }

  .s-table-fixed-right-patch {
    position: absolute;
    top: -1px;
    right: 0;
    background-color: rgba(20, 87, 151, 0.09);
    border-bottom: 1px solid rgb(11, 38, 71);
  }

  .s-table-fixed-right {
    top: 0;
    left: auto;
    right: 0;
    box-shadow: -1px 0 10px #31aaff;
  }

  .s-table-fixed-right .s-table-fixed-body-wrapper,.s-table-fixed-right .s-table-fixed-header-wrapper {
    left: auto;
    right: 0
  }

  .s-table-fixed-header-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3
  }

  .s-table-fixed-header-wrapper thead div {
    background-color: transparent;
    color: rgb(138, 157, 179);
  }

  .s-table-fixed-body-wrapper {
    position: absolute;
    left: 0;
    top: 37px;
    overflow: hidden;
    z-index: 3
  }

  .s-table-body-wrapper,.s-table-header-wrapper {
    width: 100%
  }

  .s-table-body,.s-table-header {
    table-layout: fixed
  }

  .s-table-header-wrapper {
    overflow: hidden
  }

  .s-table-header-wrapper thead div {
    background-color: transparent;
    color: rgb(138, 157, 179);
  }

  .s-table-body-wrapper {
    overflow: auto;
    position: relative
  }

  .s-table-striped .s-table-body tr:nth-child(2n).current-row td {
    background-color: rgba(20, 87, 151, 0.09);
    box-shadow: inset 0px 0px 15px 2px #31aaff;
  }

  .s-table-body tr.hover-row{
    background-color: rgba(20, 87, 151, 0.09);
  }

  .s-table-body tr.current-row{
    background-color: rgba(20, 87, 151, 0.09);
    box-shadow: inset 0px 0px 15px 2px #31aaff;
  }

  .s-table-column-resize-proxy {
    position: absolute;
    left: 200px;
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid rgb(11, 38, 71);;
    z-index: 10
  }

  .s-table-column-filter-trigger {
    display: inline-block;
    line-height: 34px;
    margin-left: 5px;
    cursor: pointer
  }

  .s-table-column-filter-trigger i {
    color: #97a8be
  }

  .s-table-enable-row-transition .s-table-body td {
    transition: background-color .25s ease
  }

  .s-table-enable-row-hover tbody tr:hover>td {
    background-color: rgba(20, 87, 151, 0.09);
  }

  .s-table-enable-row-hover tbody tr:hover{
    box-shadow: inset 0px 0px 15px 2px #31aaff;
  }

  .s-table-fluid-height .s-table-fixed,.s-table-fluid-height .s-table-fixed-right {
    bottom: 0;
    overflow: hidden
  }

  .s-table th.multi-border{
    border-right: 1px solid rgb(11, 38, 71);
  }

  .s-table td .cell .cell-inner{
    line-height: 1;
    padding: 10px 0 10px;
  }

  .s-table td .cell .cell-inner:last-of-type{
    padding-top: 0;
  }

  .s-table td .cell .s-table-link{
    color: rgb(49, 170, 255);
  }

  .s-table td .cell .cell-inner .s-table-link{
    font-size: 16px;
  }

  .s-table td .cell .cell-inner-detail{
    color: rgba(222, 233, 243, 0.502);
  }
  .s-table thead .cell .iconfont{
    font-size: 14px;
    color: rgb(138, 157, 179);
  }

  .s-table tbody .cell .iconfont{
    font-size: 20px;
    color: rgb(52, 195, 242);
    margin-right: 15px;
    cursor: pointer;
  }
</style>