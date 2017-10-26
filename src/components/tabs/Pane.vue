<template>
  <div :class="prefixCls" v-show="show" v-if="vif"><slot></slot></div>
</template>

<script>
  const prefixName = 's-tabs-tabpane';
  export default {
    name: 'sTabPane',
    props: {
      name: {
        type: String
      },
      label: {
        type: String,
        default: ''
      },
      icon: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      closable: {
        type: Boolean,
        default: null
      },
      vif: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        prefixCls: prefixName,
        show: true,
        currentName: this.name
      };
    },
    methods: {
      updateNav () {
        this.$parent.updateNav();
      }
    },
    watch: {
      name (val) {
        this.currentName = val;
        this.updateNav();
      },
      label () {
        this.updateNav();
      },
      icon () {
        this.updateNav();
      },
      disabled () {
        this.updateNav();
      },
      vif () {
        this.updateNav();
      }
    },
    mounted () {
      this.updateNav();
    }
  };
</script>
