<template>
  <div :id="this.chart.name" :style="size" v-if="!noDataflag"></div>
  <div class="chartNoData" :style="size" v-else>
    <span>暂无数据</span>
  </div>
</template>
<script>
  import myChart from './chart.interface'
  export default{
    name: 's-chart',
    props: {
      chart: {
        type: Object
      },
      clickFun: {
        type: Function
      }
    },
    computed: {
      size() {
        let style = {};
        style.width = this.chart.width;
        style.height = this.chart.height;
        return style;
      },
      noDataflag() { // 暂无数据的标志
        return this.isValidData(this.chart.data);
      }
    },
    methods: {
      drewChart() {
        let chart = {}
        switch (this.chart.type) {
          case 'ringChart' :
            myChart.ringChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.isReverseColor, this.chart.option);
            break;
          case 'ringCharts' :
            myChart.ringCharts(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'ringSameCharts' :
            myChart.ringSameCharts(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'statRingChart' :
            myChart.statRingChart(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'pieChart' :
            myChart.pieChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.option);
            break;
          case 'gaugeChart' :
            myChart.gaugeChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.option);
            break;
          case 'newgaugeChart' :
            myChart.newgaugeChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.option);
            break;
          case 'statusChart' :
            myChart.statusChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.option);
            break;
          case 'rainbowBarChart' :
            myChart.rainbowBarChart(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'colorfulBarChart' :
            myChart.colorfulBarChart(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'colorfulBarVeerChart' :
            myChart.colorfulBarVeerChart(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'percentBarChart' :
            myChart.percentBarChart(this.chart.name, this.chart.data, this.chart.itemName);
            break;
          case 'stackBarChart' :
            myChart.stackBarChart(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'stackChart' :
            myChart.stackChart(this.chart.name, this.chart.data, this.chart.unit, this.chart.option);
            break;
          case 'multiBarChart' :
            myChart.multiBarChart(this.chart.name, this.chart.data, this.chart.option);
            break;
          case 'lineChart' :
            chart = myChart.lineChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.option);
            if (typeof(this.clickFun) === 'function') {
              chart.on('click', this.clickFun)
            }
            break;
          case 'statusLineChart' :
            myChart.statusLineChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.option);
            break;
          case 'multilineChart' :
            chart = myChart.multilineChart(this.chart.name, this.chart.data, this.chart.option);
            if (typeof(this.clickFun) === 'function') {
              chart.on('click', this.clickFun)
            }
            break;
          case 'areaChart' :
            myChart.areaChart(this.chart.name, this.chart.data, this.chart.unit, this.chart.option);
            break;
          case 'areaChartY' :
            myChart.areaChartY(this.chart.name, this.chart.data, this.chart.unit, this.chart.option);
            break;
          case 'areaWordChart' :
            myChart.areaWordChart(this.chart.name, this.chart.data, this.chart.itemName, this.chart.option);
            break;
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
    transform: translate(-50%, -50%);
  }
</style>
