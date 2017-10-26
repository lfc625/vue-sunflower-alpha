<template>
      <div :class="classes" :style="styles">
        <slot></slot>
      </div>
</template>

<script>
  import { oneOf } from '../extra/utils/assist';

  const prefixName = 's-row';
  export default{
    name: 's-row',
    props: {
        // 是否开启flex模式
      type: {
           validator (value) {
              return oneOf(value, ['flex'])
           }
        },
        // flex 布局下的垂直对齐方式
      align: {
        validator (value) {
           return oneOf(value, ['top', 'middle', 'bottom'])
        }
      },
      justify: {
        validator (value) {
           return oneOf(value, ['start', 'end', 'center', 'around', 'between'])
        }
      },
      gutter: {
        type: Number,
        default: 0
      },
      className: String
    },
    computed: {
      classes () {
        return [
          {
            [`${prefixName}`]: !this.type,
            [`${prefixName}-${this.type}`]: !!this.type,
            [`${prefixName}-${this.type}-${this.align}`]: !!this.align,
            [`${prefixName}-${this.type}-${this.justify}`]: !!this.justify,
            [`${this.className}`]: !!this.className
          }
        ]
      },
      styles () {
        let style = {};
        if (this.gutter !== 0) {
          style = {
            marginLeft: this.gutter / -2 + 'px',
            marginRight: this.gutter / -2 + 'px'
          }
        }
        return style
      }
    },
    methods: {
      updateGutter (val) {
        this.$children.forEach((child) => {
          if (val !== 0) {
          child.gutter = val;
        }
      });
      }
    },
    watch: {
      gutter (val) {
        this.updateGutter(val);
        }
    },
    ready () {
      this.updateGutter(this.gutter);
    }
  }

</script>

<style>

  .s-row{
    position: relative;
    box-sizing: border-box;
    color:#e5f5fa;
  }
  .s-row:before, .s-row:after{
    display: table;
    content: ""
  }
  .s-row:after{
    clear: both
  }
  .s-row-flex{
    color:#e5f5fa;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
  }
  .s-row-flex-top{
    -ms-flex-align: start;
    align-items: flex-start
  }
  .s-row-flex-middle{
    -ms-flex-align: center;
    align-items: center
  }
  .s-row-flex-bottom{
    -ms-flex-align: end;
    align-items: flex-end
  }
  .s-row-flex-start{
    -ms-flex-pack: start;
    justify-content: flex-start
  }
  .s-row-flex-end{
    -ms-flex-pack: end;
    justify-content: flex-end
  }
  .s-row-flex-center{
    -ms-flex-pack: center;
    justify-content: center
  }
  .s-row-flex-between{
    -ms-flex-pack: justify;
    justify-content: space-between
  }
  .s-row-flex-around{
    -ms-flex-pack: distribute;
    justify-content: space-around
  }
  .s-row{
      margin-bottom: 4px;
  }
  .grid-content {
      border-radius: 4px;
      min-height: 36px;
      line-height: 36px;
      text-align: center;
  }

  .bg-purple,.bg-purple-light {
      background: #0b1521;
      color:#bfd0e3;
      text-align: left;
      padding-left: 30px;
  }
  .bg-purple-light {
      background: #07111d;
      color:#eeeff0;
  }
</style>
