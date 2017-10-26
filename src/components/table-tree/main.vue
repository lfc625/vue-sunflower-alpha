<template>
  <s-table
    ref="treeTable"
    class="s-tree-table"
    :data="treeArray"
    highlight-current-row
    @current-change="handleCurrentChange"
    @select-all="handleSelectAll"
    @selection-change="handleSelectionChange"
    :row-style="rowStyle">
    <slot name="pre"></slot>
    <s-table-column
      v-for="(value, index) in config"
      :key="value"
      :class-name="(index + 1) === treeIndex ? 's-tree-index-col' : 's-tree-noindex-col' "
      :label="value.title"
      :width="value.width">
      <template slot-scope="scope">
              <span @click="toggleChildren(scope.row)"
                    :class="'s-tree-col-icon iconfont ' + (!!scope.row.children ? (scope.row.__open ? 'icon-tree-expand' : 'icon-tree-close') : 'icon-empty')"
                    :style="'margin-left:' + (scope.row.__level * 24) + 'px'"></span>
        <div class="data-wrapper">{{ scope.row[value.property] }}</div>
      </template>
    </s-table-column>
    <slot></slot>
  </s-table>
</template>

<script type="text/babel">
  import Vue from 'vue'

  export default {
    name: 'sTableTree',
    data() {
      return {
        currentRow: null,
        treeArray: []
      }
    },
    mounted() {
      this.treeArray = this.parseTreeToArray(this.data)
    },
    watch: {
      data: {
        immediate: true,
        handler(val) {
          this.treeArray = this.parseTreeToArray(val)
        }
      }
    },
    methods: {
      parseTreeToArray(parent, level) {
        let tree = parent.children === undefined ? parent : parent.children
        let array = []
        if (!level) {
          level = 0
        }
        for (let i = 0; i < tree.length; i++) {
          Vue.set(tree[i], '__level', level)
          Vue.set(tree[i], '__show', this.defaultExpand)
          if (parent !== tree) {
            Vue.set(tree[i], '__parent', parent)
          }
          array.push(tree[i])
          if (tree[i].children) {
            Vue.set(tree[i], '__open', this.defaultExpand)
            this.parseTreeToArray(tree[i], level + 1).map(function (value) {
              array.push(value)
            })
          }
        }
        return array;
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        this.$emit('current-change', val)
      },
      toggleChildren(val) {
        val.__open = !val.__open
      },
      rowStyle(row, index) {
//         去掉根节点checkBox
//        this.$nextTick(() => {
//          if (this.$refs.treeTable.$el.querySelectorAll('.s-checkbox')[1] !== undefined) {
//            this.$refs.treeTable.$el.querySelectorAll('.s-checkbox')[index + 1].style.display = row.__parent ? 'block' : 'none';
//            this.$refs.treeTable.$el.querySelectorAll('td:last-child .cell')[index].style.display = row.__parent ? 'block' : 'none';
//            this.$refs.treeTable.$el.querySelectorAll('tr')[index + 1].style.color = row.__parent ? '#ffffff' : '#999999';
//          }
//        });
        let display = '';
        row.__show = row.__parent ? (row.__parent.__show && row.__parent.__open) : true
        display = row.__show ? '' : 'display: none;';
        return display;
      },
//      // 选中时不选根节点
      handleSelectAll(selection) {
//        let that = this;
//        that.$refs.treeTable.clearSelection(selection);
//        selection.forEach(function (row) {
//          if (row.__parent && row.__parent !== undefined) {
//            that.$refs.treeTable.toggleRowSelection(row, true);
//          } else {
//            that.$refs.treeTable.toggleRowSelection(row, false);
//          }
//        })
        this.$emit('select-all', selection)
      },
      handleSelectionChange(selection) {
        this.$emit('selection-change', selection);
      }
    },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      config: {
        type: Array,
        default: () => {
          return []
        }
      },
      treeIndex: {
        type: Number,
        default: 1
      },
      // 是否默认展开
      defaultExpand: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style>

  .s-tree-table .s-tree-noindex-col .s-tree-col-icon {
    display: none;
  }

  .s-tree-table .s-tree-index-col .cell {
    position: relative;
  }

  .s-tree-table .s-tree-index-col .cell .s-tree-col-icon {
    float: left;
    color: rgb(255, 255, 255);
  }

  .s-tree-table .s-tree-index-col .cell .s-tree-col-icon:before {
    box-sizing: border-box;
    display: block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
  }

  .s-tree-table .s-tree-index-col .cell .s-tree-col-icon.icon-empty:before {
    content: '';
  }

  .s-tree-table .s-tree-index-col .cell .data-wrapper {
    float: left;
    box-sizing: border-box;
    height: 100%;
    text-align: left;
    margin-left: 10px;
  }

  .icon-tree-close:after {
    content: '+';
  }

  .icon-tree-expand:after {
    content: '-';
  }

  .s-tree-index-col .cell span[class*='icon-tree-close'],
  .s-tree-index-col .cell span[class*='icon-tree-expand'] {
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid rgb(58, 160, 255);
    border-radius: 50%;
    background-image: -moz-linear-gradient(90deg, rgb(72, 169, 244) 0%, rgb(51, 140, 210) 2%, rgb(36, 132, 207) 5%, rgb(0, 98, 174) 23%, rgb(0, 89, 171) 38%, rgb(0, 89, 165) 51%, rgb(0, 84, 162) 65%, rgb(0, 92, 165) 76%, rgb(59, 129, 195) 95%, rgb(68, 140, 205) 100%);
    background-image: -webkit-linear-gradient(90deg, rgb(72, 169, 244) 0%, rgb(51, 140, 210) 2%, rgb(36, 132, 207) 5%, rgb(0, 98, 174) 23%, rgb(0, 89, 171) 38%, rgb(0, 89, 165) 51%, rgb(0, 84, 162) 65%, rgb(0, 92, 165) 76%, rgb(59, 129, 195) 95%, rgb(68, 140, 205) 100%);
    background-image: -ms-linear-gradient(90deg, rgb(72, 169, 244) 0%, rgb(51, 140, 210) 2%, rgb(36, 132, 207) 5%, rgb(0, 98, 174) 23%, rgb(0, 89, 171) 38%, rgb(0, 89, 165) 51%, rgb(0, 84, 162) 65%, rgb(0, 92, 165) 76%, rgb(59, 129, 195) 95%, rgb(68, 140, 205) 100%);
  }

  .s-tree-index-col .cell span[class*='icon-bottom'] + .data-wrapper,
  .s-tree-index-col .cell span[class*='icon-right'] + .data-wrapper {
    color: rgb(103, 115, 131);
  }


</style>

