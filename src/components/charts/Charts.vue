<template>
  <div :id="this.chart.el" :style="size" v-if="!noDataflag"></div>
  <div class="chartNoData" :style="size" v-else>
    <span>暂无数据</span>
  </div>
</template>

<script>
  import myChart from './chart.interface';

  export default {
    name: 's-charts',

    props: {
      chart: {
        required: true,
        type: Object
      }
    },

    computed: {
      size() {
        return {
          width: this.chart.width,
          height: this.chart.height
        }
      },
      noDataflag() { // 暂无数据的标志
        return this.isValidData(this.chart.data);
      }
    },

    methods: {
      drewChart() {
        switch (this.chart.type) {
          case 'ringChart': myChart.ringChart(this.chart.el, this.chart.data, this.chart.opt); break;
          case 'barChart': myChart.barChart(this.chart.el, this.chart.data); break;
          case 'barChartShowX': myChart.barChartShowX(this.chart.el, this.chart.data); break;
          case 'yBarChart': myChart.yBarChart(this.chart.el, this.chart.data); break;
          case 'threeBarChart': myChart.threeBarChart(this.chart.el, this.chart.data); break;
          case 'lineChart': myChart.lineChart(this.chart.el, this.chart.data, this.chart.opt); break;
          case 'sLineChart': myChart.sLineChart(this.chart.el, this.chart.data, this.chart.opt); break;
          case 'lineBarChart': myChart.lineBarChart(this.chart.el, this.chart.data); break;
          case 'nightingale': myChart.nightingaleBarChart(this.chart.el, this.chart.data); break;
        }
      },
      isValidData(data) { // 数据不可用返回true
        let typeString = Object.prototype.toString.apply(data);
        if (typeString.indexOf('Object') !== -1) {
          if (Object.keys(data).length === 0) {
            return true;
          }
        } else if (typeString.indexOf('Array') !== -1) {
          if (data.length === 0) {
            return true;
          }
        } else {
          if (data === '') {
            return true;
          }
        }
        return false;
      }
    },

    watch: {
      chart: {
        immediate: true,
        deep: true,
        handler(val) {
          this.$nextTick(() => {
            if (!this.isValidData(val.data)) {
              this.drewChart();
            }
          });
        }
      }
    }
  }
</script>

<style>
  .chartNoData {
    position: relative;
  }
  .chartNoData span {
    color: #5e7382;
    font-size: 18px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>