<template>
  <div class="s-search-group">
    <div class="s-search-group-wrapper" ref="wrapper">
      <div class="s-search-group-form">
        <div class="s-search-group-field" ref="form">
          <slot></slot>
        </div>
        <div class="s-search-group-buttons" ref="btn">
          <s-button @click="searchHandler">查询</s-button>
        </div>
      </div>
    </div>
    <div class="s-search-group-arrow" @click="bottomArrowHandler" v-show="ifShowBottomArrow">
        <i :class="bottomArrow"></i>
    </div>
  </div>
</template>
<script type="text/babel">
  export default{
    name: 'sSearchGroup',
    data() {
      return {
        bottomArrowShow: false,
        bottomArrowDirection: 'down',
        classMap: {
          'up': 'iconfont icon-top',
          'down': 'iconfont icon-bottom'
        },
        originHeight: 0,
        btnHeight: 0,
        getOriginHeight: null
      }
    },
    props: {
      bodyHeight: {
        type: Number,
        default: 60
      },
      searchHandler: {
        type: Function
      }
    },
    computed: {
      wrapperStyle(){
        return{'height':this.bodyHeight+'px'}
      },
      bottomArrow() {
        return this.classMap[this.bottomArrowDirection];
      },
      ifShowBottomArrow() {
        if (this.originHeight > this.bodyHeight) {
          return true;
        } else {
          return false;
        }
      }
    },
    mounted() {
      let that = this;
      that.$refs.wrapper.style.height = that.bodyHeight+'px';
      this.$nextTick(function () {
        that.originHeight = that.$refs.form.offsetHeight;
      });
      //todoalex: 太复杂回头整理(无法支持select下拉选择框)
      that.getOriginHeight = function () {
        if(that.$refs.form) {
          that.originHeight = that.$refs.form.offsetHeight;
        }
        if(that.$refs.form.offsetHeight < parseInt(that.$refs.wrapper.style.height)){
          if(that.$refs.form.offsetHeight!=0){
            that.$refs.wrapper.style.height = that.$refs.form.offsetHeight+'px';
          }
          if(that.$refs.form.offsetHeight<that.bodyHeight){
            that.bottomArrowDirection = 'down';
          }
        }
      }
      window.addEventListener('resize', function () {
        setTimeout(that.getOriginHeight, 50);
      });
    },
    destroyed () {
      let that = this;
      window.removeEventListener('resize', that.getOriginHeight);
    },
    methods: {
      reserve(direction) {
        return direction === 'up' ? 'down' : 'up';
      },
      change(direction){
        return direction === 'up' ? this.originHeight+'px' : this.bodyHeight + 'px';
      },
      bottomArrowHandler() {
        this.bottomArrowDirection = this.reserve(this.bottomArrowDirection);
        this.$refs.wrapper.style.height = this.change(this.bottomArrowDirection);
      }
    }
  }
</script>
<style>
  .s-search-group {
    position: relative;
    border: solid 3px rgb(29, 37, 51);
    border-radius: 5px;
    background: rgb(0, 1, 10);
    box-shadow:0 0 50px rgba(0,141,230,0.15) inset;
  }
  .s-search-group .s-search-group-wrapper{
    margin: 6px 0;
    overflow: hidden;
  }
  .s-search-group .s-search-group-form{
    display:flex;
    flex-flow:row;
  }
  .s-search-group .s-search-group-form .s-search-group-field{
    flex:1
  }
  .s-search-group .s-search-group-form .s-search-group-buttons{
    width:100px;
    margin-top: 12px;
  }
  .s-search-group .s-form .s-form-item{
    margin: 10px;
  }
  .s-search-group .s-search-group-arrow{
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 30px;
    height: 12px;
    line-height: 12px;
    margin-left: -15px;
    border-width: 1px 1px 0 1px;
    border-color: rgb(29, 37, 51);
    border-style: solid;
    border-radius: 3px 3px 0 0;
    color: rgb(229, 245, 250);
    text-align: center;
    cursor: pointer;
  }
</style>
