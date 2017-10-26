<template>
  <div class="s-box" :class="`s-box-${type}`" :style="`width:${width};`">
    <div class="s-box-item" v-for="(item,index) in barArray" :style="`width:${item.width};`">
      <div class="s-box-item-icon">
        <i :class="`iconfont icon-${data[index].icon}`" :style="`color:${data[index].color}`"></i>
        <i :class="`s-box-icon-pop iconfont icon-${data[index].type}`" :style="`color:${data[index].color}`"
           v-show="type == 'big' && data[index].type"></i>
      </div>
      <div class="s-box-item-content-wrapper">
        <div class="s-box-item-des">{{data[index].des}}</div>
        <div class="s-box-item-title">{{data[index].title}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  // width,height,icon格式,是否显示Header, 分栏条数
  export default {
    name: 'sBox',
    data() {
      return {
        barArray: ['100%'],
        headerHeight: 0
      };
    },
    created() {
      let reBars = [];
      if (typeof this.bars === 'number') {
        let bar = 100 / this.bars;
        for (let i = 0; i < this.bars; i++) {
          reBars.push({
            index: i + 1,
            width: bar + '%'
          });
        }
      } else if (typeof this.bars === 'object' && this.bars.length) {
        let count = 0;
        for (let i = 0; i < this.bars.length; i++) {
          count += this.bars[i];
        }
        let minBar = 100 / count;
        reBars = this.bars.map(function (value, index) {
          return {
            index: index,
            width: minBar * value + '%'
          };
        });
      }
      this.barArray = reBars;
    },
    props: {
      data: {
        type: Array
      },
      height: {
        type: String,
        default: '80px'
      },
      width: {
        type: String,
        default: '100%'
      },
      bars: {
        type: [Number, Array],
        default: 1
      },
      type: {
        // horizontal, vertical, big
        type: String,
        default: 'horizontal'
      }
    }
    //  ['title', 'height', 'width', 'type', 'header', 'bars']
  };
</script>
<style>
  .s-box {
    display: flex;
    align-items: stretch;
    background: rgb(1, 15, 32);
  }

  .s-box-item {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 15px;
  }

  .s-box-item + .s-box-item {
    border-left: solid 1px rgb(5, 28, 56)
  }

  .s-box-horizontal .s-box-item-icon {
    display: flex;
    align-items: center;
    width: 40px;
  }

  .s-box-item-icon .iconfont {
    font-size: 36px;
    color: #108DD6
  }

  .s-box-horizontal .s-box-item-content-wrapper {
    padding: 5px;
  }

  .s-box-horizontal .s-box-item-content-wrapper .s-box-item-des, .s-box-horizontal .s-box-item-content-wrapper .s-box-item-title {
    width: 100%;
    height: 20px;
    line-height: 20px;
  }

  .s-box-item-des {
    font-size: 14px;
    color: #778da0;
  }

  .s-box-item-title {
    font-size: 14px;
    color: rgb(243, 243, 243);
  }

  .s-box-vertical .s-box-item {
    display: block;
  }

  .s-box-vertical .s-box-item-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .s-box-vertical .s-box-item-content-wrapper {
    width: 100%;
    padding: 5px;
    text-align: center;
  }

  .s-box-big .s-box-item {
    display: block;
  }

  .s-box-big .s-box-item-icon {
    position: relative;
    display: block;
    width: 50px;
    text-align: center;
    margin: 0 auto
  }

  .s-box-big .s-box-item-icon .s-box-icon-pop.iconfont {
    position: absolute;
    right: -10px;
    top: -5px;
    font-size: 10px;
    font-weight: bolder;
  }

  .s-box-big .s-box-item-icon .iconfont {
    font-size: 36px;
    color: rgb(10, 99, 155)
  }

  .s-box-big .s-box-item-content-wrapper {
    width: 100%;
    padding: 5px;
    text-align: center;
  }

  .s-box-big .s-box-item-des {
    display: none;
  }
</style>