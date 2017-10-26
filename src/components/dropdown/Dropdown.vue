<template>
  <div
    :class="[prefixCls]"
    v-clickoutside="handleClose"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave">
    <div :class="[prefixCls + '-rel']" ref="reference" @click="handleClick"><slot></slot></div>
    <transition :name="transition">
      <Drop v-show="currentVisible" :placement="placement" ref="drop"><slot name="list"></slot></Drop>
    </transition>
  </div>
</template>

<script>
  import Drop from './Menu-dropdown';
  import clickoutside from '../extra/directives/clickoutside';
  import { oneOf } from '../extra/utils/assist';
  const prefixName = 's-dropdown';
  export default {
    name: 's-dropdown',
    directives: { clickoutside },
    components: { Drop },
    props: {
      trigger: {
        validator (value) {
          return oneOf(value, ['click', 'hover', 'custom']);
        },
        default: 'hover'
      },
      placement: {
        validator (value) {
          return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
        },
        default: 'bottom'
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      transition () {
        return ['bottom-start', 'bottom', 'bottom-end'].indexOf(this.placement) > -1 ? 'slide-up' : 'fade';
      }
    },
    data () {
      return {
        prefixCls: prefixName,
        currentVisible: this.visible
      };
    },
    watch: {
      visible (val) {
        this.currentVisible = val;
      },
      currentVisible (val) {
        if (val) {
          this.$refs.drop.update();
        } else {
          this.$refs.drop.destroy();
        }
        this.$emit('on-visible-change', val);
      }
    },
    methods: {
      handleClick () {
        if (this.trigger === 'custom') return false;
        if (this.trigger !== 'click') {
          return false;
        }
        this.currentVisible = !this.currentVisible;
      },
      handleMouseenter () {
        if (this.trigger === 'custom') return false;
        if (this.trigger !== 'hover') {
          return false;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.currentVisible = true;
        }, 250);
      },
      handleMouseleave () {
        if (this.trigger === 'custom') return false;
        if (this.trigger !== 'hover') {
          return false;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.currentVisible = false;
        }, 150);
      },
      handleClose () {
        if (this.trigger === 'custom') return false;
        if (this.trigger !== 'click') {
          return false;
        }
        this.currentVisible = false;
      },
      hasParent () {
        const $parent = this.$parent.$parent.$parent;
        if ($parent && $parent.$options.name === 'sDropdown') {
          return $parent;
        } else {
          return false;
        }
      }
    },
    mounted () {
      this.$on('on-click', (key) => {
        const $parent = this.hasParent();
        if ($parent) $parent.$emit('on-click', key);
      });
      this.$on('on-hover-click', () => {
        const $parent = this.hasParent();
        if ($parent) {
          this.$nextTick(() => {
            if (this.trigger === 'custom') return false;
            this.currentVisible = false;
          });
          $parent.$emit('on-hover-click');
        } else {
          this.$nextTick(() => {
            if (this.trigger === 'custom') return false;
            this.currentVisible = false;
          });
        }
      });
      this.$on('on-haschild-click', () => {
        this.$nextTick(() => {
          if (this.trigger === 'custom') return false;
          this.currentVisible = true;
        });
        const $parent = this.hasParent();
        if ($parent) $parent.$emit('on-haschild-click');
      });
    }
  };
</script>

<style >
.s-dropdown{
  width: 100%;
}
.s-dropdown-item{
  transition: background .2s ease-in-out;
  list-style: none;
  clear: both;
  white-space: nowrap
}
.s-dropdown{
  display: inline
}
.s-dropdown-rel{
  display: inline-block;
}
.s-dropdown .s-select-dropdown {
  overflow: visible;
  max-height: none;
  border:1px solid #206da9;
  background-color: #002847;
}
.s-dropdown-rel {
  position: relative
}

.s-dropdown-menu {
  min-width: 102px;
  padding-left: 0;
}

.s-dropdown-item {
  margin: 0;
  padding: 8px 16px;
  color: #dee9f3;
  font-size: 12px!important;
  cursor: pointer;
}
.s-dropdown-menu>.s-dropdown-item:not(:last-child){
  border-bottom: 1px solid #1f6daa;
}
.s-dropdown+.s-dropdown-item{
  border-top: 1px solid #1f6daa;
}
.s-dropdown-item .icon-right{
  color:#dee9f3;
}
.s-dropdown-item-focus,.s-dropdown-item:hover {
  background: #0070b2;
}

.s-dropdown-item-disabled {
  background: #1f3951;
  color: #677383;
  cursor: not-allowed
}

.s-dropdown-item-selected,.s-dropdown-item-selected:hover {
  color: #fff;
  background: rgba(51,153,255,.9)
}

.s-dropdown-item-selected.s-dropdown-item-focus {
  background: rgba(45,135,225,.91)
}

.s-dropdown-large .s-dropdown-item {
  padding: 7px 16px 8px;
  font-size: 14px!important
}

</style>
