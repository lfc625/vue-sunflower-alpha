<script>
  import sPager from './Pager';
  import sSelect from '../select/Select';
  import sOption from '../select/Option';
  import Locale from '../extra/mixins/locale';

  export default {
    name: 'sPagination',

    data() {
      return {
        internalCurrentPage: 1,
        internalPageSize: 0
      };
    },

    props: {
      pageSize: {
        type: Number,
        default: 10
      },

      small: Boolean,

      total: Number,

      pageCount: Number,

      currentPage: {
        type: Number,
        default: 1
      },

      layout: {
        default: 'prev, pager, next, jumper, ->, total'
      },

      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 40, 50, 100];
        }
      },

      infinite: {
        type: Boolean,
        default: false
      },

      hasNext: {
        type: Boolean,
        default: true
      }
    },

    render(h) {
      let template = <div class='s-pagination'></div>;
      const layout = this.infinite ? 'sizes, prev, pager, next' : (this.layout || '');
      if (!layout) return;
      const TEMPLATE_MAP = {
            prev: <prev></prev>,
        jumper: <jumper></jumper>,
      pager: <s-pager currentPage={ this.internalCurrentPage } pageCount={ this.internalPageCount } infinite={ this.infinite } hasNext={ this.hasNext } showAnotherPage={ this.showAnotherPage } on-change={ this.handleCurrentChange }></s-pager>,
        next: <next></next>,
        sizes: <sizes pageSizes={ this.pageSizes }></sizes>,
        slot: <my-slot></my-slot>,
        total: <total></total>
    };
      const components = layout.split(',').map((item) => item.trim());
      const rightWrapper = <div class="s-pagination__rightwrapper"></div>;
      let haveRightWrapper = false;

      if (this.small) {
        template.data.class += ' s-pagination--small';
      }

      components.forEach(compo => {
        if (compo === '->') {
          haveRightWrapper = true;
          return;
        }

        if (!haveRightWrapper) {
          template.children.push(TEMPLATE_MAP[compo]);
        } else {
          rightWrapper.children.push(TEMPLATE_MAP[compo]);
        }
      });

      if (haveRightWrapper) {
        template.children.push(rightWrapper);
      }

      return template;
    },

    components: {
      MySlot: {
        render(h) {
          return (
            this.$parent.$slots.default
              ? this.$parent.$slots.default[0]
              : ''
          );
        }
      },
      Prev: {
        render(h) {
          return (
            <button
          type="button"
        class={['btn-prev', { disabled: this.$parent.internalCurrentPage <= 1 }]}
          on-click={ this.$parent.prev }>
          上一页
          </button>
        );
        }
      },

      Next: {
        render(h) {
          let nextDisable = false;
          if (this.$parent.infinite) {
            if (!this.$parent.hasNext && this.$parent.internalCurrentPage === this.$parent.internalPageCount) {
              nextDisable = true;
            }
          } else {
            if (this.$parent.internalCurrentPage === this.$parent.internalPageCount) {
              nextDisable = true;
            }
          }
          return (
            <button
          type="button"
        class={[
            'btn-next',
          { disabled: nextDisable || this.$parent.internalPageCount === 0 }
        ]}
          on-click={ this.$parent.next }>
          下一页
          </button>
        );
        }
      },

      Sizes: {
        mixins: [Locale],

        props: {
          pageSizes: Array,
        },

        watch: {
          pageSizes: {
            immediate: true,
            handler(value) {
              if (Array.isArray(value)) {
                this.$parent.internalPageSize = value.indexOf(this.$parent.pageSize) > -1
                  ? this.$parent.pageSize
                  : this.pageSizes[0];
              }
            }
          }
        },

        render(h) {
          if(this.$parent.infinite){
            return (
              <span class="s-pagination__sizes">
                  显示 <s-select
                value={ this.$parent.internalPageSize }
                on-input={ this.handleChange }>
                {
                  this.pageSizes.map(item =>
                  <s-option
                  value={ item }
                  label={ item + ' ' + this.t('s.pagination.pagesize') }>
                    </s-option>
                )
                }
              </s-select> 条
              </span>
            );
          }
          return (
            <span class="s-pagination__sizes">
              显示 <s-select
              value={ this.$parent.internalPageSize }
              on-input={ this.handleChange }>
              {
                this.pageSizes.map(item =>
                    <s-option
                    value={ item }
                    label={ item + ' ' + this.t('s.pagination.pagesize') }>
                      </s-option>
                  )
              }
            </s-select> 条，共<span>{ this.$parent.total }</span>条
            </span>
          );
        },

        components: {
          sSelect,
          sOption
        },

        methods: {
          handleChange(val) {
            if (val !== this.$parent.internalPageSize) {
              this.$parent.internalPageSize = val = parseInt(val, 10);
              this.$parent.$emit('size-change', val);
            }
          }
        }
      },

      Jumper: {
        mixins: [Locale],

        data() {
          return {
            oldValue: null
          };
        },

        methods: {
          handleFocus(event) {
            this.oldValue = event.target.value;
          },

          handleChange({ target }) {
            this.$parent.internalCurrentPage = this.$parent.getValidCurrentPage(target.value);
            this.oldValue = null;
          }
        },

        render(h) {
          return (
            <span class="s-pagination__jump">
            { this.t('s.pagination.goto') }
        <input
        class="s-pagination__editor"
          type="number"
          min={ 1 }
          max={ this.internalPageCount }
          domProps-value={ this.$parent.internalCurrentPage }
          on-change={ this.handleChange }
          on-focus={ this.handleFocus }
          style={{ width: '30px' }}
          number/>
          { this.t('s.pagination.pageClassifier') }
        </span>
        );
        }
      },

      Total: {
        mixins: [Locale],

        render(h) {
          return (
              typeof this.$parent.total === 'number'
                ? '' : ''
        );
        }
      },

      sPager
    },

    methods: {
      handleCurrentChange(val) {
        this.internalCurrentPage = this.getValidCurrentPage(val);
      },

      prev() {
        const newVal = this.internalCurrentPage - 1;
        this.internalCurrentPage = this.getValidCurrentPage(newVal);
      },

      next() {
        const newVal = this.internalCurrentPage + 1;
        this.internalCurrentPage = this.getValidCurrentPage(newVal);
      },

      getValidCurrentPage(value) {
        value = parseInt(value, 10);

        const havePageCount = typeof this.internalPageCount === 'number';

        let resetValue;
        if (!havePageCount) {
          if (isNaN(value) || value < 1) resetValue = 1;
        } else {
          if (value < 1) {
            resetValue = 1;
          } else if (value > this.internalPageCount) {
            resetValue = this.internalPageCount;
          }
        }

        if (resetValue === undefined && isNaN(value)) {
          resetValue = 1;
        } else if (resetValue === 0) {
          resetValue = 1;
        }

        if (this.infinite && this.hasNext && (isNaN(value) || value < 1)) {
          return 1;
        }
        return (resetValue === undefined || (this.infinite && this.hasNext)) ? value : resetValue;
      }
    },

    computed: {
      internalPageCount() {
        if (typeof this.total === 'number') {
          return Math.ceil(this.total / this.internalPageSize);
        } else if (typeof this.pageCount === 'number') {
          return this.pageCount;
        }
        return null;
      },
      showAnotherPage() {
        if (this.infinite) {
          if (this.total % this.internalPageSize !== 0) {
            return false;
          }
        }
        return true;
      }
    },

    watch: {
      currentPage: {
        immediate: true,
        handler(val) {
          this.internalCurrentPage = val;
        }
      },

      pageSize: {
        immediate: true,
        handler(val) {
          this.internalPageSize = val;
        }
      },

      internalCurrentPage(newVal, oldVal) {
        newVal = parseInt(newVal, 10);

        /* istanbul ignore if */
        if (isNaN(newVal)) {
          newVal = oldVal || 1;
        } else {
          newVal = this.getValidCurrentPage(newVal);
        }

        if (newVal !== undefined) {
          this.$nextTick(() => {
            this.internalCurrentPage = newVal;
            if (oldVal !== newVal) {
              this.$emit('current-change', this.internalCurrentPage);
            }
          });
        } else {
          this.$emit('current-change', this.internalCurrentPage);
        }
      },

      internalPageCount(newVal) {
        /* istanbul ignore if */
        if (!this.infinite) {
          const oldPage = this.internalCurrentPage;
          if (newVal > 0 && oldPage === 0) {
            this.internalCurrentPage = 1;
          } else if (oldPage > newVal) {
            this.internalCurrentPage = newVal === 0 ? 1 : newVal;
          }
        }
      }
    }
  };
