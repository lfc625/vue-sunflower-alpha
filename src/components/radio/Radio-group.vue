<template>
    <div class="s-radio-group">
        <slot></slot>
    </div>
</template>
<script>
    import Emitter from '../extra/mixins/emitter';

    export default {
        name: 's-radio-group',

        componentName: 'SRadioGroup',

        mixins: [Emitter],

        props: {
            value: {},
            size: String,
            fill: String,
            textColor: String,
            disabled: Boolean
        },
        watch: {
            value(value) {
                this.$emit('change', value);
                this.dispatch('SFormItem', 'el.form.change', [this.value]);
            }
        }
    };
</script>

