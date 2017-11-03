<template>
  <transition name="msgbox-fade">
    <div
      class="s-message-box-wrapper"
      tabindex="-1"
      v-show="value"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'"
    >
      <div class="s-message-box" :class="[customClass, center && 's-message-box-center']">
        <div class="s-message-box-header" v-if="title !== undefined">
          <div class="s-message-box-title">
            <div class="s-message-box-status" :class="[ typeClass ]" v-if="typeClass && center"></div>
            <span>{{ title }}</span>
          </div>
          <button type="button"
                  class="s-message-box-headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleAction('cancel')"
                  @keydown.enter="handleAction('cancel')"
          >
            <i class="s-message-box-close iconfont icon-error"></i>
          </button>
        </div>
        <div class="s-message-box-content" v-if="message !== ''">
          <div class="s-message-box-status" :class="[ typeClass ]" v-if="typeClass && !center"></div>
          <div class="s-message-box-message">
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
          <div class="s-message-box-input" v-show="showInput">
            <s-input
              v-model="inputValue"
              :type="inputType"
              @compositionstart.native="handleComposition"
              @compositionupdate.native="handleComposition"
              @compositionend.native="handleComposition"
              @keyup.enter.native="handleKeyup"
              :placeholder="inputPlaceholder"
              ref="input"></s-input>
            <div class="s-message-box-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="s-message-box-btns">
          <s-button
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-show="showCancelButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t('el.messagebox.cancel') }}
          </s-button>
          <s-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t('el.messagebox.confirm') }}
          </s-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from '../extra/utils/popup';
  import Locale from '../extra/mixins/locale';
  import SInput from '../input';
  import {Button} from '../button';
  import {addClass, removeClass} from '../extra/utils/dom';
  import {t} from '../extra/locale';
  import Dialog from '../extra/utils/aria-dialog';

  let messageBox;
  let typeMap = {
    success: 'circle-check',
    info: 'information',
    warning: 'warning',
    error: 'circle-cross'
  };

  export default {
    mixins: [Popup, Locale],

    props: {
      modal: {
        default: true
      },
      lockScroll: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      closeOnHashChange: {
        default: true
      },
      center: {
        default: false,
        type: Boolean
      },
      roundButton: {
        default: false,
        type: Boolean
      }
    },

    components: {
      SInput,
      's-button': Button
    },

    computed: {
      typeClass() {
        return this.type && typeMap[this.type] ? `s-icon-${ typeMap[this.type] }` : '';
      },

      confirmButtonClasses() {
        return `s-button-primary ${ this.confirmButtonClass }`;
      },
      cancelButtonClasses() {
        return `${ this.cancelButtonClass }`;
      }
    },

    methods: {
      handleComposition(event) {
        if (event.type === 'compositionend') {
          setTimeout(() => {
            this.isOnComposition = false;
          }, 100);
        } else {
          this.isOnComposition = true;
        }
      },
      handleKeyup() {
        !this.isOnComposition && this.handleAction('confirm');
      },
      getSafeClose() {
        const currentId = this.uid;
        return () => {
          this.$nextTick(() => {
            if (currentId === this.uid) this.doClose();
          });
        };
      },
      doClose() {
        if (!this.value) return;
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();
        messageBox.closeDialog(); // 解绑
        if (this.lockScroll) {
          setTimeout(() => {
            if (this.modal && this.bodyOverflow !== 'hidden') {
              document.body.style.overflow = this.bodyOverflow;
              document.body.style.paddingRight = this.bodyPaddingRight;
            }
            this.bodyOverflow = null;
            this.bodyPaddingRight = null;
          }, 200);
        }
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
        setTimeout(() => {
          if (this.action) this.callback(this.action, this);
        });
      },

      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.handleAction('cancel');
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.close = this.getSafeClose();
          this.beforeClose(action, this, this.close);
        } else {
          this.doClose();
        }
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
            addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
              addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
        return true;
      },
      getFistFocus() {
        const $btns = this.$el.querySelector('.s-message-box-btns .s-button');
        const $title = this.$el.querySelector('.s-message-box-btns .s-message-box-title');
        return $btns && $btns[0] || $title;
      }
    },

    watch: {
      inputValue: {
        immediate: true,
        handler(val) {
          this.$nextTick(_ => {
            if (this.$type === 'prompt' && val !== null) {
              this.validate();
            }
          });
        }
      },

      value(val) {
        if (val) {
          this.uid++;
          if (this.$type === 'alert' || this.$type === 'confirm') {
            this.$nextTick(() => {
              this.$refs.confirm.$el.focus();
            });
          }
          this.focusAfterClosed = document.activeElement;
          messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFistFocus());
        };

        // prompt
        if (this.$type !== 'prompt') return;
        if (val) {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.$refs.input.$el.querySelector('input').focus();
            }
          }, 500);
        } else {
          this.editorErrorMessage = '';
          removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
        }
      }
    },

    mounted() {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close);
      }
    },

    beforeDestroy() {
      if (this.closeOnHashChange) {
        window.removeEventListener('hashchange', this.close);
      }
      setTimeout(() => {
        messageBox.closeDialog();
      });
    },

    data() {
      return {
        uid: 1,
        title: undefined,
        message: '',
        type: '',
        customClass: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputType: 'text',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        action: '',
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
        dangerouslyUseHTMLString: false,
        focusAfterClosed: null,
        isOnComposition: false
      };
    }
  };
