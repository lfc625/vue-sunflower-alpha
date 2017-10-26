<template>
    <div class="s-tree" :class="{ 's-tree-highlight-current': highlightCurrent }">
        <s-tree-node
                v-for="child in root.childNodes"
                :node="child"
                :props="props"
                :key="getNodeKey(child)"
                :render-content="renderContent"
                :highlight-current="highlightCurrent"
                @node-expand="handleNodeExpand">
        </s-tree-node>
        <div class="s-tree-empty-block" v-if="!root.childNodes || root.childNodes.length === 0">
            <span class="s-tree-empty-text">{{ emptyText }}</span>
        </div>
    </div>
</template>

<script>
  import TreeStore from './model/tree-store';
  import {t} from '../extra/locale';
  import emitter from '../extra/mixins/emitter';
  import sTreeNode from './Tree-node';

  export default {
    name: 's-tree',

    mixins: [emitter],

    components: {
      sTreeNode
    },

    data() {
      return {
        store: null,
        root: null,
        currentNode: null
      };
    },

    props: {
      data: {
        type: Array
      },
      emptyText: {
        type: String,
        default() {
          return t('el.tree.emptyText');
        }
      },
      nodeKey: String,
      checkStrictly: Boolean,
      defaultExpandAll: Boolean,
      expandOnClickNode: {
        type: Boolean,
        default: true
      },
      autoExpandParent: {
        type: Boolean,
        default: true
      },
      defaultCheckedKeys: Array,
      defaultExpandedKeys: Array,
      renderContent: Function,
      showCheckbox: {
        type: Boolean,
        default: false
      },
      props: {
        default() {
          return {
            children: 'children',
            label: 'label',
            icon: 'icon'
          };
        }
      },
      lazy: {
        type: Boolean,
        default: false
      },
      highlightCurrent: {
        type: Boolean,
        default: false
      },
      currentNodeKey: [String, Number],
      load: Function,
      filterNodeMethod: Function,
      accordion: Boolean,
      indent: {
        type: Number,
        default: 16
      }
    },

    computed: {
      children: {
        set(value) {
          this.data = value;
        },
        get() {
          return this.data;
        }
      }
    },

    watch: {
      defaultCheckedKeys(newVal) {
        this.store.defaultCheckedKeys = newVal;
        this.store.setDefaultCheckedKey(newVal);
      },
      defaultExpandedKeys(newVal) {
        this.store.defaultExpandedKeys = newVal;
        this.store.setDefaultExpandedKeys(newVal);
      },
      currentNodeKey(newVal) {
        this.store.setCurrentNodeKey(newVal);
        this.store.currentNodeKey = newVal;
      },
      data(newVal) {
        this.store.setData(newVal);
      }
    },

    methods: {
      filter(value) {
        if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
        this.store.filter(value);
      },
      getNodeKey(node, index) {
        const nodeKey = this.nodeKey;
        if (nodeKey && node) {
          return node.data[nodeKey];
        }
        return index;
      },
      getCheckedNodes(leafOnly) {
        return this.store.getCheckedNodes(leafOnly);
      },
      getCheckedKeys(leafOnly) {
        return this.store.getCheckedKeys(leafOnly);
      },
      setCheckedNodes(nodes, leafOnly) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedNodes(nodes, leafOnly);
      },
      setCheckedKeys(keys, leafOnly) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedKeys(keys, leafOnly);
      },
      setChecked(data, checked, deep) {
        this.store.setChecked(data, checked, deep);
      },
      handleNodeExpand(nodeData, node, instance) {
        this.broadcast('STreeNode', 'tree-node-expand', node);
        this.$emit('node-expand', nodeData, node, instance);
      }
    },

    created() {
      this.isTree = true;

      this.store = new TreeStore({
        key: this.nodeKey,
        data: this.data,
        lazy: this.lazy,
        props: this.props,
        load: this.load,
        currentNodeKey: this.currentNodeKey,
        checkStrictly: this.checkStrictly,
        defaultCheckedKeys: this.defaultCheckedKeys,
        defaultExpandedKeys: this.defaultExpandedKeys,
        autoExpandParent: this.autoExpandParent,
        defaultExpandAll: this.defaultExpandAll,
        filterNodeMethod: this.filterNodeMethod
      });

      this.root = this.store.root;
    }
  };
</script>

<style>

    .s-tree {
        cursor: default;
    }

    .s-tree-empty-block {
        position: relative;
        min-height: 60px;
        text-align: center;
        width: 100%;
        height: 100%
    }

    .s-tree-empty-text {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: rgb(222, 233, 243);
    }

    .s-tree-node {
        white-space: nowrap
    }

    .s-tree-node > .s-tree-node-children {
        overflow: hidden;
        background-color: transparent
    }

    .s-tree-node.is-expanded > .s-tree-node-children {
        display: block
    }

    .s-tree-node-content {
        box-sizing: border-box;
        line-height: 36px;
        height: 36px;
        padding-right: 1px;
        cursor: pointer
    }

    .s-tree-node-content > .el-checkbox, .s-tree-node-content > .s-tree-node-expand-icon {
        margin-right: 8px
    }

    .s-tree-node-content > .el-checkbox {
        vertical-align: middle
    }

    .s-tree-node-content:hover {
        line-height: 34px;
        padding-right: 0;
        border: solid 1px rgba(49, 170, 255, 0.5);
        border-radius: 3px;
        background-color: rgba(20, 87, 151, 0.09);
        box-shadow: 0 0 10px rgba(49, 170, 255, 0.12) inset;
    }

    .s-tree-node.is-current > .s-tree-node-content {
        line-height: 34px;
        padding-right: 0;
        border: solid 1px rgba(49, 170, 255, 0.5);
        border-radius: 3px;
        background-color: rgba(20, 87, 151, 0.3);
        box-shadow: 0 0 10px rgba(49, 170, 255, 0.4) inset;
    }

    .s-tree-node-content:hover > .s-tree-node-expand-icon {
        margin-left: 9px;
    }
    .s-tree-node-content>span>span:first-child{
        color: rgb(222, 233, 243);
    }

    .s-tree-node-expand-icon {
        display: inline-block;
        cursor: pointer;
        width: 0;
        height: 0;
        vertical-align: middle;
        margin-left: 10px;
        border: 6px solid transparent;
        border-right-width: 0;
        border-left-color: rgb(29, 80, 132);
        border-left-width: 7px;
        transform: rotate(0deg);
        transition: transform .3s ease-in-out
    }

    .s-tree-node-expand-icon:hover {
        border-left-color: #999
    }

    .s-tree-node-expand-icon.expanded {
        transform: rotate(90deg)
    }

    .s-tree-node-expand-icon.is-leaf {
        border-color: transparent;
        cursor: default
    }

    .s-tree-node-label, .s-tree-node-loading-icon {
        font-size: 14px;
        vertical-align: middle;
        display: inline-block;
        color: rgb(222, 233, 243);
    }

    .s-tree-node-loading-icon {
        margin-right: 4px;
        color: #97a8be
    }
</style>
