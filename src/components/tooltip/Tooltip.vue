<script>
  import Popper from '../extra/utils/vue-popper';
  import debounce from 'throttle-debounce/debounce';
  import {getFirstComponentChild} from '../extra/utils/vdom';
  import Vue from 'vue';

  export default {
    name: 's-tooltip',

    mixins: [Popper],

    props: {
      openDelay: {
        type: Number,
        default: 0
      },
      disabled: Boolean,
      manual: Boolean,
      effect: {
        type: String,
        default: 'dark'
      },
      popperClass: String,
      content: String,
      visibleArrow: {
        default: true
      },
      transition: {
        type: String,
        default: 'fade-in-linear'
      },
      popperOptions: {
        default() {
          return {
            boundariesPadding: 10,
            gpuAcceleration: false
          };
        }
      },
      enterable: {
        type: Boolean,
        default: true
      }
    },

    beforeCreate() {
      if (this.$isServer) return;

      this.popperVM = new Vue({
        data: { node: '' },
        render(h) {
          return this.node;
        }
      }).$mount();

      this.debounceClose = debounce(200, () => this.handleClosePopper());
    },

    render(h) {
      if (this.popperVM) {
        this.popperVM.node = (
          <transition
        name={ this.transition }
        onAfterLeave={ this.doDestroy }>
      <div
        onMouseleave={ () => { this.setExpectedState(false); this.debounceClose(); } }
        onMouseenter= { () => { this.setExpectedState(true); } }
        ref="popper"
        v-show={!this.disabled && this.showPopper}
      class={
          ['s-tooltip__popper', 'is-' + this.effect, this.popperClass]
      }>
        { this.$slots.content || this.content }
      </div>
        </transition>);
      }

      if (!this.$slots.default || !this.$slots.default.length) return this.$slots.default;

      const vnode = getFirstComponentChild(this.$slots.default);
      if (!vnode) return vnode;
      const data = vnode.data = vnode.data || {};
      const on = vnode.data.on = vnode.data.on || {};

      on.mouseenter = this.addEventHandle(on.mouseenter, () => { this.setExpectedState(true); this.handleShowPopper(); });
      on.mouseleave = this.addEventHandle(on.mouseleave, () => { this.setExpectedState(false); this.debounceClose(); });
      data.staticClass = this.concatClass(data.staticClass, 's-tooltip');

      return vnode;
    },

    mounted() {
      this.referenceElm = this.$el;
    },

    methods: {
      addEventHandle(old, fn) {
        return old ? Array.isArray(old) ? old.concat(fn) : [old, fn] : fn;
      },

      concatClass(a, b) {
        if (a && a.indexOf(b) > -1) return a;
        return a ? b ? (a + ' ' + b) : a : (b || '');
      },

      handleShowPopper() {
        if (!this.expectedState || this.manual) return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.showPopper = true;
        }, this.openDelay);
      },

      handleClosePopper() {
        if (this.enterable && this.expectedState || this.manual) return;
        clearTimeout(this.timeout);
        this.showPopper = false;
      },

      setExpectedState(expectedState) {
        this.expectedState = expectedState;
      }
    }
  };
</script>
<style>
  .s-tooltip__popper {
    position: absolute;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 14px;
    line-height: 1.2;
    max-width: 200px;
    word-break: break-all;
    word-wrap: break-word;
  }

  .s-tooltip__popper .popper__arrow,.s-tooltip__popper .popper__arrow:after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid
  }

  .s-tooltip__popper .popper__arrow {
    border-width: 6px
  }

  .s-tooltip__popper .popper__arrow:after {
    content: " ";
    border-width: 5px
  }

  .s-tooltip__popper[x-placement^=top] {
    margin-bottom: 12px
  }

  .s-tooltip__popper[x-placement^=top] .popper__arrow {
    bottom: -6px;
    border-top-color: #18416d;
    border-bottom-width: 0
  }

  .s-tooltip__popper[x-placement^=top] .popper__arrow:after {
    bottom: 1px;
    margin-left: -5px;
    border-top-color: #18416d;
    border-bottom-width: 0
  }

  .s-tooltip__popper[x-placement^=bottom] {
    margin-top: 12px
  }

  .s-tooltip__popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    border-top-width: 0;
    border-bottom-color: #18416d
  }

  .s-tooltip__popper[x-placement^=bottom] .popper__arrow:after {
    top: 1px;
    margin-left: -5px;
    border-top-width: 0;
    border-bottom-color: #18416d
  }

  .s-tooltip__popper[x-placement^=right] {
    margin-left: 12px
  }

  .s-tooltip__popper[x-placement^=right] .popper__arrow {
    left: -6px;
    border-right-color: #18416d;
    border-left-width: 0
  }

  .s-tooltip__popper[x-placement^=right] .popper__arrow:after {
    bottom: -5px;
    left: 1px;
    border-right-color: #18416d;
    border-left-width: 0
  }

  .s-tooltip__popper[x-placement^=left] {
    margin-right: 12px
  }

  .s-tooltip__popper[x-placement^=left] .popper__arrow {
    right: -6px;
    border-right-width: 0;
    border-left-color: #18416d
  }

  .s-tooltip__popper[x-placement^=left] .popper__arrow:after {
    right: 1px;
    bottom: -5px;
    margin-left: -5px;
    border-right-width: 0;
    border-left-color: #18416d
  }

  .s-tooltip__popper.is-light {
    background: #fff;
    border: 1px solid #06172b
  }

  .s-tooltip__popper.is-light[x-placement^=top] .popper__arrow {
    border-top-color: #06172b
  }

  .s-tooltip__popper.is-light[x-placement^=top] .popper__arrow:after {
    border-top-color: #fff
  }

  .s-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #06172b
  }

  .s-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow:after {
    border-bottom-color: #fff
  }

  .s-tooltip__popper.is-light[x-placement^=left] .popper__arrow {
    border-left-color: #06172b
  }

  .s-tooltip__popper.is-light[x-placement^=left] .popper__arrow:after {
    border-left-color: #fff
  }

  .s-tooltip__popper.is-light[x-placement^=right] .popper__arrow {
    border-right-color: #06172b
  }

  .s-tooltip__popper.is-light[x-placement^=right] .popper__arrow:after {
    border-right-color: #fff
  }

  .s-tooltip__popper.is-dark {
    background: #06172b;
    border: 1px solid #18416d;
    color: #fff
  }
  .fade-in-linear-enter-active,.fade-in-linear-leave-active {
    transition: opacity .2s linear
  }

  .fade-in-linear-enter,.fade-in-linear-leave,.fade-in-linear-leave-active {
    opacity: 0
  }
</style>