</script>
<style>
  .s-message-box {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #000a17;
    width: 420px;
    border: 1px solid rgba(168, 168, 168, 0.54);
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    box-shadow: inset 0 0 9px #ccc;
  }

  .s-message-box-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center
  }

  .s-message-box-wrapper:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle
  }

  .s-message-box-header {
    position: relative;
    padding: 15px;
    padding-bottom: 10px;
    background-image: -moz-linear-gradient( 90deg, rgba(11,118,246,0.38) 0%, rgba(45,146,254,0.38) 84%, rgba(46,153,255,0.38) 100%);
    background-image: -webkit-linear-gradient( 90deg, rgba(11,118,246,0.38) 0%, rgba(45,146,254,0.38) 84%, rgba(46,153,255,0.38) 100%);
    background-image: linear-gradient( 90deg, rgba(11,118,246,0.38) 0%, rgba(45,146,254,0.38) 84%, rgba(46,153,255,0.38) 100%);

  }

  .s-message-box-content {
    padding: 20px;
    color: #e5f5fa;
    font-size: 14px;
    position: relative;
  }

  .s-message-box-close {
    color: #b3e5ff;
    cursor: pointer;
    font-size: 20px;
  }

  .s-message-box-headerbtn {
    position:absolute;
    top:12px;
    right:15px;
    padding:0;
    border:none;
    outline:0;
    background:0 0;
    font-size:16px;
    cursor:pointer
  }

  .s-message-box-headerbtn:focus .s-message-box-close,
  .s-message-box-headerbtn:hover .s-message-box-close{
    color:#409EFF
  }

  .s-message-box-center .s-message-box-header {
    padding-top: 25px;
    background: none;
  }

  .s-message-box-center .s-message-box-title {
    position:relative;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center
  }

  .s-message-box-center .s-message-box-status {
    position:relative;
    top:auto;
    left: 0px;
    padding-right:5px;
    text-align:center;
    -webkit-transform:translateY(-1px);
    transform:translateY(-1px)
  }

  .s-message-box-center .s-message-box-status+span {
    padding-left: 15px;
    font-size: 16px;
  }

  .s-message-box-center .s-message-box-message {
    margin-left:0
  }

  .s-message-box-center .s-message-box-btns,
  .s-message-box-center .s-message-box-content {
    text-align:center
  }

  .s-message-box-center .s-message-box-content {
    padding: 10px 25px;
  }

  .s-message-box-input {
    padding-top: 15px
  }

  .s-message-box-input input.invalid,
  .s-message-box-input input.invalid:focus {
    border-color: #ff4949
  }

  .s-message-box-errormsg {
    color: #ff4949;
    font-size: 12px;
    min-height: 18px;
    margin-top: 2px
  }

  .s-message-box-title {
    padding-left: 0;
    margin-bottom: 0;
    line-height: 1;
    font-size: 16px;
    color: #e5f5fa;
  }

  .s-message-box-message {
    margin: 0
  }

  .s-message-box-message p {
    margin: 0;
    line-height: 1.4
  }

  .s-message-box-btns {
    padding: 25px;
    text-align: right
  }

  .s-message-box-btns-reverse {
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse
  }

  .s-message-box-status {
    width: 38px;
    height: 38px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .s-icon-circle-check+.s-message-box-message,
  .s-icon-circle-cross+.s-message-box-message,
  .s-icon-information+.s-message-box-message,
  .s-icon-warning+.s-message-box-message {
    padding-top: 11px;
  }

  .s-message-box-status+.s-message-box-message {
    padding-left: 52px;
  }

  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
  }

  .s-icon-circle-check {
    background: url(./assets/icon-circle-check.svg);
  }

  .s-icon-circle-cross {
    background: url(./assets/icon-circle-cross.svg);
  }

  .s-icon-information {
    background: url(./assets/icon-information.svg);
  }

  .s-icon-warning {
    background: url(./assets/icon-warning.svg);
  }

  .s-message-box .s-message-box-btns>button + button {
    margin-left: 10px;
  }

  .msgbox-fade-enter-active {
    -webkit-animation:msgbox-fade-in .3s;
    animation:msgbox-fade-in .3s
  }

  .msgbox-fade-leave-active {
    -webkit-animation:msgbox-fade-out .3s;
    animation:msgbox-fade-out .3s
  }

  @-webkit-keyframes msgbox-fade-in {
    0% {
      -webkit-transform:translate3d(0,-20px,0);
      transform:translate3d(0,-20px,0);opacity:0
    }
    100% {
      -webkit-transform:translate3d(0,0,0);
      transform:translate3d(0,0,0);
      opacity:1
    }
  }

  @keyframes msgbox-fade-in {
    0% {
      -webkit-transform:translate3d(0,-20px,0);
      transform:translate3d(0,-20px,0);
      opacity:0
    }
    100% {
      -webkit-transform:translate3d(0,0,0);
      transform:translate3d(0,0,0);
      opacity:1
    }
  }

  @-webkit-keyframes msgbox-fade-out {
    0% {
      -webkit-transform:translate3d(0,0,0);
      transform:translate3d(0,0,0);
      opacity:1}
    100% {
      -webkit-transform:translate3d(0,-20px,0);
      transform:translate3d(0,-20px,0);
      opacity:0
    }
  }

  @keyframes msgbox-fade-out {
    0% {
      -webkit-transform:translate3d(0,0,0);
      transform:translate3d(0,0,0);
      opacity:1
    }
    100% {
      -webkit-transform:translate3d(0,-20px,0);
      transform:translate3d(0,-20px,0);
      opacity:0
    }
  }
</style>