</script>
<style>
  .s-pagination{
    /*white-space: nowrap;*/
    padding: 2px 5px;
    color: rgb(222, 233, 243);
    text-align: right;
  }
  .s-pagination .s-select {
    width: auto;
  }

  .s-pagination span,
  .s-pagination button {
    display: inline-block;
    font-size: 13px;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
  }

  .s-pagination .s-select .s-input{
    width: 110px;
  }

  .s-pagination .s-select .s-input input {
    padding-right: 25px;
    border-radius: 3px;
    height: 28px;
  }

  .s-pagination  button{
    border: none;
    padding: 0 6px;
    background: transparent;
  }

  .s-pagination  button:focus {
    outline: none;
  }

  .s-pagination  button:hover {
    color: rgb(22,117,203);
  }

  .s-pagination button.disabled {
    color: rgb(103, 115, 131);
    background: -moz-linear-gradient( 90deg, rgb(31,41,56) 0%, rgb(40,54,75) 100%);
    background: -webkit-linear-gradient( 90deg, rgb(31,41,56) 0%, rgb(40,54,75) 100%);
    background: -ms-linear-gradient( 90deg, rgb(31,41,56) 0%, rgb(40,54,75) 100%);
    cursor: not-allowed;
  }

  .s-pagination .btn-prev,
  .s-pagination .btn-next {
    background: center center no-repeat;
    background-size: 16px;
    background-color: transparent;
    border: 1px solid rgb(52, 68, 88);
    cursor: pointer;
    margin: 0 5px;
    color: rgb(222, 233, 243);
  }

  .s-pagination .btn-pre .s-icon,
  .s-pagination .btn-next .s-icon {
    display: block;
    font-size: 12px;
  }

  .s-pagination .btn-prev {
    border-radius: 3px;
  }

  .s-pagination .btn-next {
    border-radius:  3px;
  }

  .s-pagination--small .btn-prev,
  .s-pagination--small .btn-next,
  .s-pagination--small .s-pager li,
  .s-pagination--small .s-pager li:last-child{
    font-size: 12px;
    line-height: 22px;
    height: 22px;
    min-width: 22px;
  }

  .s-pagination--small .arrow.disabled {
    visibility: hidden;
  }

  .s-pagination--small .s-pager li{
    border-radius: 3px;
  }

  .s-pagination__sizes{
    margin: 0 10px 0 0;
    float: left;
  }

  .s-pagination__size .s-input .s-input__inner{
    font-size: 13px;
    border-color: rgb(209,219,229);
  }

  .s-pagination__size .s-input .s-input__inner :hover {
    border-color: rgb(22,117,203);
  }

  .s-pagination__sizes span{
      padding: 0 5px;
      text-align: center;
      vertical-align: baseline;
  }

  .s-pagination__jump {
    margin-left: 10px;
    vertical-align: middle;
    margin-top: -4px;
  }

  .s-pagination__total {
    margin: 0 10px;
  }

  .s-pagination__rightwrapper {
    float: right;
  }

  .s-pagination__editor{
    border: 1px solid rgb(52, 68, 88);
    border-radius: 3px;
    background: transparent;
    line-height: 18px;
    padding: 4px 2px;
    width: 30px;
    text-align: center;
    margin: 0 6px;
    box-sizing: border-box;
    transition: border .3s;
  }

  .s-pagination__editor::-webkit-inner-spin-button,
  .s-pagination__editor::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .s-pagination__editor:focus {
    outline: none;
    border-color: #30a6fd;
  }


  .s-pager {
    user-select: none;
    list-style: none;
    display: inline-block;
    vertical-align: top;
    font-size: 0;
    padding: 0;
    margin: 0;
  }

  .s-pager li {
    padding: 0 4px;
    margin: 0 5px;
    border: 1px solid rgb(52, 68, 88);
    border-radius: 3px;
    background: transparent;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
  }

  .s-pager li.btn-quicknext,
  .s-pager li.btn-quickprev {
    line-height: 28px;
    color: rgb(222, 233, 243);
  }

  .s-pager li.btn-quickprev:hover {
    cursor: pointer;
  }

  .s-pager li.btn-quicknext:hover {
    cursor: pointer;
  }

  .s-pager li.active + li {
    padding-left: 5px;
  }

  .s-pager li:hover {
    color: rgb(22,117,203);
  }

  .s-pager li.active {
    border:1px solid #30a6fd;
    border-radius: 3px;
    background-image: -moz-linear-gradient( 90deg, rgb(22,117,203) 0%, rgb(19,129,228) 100%);
    background-image: -webkit-linear-gradient( 90deg, rgb(22,117,203) 0%, rgb(19,129,228) 100%);
    background-image: -ms-linear-gradient( 90deg, rgb(22,117,203) 0%, rgb(19,129,228) 100%);
    color: rgb(222, 233, 243);
    cursor: default;
  }
  input[type=number] {
      -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
</style>