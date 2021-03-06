<script>
  export default {
    name: 's-cascader-menu',

    data() {
      return {
        inputWidth: 0,
        options: [],
        props: {},
        visible: false,
        activeValue: [],
        value: [],
        expandTrigger: 'click',
        changeOnSelect: false,
        popperClass: ''
      };
    },

    watch: {
      visible(value) {
        if (value) {
          this.activeValue = this.value;
        }
      },
      value: {
        immediate: true,
        handler(value) {
          this.activeValue = value;
        }
      }
    },

    computed: {
      activeOptions: {
        cache: false,
        get() {
          const activeValue = this.activeValue;
          const configurableProps = ['label', 'value', 'children', 'disabled'];

          const formatOptions = options => {
            options.forEach(option => {
              if (option.__IS__FLAT__OPTIONS) return;
              configurableProps.forEach(prop => {
                const value = option[this.props[prop] || prop];
                if (value) option[prop] = value;
              });
              if (Array.isArray(option.children)) {
                formatOptions(option.children);
              }
            });
          };

          const loadActiveOptions = (options, activeOptions = []) => {
            const level = activeOptions.length;
            activeOptions[level] = options;
            let active = activeValue[level];
            if (active) {
              options = options.filter(option => option.value === active)[0];
              if (options && options.children) {
                loadActiveOptions(options.children, activeOptions);
              }
            }
            return activeOptions;
          };

          formatOptions(this.options);
          return loadActiveOptions(this.options);
        }
      }
    },

    methods: {
      select(item, menuIndex) {
        if (item.__IS__FLAT__OPTIONS) {
          this.activeValue = item.value;
        } else {
          this.activeValue.splice(menuIndex, this.activeValue.length - 1, item.value);
        }
        this.$emit('pick', this.activeValue);
      },
      handleMenuLeave() {
        this.$emit('menuLeave');
      },
      activeItem(item, menuIndex) {
        const len = this.activeOptions.length;
        this.activeValue.splice(menuIndex, len, item.value);
        this.activeOptions.splice(menuIndex + 1, len, item.children);
        if (this.changeOnSelect) {
          this.$emit('pick', this.activeValue, false);
        } else {
          this.$emit('activeItemChange', this.activeValue);
        }
      }
    },

    render(h) {
      const {
        activeValue,
        activeOptions,
        visible,
        expandTrigger,
        popperClass
      } = this;

      const menus = this._l(activeOptions, (menu, menuIndex) => {
        let isFlat = false;
        const items = this._l(menu, item => {
          const events = {
            on: {}
          };

          if (item.__IS__FLAT__OPTIONS) isFlat = true;

          if (!item.disabled) {
            if (item.children) {
              let triggerEvent = {
                click: 'click',
                hover: 'mouseenter'
              }[expandTrigger];
              events.on[triggerEvent] = () => { this.activeItem(item, menuIndex); };
            } else {
              events.on.click = () => { this.select(item, menuIndex); };
            }
          }

          let item_label = (<span class='s-cascader-menu__item-label'>{item.label}</span>);

          return (
              <li
          class={{
            's-cascader-menu__item': true,
                'iconfont icon-right': item.children,
                'is-active': item.value === activeValue[menuIndex],
                'is-disabled': item.disabled
          }}
          {...events}
          >
          {item_label}
          </li>
          );
        });
        let menuStyle = {};
        if (isFlat) {
          menuStyle.minWidth = this.inputWidth + 'px';
        }

        return (
            <ul
        class={{
          's-cascader-menu': true,
              's-cascader-menu--flexible': isFlat
        }}
        style={menuStyle}>
            {items}
            </ul>
        );
      });
      return (
          <transition name="s-zoom-in-top" on-after-leave={this.handleMenuLeave}>
    <div
      v-show={visible}
    class={[
          's-cascader-menus',
        popperClass
    ]}
    >
      {menus}
    </div>
      </transition>
    );
    }
  };
</script>
