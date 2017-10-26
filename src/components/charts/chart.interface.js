import echarts from 'echarts'
import { merge } from 'lodash'

let echart = {};

function createChart(el, option) {
  let div = document.getElementById(el);
  let _chart = echarts.getInstanceByDom(div);
  if (_chart) {
    echarts.dispose(_chart);
  }
  let chart = echarts.init(div);
  chart.setOption(option, true);
  window.addEventListener('resize', function() {
    chart.resize();
  });
  return chart;
}

// 环形图
echart.ringChart = function(el, data, opt) {
  let res = getRingData(data);
  let option = {
    grid: {
      top: '10px',
      right: '10px',
      bottom: '10px',
      right: '10px',
      containLabel: true
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    legend: {
      textStyle: {
        color: '#495967'
      },
      itemGap: 2,
      itemHeight: 10,
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      data: res.legend,
      tooltip: {
        show: true
      }
    },
    textStyle: {
      color: '#596b7a'
    },
    series: {
      type:'pie',
      radius: ['50%', '70%'],
      zlevel: '1',
      data: res.data
    }
  };
  if (opt) {
    if (opt.legend && opt.legend.right) {
      delete option.legend.left;
      option.legend.right = opt.legend.right;
    }
  }
  createChart(el, option);
};

// 柱状图
echart.barChart = function(el, data) {
  let color = ['rgba(245,17,49,0.6)', 'rgba(236,94,61,0.6)', 'rgba(235,60,126,0.6)', 'rgba(255,164,46,0.6)', 'rgba(4,126,191,0.6)', 'rgba(49,198,123,0.6)',  'rgba(11,120,125,0.6)', 'rgba(19,31,45,0.6)'];
  let res = getRingData(data);
  res.data.forEach((item, idx) => {
    item.label = {
      normal: {
        show: true,
        position: 'top'
      }
    };
    item.itemStyle = {
      normal: {
        color: color[idx]
      }
    }
  });
  let option = {
    tooltip : {
      trigger: 'none'
    },
    grid: {
      top: '30px',
      right: '10px',
      bottom: '10px',
      left: '10px',
      containLabel: true
    },
    xAxis: {
      type : 'category',
      data : res.legend,
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      }
    },
    yAxis : {
      type : 'value',
      splitNumber: 2,
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      },
      minInterval: 1,
    },
    series : {
      type: 'bar',
      data: res.data,
    },
    textStyle: {
      color: '#596b7a'
    }
  };


  createChart(el, option);
};

// 显示全部坐标点柱状图
echart.barChartShowX = function(el, data) {
    let color = ['rgba(4,126,191,0.6)', 'rgba(47,188,216,0.6)', 'rgba(111,120,125,0.6)', 'rgba(49,198,123,0.6)', 'rgba(255,144,46,0.7)', 'rgba(245,17,49,0.6)', 'rgba(236,94,61,0.6)', 'rgba(58,97,155,0.6)'];
    let res = getRingData(data);
    res.data.forEach((item, idx) => {
        item.label = {
            normal: {
                show: true,
                position: 'top'
            }
        };
        item.itemStyle = {
            normal: {
                color: color[idx]
            }
        }
    });
    let option = {
        tooltip : {
            trigger: 'none'
        },
        grid: {
            top: '30px',
            right: '10px',
            bottom: '10px',
            left: '10px',
            containLabel: true
        },
        xAxis: {
            type : 'category',
            data : res.legend,
            splitLine: {
                show: false
            },
            axisLabel: {
                interval: 0,
                // rotate: -20,//60度角倾斜显示
                formatter:function(value)
                {
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 2;//每项显示文字个数
                    var valLength = value.length;//X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1)//如果类目项的文字大于3,
                    {
                        for (var i = 0; i < rowN; i++) {
                            var temp = "";//每次截取的字符串
                            var start = i * maxLength;//开始截取的位置
                            var end = start + maxLength;//结束截取的位置
                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                            temp = value.substring(start, end) + "\n";
                            ret += temp; //凭借最终的字符串
                        }
                        return ret;
                    }
                    else {
                        return value;
                    }
                }
            },
            axisLine: {
              lineStyle:{
                color: '#232f39'
              }
            }
        },
        yAxis : {
            type : 'value',
            splitNumber: 2,
            splitLine: {
                show: false
            },
            axisLine: {
              lineStyle:{
                color: '#232f39'
              }
            }
        },
        series : {
            type: 'bar',
            data: res.data,
        },
        textStyle: {
            color: '#596b7a'
        }
    };

    createChart(el, option);
};

// y轴柱状图
echart.yBarChart = function(el, data) {
  let res = getYbarData(data);
  let option = {
    grid: {
      left: '10px',
      right: '20px',
      top: '10px',
      bottom: '10px',
      containLabel: true
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    xAxis:  {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      },
      minInterval: 1,
      axisLabel: {
        formatter: function(value) {
          if (value > 9999) {
            return (value / 10000) + '万';
          } else {
            return value;
          }
        }
      }
    },
    yAxis: {
      type: 'category',
      data: res.name,
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      }
    },
    textStyle: {
      color: '#596b7a'
    },
    series: {
      name: '数量',
      type: 'bar',
      data: res.data,
      barWidth: '12',
      itemStyle: {
        normal: {color: 'rgba(4, 126, 191, 0.6)'},
        emphasis: {color: 'rgba(4, 126, 191, 1)'}
      }
    }
  };
  createChart(el, option);
};

// 三柱柱状图
echart.threeBarChart = function(el, data) {
  let _color = ['rgba(4,126,191,0.6)', 'rgba(40,72,120,0.6)', 'rgba(49,198,123,0.6)'];
  let color = ['rgba(4,126,191,1)', 'rgba(40,72,120,1)', 'rgba(49,198,123,1)'];
  let series = data.group;
  for(let i =0; i < series.length; i++) {
    series[i].type = 'bar';
    series[i].itemStyle = {
      normal: {
        color: _color[i]
      },
      emphasis: {
        color: color[i]
      }
    }
  }
  let option = {
    grid: {
      top: '10px',
      right: '10px',
      bottom: '10px',
      right: '10px',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      top: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.order,
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      }
    },
    textStyle: {
       color: '#596b7a'
     },
    series: series
  };
  createChart(el, option);
};

//折柱混合
echart.lineBarChart = function(el, data) {
  let _color =  ['rgba(4,126,191,0.6)', 'rgba(40,72,120,0.6)', 'rgba(49,198,123,0.6)'];
  let color = ['rgba(4,126,191,1)', 'rgba(40,72,120,1)', 'rgba(49,198,123,1)'];
  let series = data.group;
  for (let i = 0; i < series.length - 1; i++) {
    series[i].type = 'bar';
    series[i].itemStyle = {
      normal: {
        color: _color[i]
      },
      emphasis: {
        color: color[i]
      }
    }
  }
  let line = series[series.length - 1];
  line.smooth = true;
  line.symbol = 'circle';
  line.itemStyle = {
    normal: {
      color: 'rgba(4, 126, 191, 1)'
    }
  };
  let option = {
    grid: {
      top: '10px',
      right: '10px',
      bottom: '10px',
      right: '10px',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      top: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.order,
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      },
      minInterval: 1,
    },
    textStyle: {
      color: '#596b7a'
    },
    series: series
  };
  createChart(el, option);
};

// 折线图
echart.lineChart = function(el, data, opt) {
  let res = getYbarData(data);
  let option = {
    grid: {
      top: '10px',
      right: '10px',
      bottom: '10px',
      right: '10px',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}'
    },
    xAxis: {
      type: 'category',
      data: res.name,
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
         }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle:{
          color: '#232f39'
        }
      },
      minInterval: 1,
    },
    textStyle: {
      color: '#596b7a'
    },
    series: [{
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 6,
      data: res.data,
      areaStyle: {
        normal: {
          color: 'rgba(4, 126, 191, 0.2)'
        }
      },
      itemStyle: {
        normal: {
          color: 'rgba(4, 126, 191, 1)'
        }
      },
      textStyle: {
        color: '#495967'
      },
      lineStyle: {
        normal: {
          width: 1
        }
      }
    }]
  };
  if (opt) {
    if (opt.dataZoom) {
      option.dataZoom = opt.dataZoom;
    }
  }
  createChart(el, option);
};

echart.sLineChart = function(el, data, opt) {
  if (data && data instanceof Array) {
    let res = {
      name: [],
      data: []
    };
    for (let i = 0; i < data.length; i++) {
      res.name.push(data[i].name);
      res.data.push(data[i].value);
    }
    let option = {
      grid: {
        top: '10px',
        right: '10px',
        bottom: '10px',
        right: '10px',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}'
      },
      xAxis: {
        type: 'category',
        data: res.name,
        boundaryGap: false,
        splitLine: {
          show: false
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle:{
            color: '#232f39'
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle:{
            color: '#232f39'
          }
        },
        minInterval: 1,
      },
      textStyle: {
        color: '#596b7a'
      },
      series: [{
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: res.data,
        areaStyle: {
          normal: {
            color: 'rgba(4, 126, 191, 0.2)'
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(4, 126, 191, 1)'
          }
        },
        textStyle: {
          color: '#495967'
        },
        lineStyle: {
          normal: {
            width: 1
          }
        }
      }]
    };
    if (opt) {
      createChart(el, merge({}, option, opt));
    } else {
      createChart(el, option);
    }
  } else {
    console.error('数据格式不正确');
  }
}

// 南丁格尔玫瑰图
echart.nightingaleBarChart = function(el, data) {
  let res = getNightingaleData(data);
  let option = {
    color: ['#85a522', '#119fb8', '#d68d31', '#046885', '#aa291e', '#147aaf', '#99999b', '#5a5d5f'],
    grid: {
      top: '10px',
      right: '10px',
      bottom: '10px',
      left: '10px',
      containLabel: true
    },
    legend: {
      right: 'right',
      bottom : '0',
      borderWidth: '1',
      borderColor: '#141720',
      padding: 16,
      data: res.legend
    },
    calculable : true,
    series: [
      {
        name: '资产统计',
        type:'pie',
        radius : [30, 110],
        roseType : 'area',
        data: res.data,
        label: {
          normal: {
            show: true,
            formatter: '{b}: {c}',
            textStyle: {
              fontSize: 16
            }
          }
        }
      },
      {
        name: '辅助数据',
        z: -1,
        type:'pie',
        radius : [30, 110],
        roseType : 'area',
        data: res._data,
        label: {
          normal: {
            show: true,
            formatter: '\n\n\n\n{b}'
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              width: '0'
            }
          }
        }
      }
    ]
  };
  createChart(el, option);
};

/**
 *
 * @param data
 * @returns {{legend: Array, data: Array}}
 */
function getRingData(data) {
  let _color = ['rgba(49,198,123,0.6)', 'rgba(4,126,191,0.6)', 'rgba(255,144,46,0.6)', 'rgba(245,17,49,0.6)', 'rgba(111,120,125,0.6)'];
  let color = ['rgba(49,198,123,1)', 'rgba(4,126,191,1)', 'rgba(255,144,46,1)', 'rgba(245,17,49,1)', 'rgba(111,120,125,1)'];
  let res = {
    legend: [],
    data: []
  };
  let i = 0;
  for (let obj in data) {
    res.legend.push(obj);
    res.data.push({
      name: obj,
      value: data[obj],
      itemStyle: {
        normal: {
          color: _color[i]
        },
        emphasis: {
          color: color[i]
        }
      },
      label: {
        normal: {
          show: false,
          textStyle: {
            color: _color[i]
          }
        },
        emphasis: {
          show: false,
          textStyle: {
            color: color[i]
          }
        }
      },
      labelLine: {
        normal: {
          show: false,
          lineStyle: {
            color: _color[i]
          }
        },
        emphasis: {
          show: false,
          lineStyle: {
            color: color[i]
          }
        }
      }
    });
    i++;
  }
  return res;
}
/**
 *
 * @param data
 * @returns {{name: Array, data: Array}}
 */
function getBarData(data) {
  let res = {
    name: [],
    data: []
  };
  let i = 0;
  for(let item in data) {
    res.name.push(item);
    res.data.push({
      value: data[item]
    });
  }
  return res;
}
/**
 *
 * @param data
 * @returns {{name: Array, data: Array}}
 */
function getYbarData(data) {
  let res = {
    name: [],
    data: []
  };
  for(let item in data) {
    res.name.push(item);
    res.data.push(data[item]);
  }
  return res;
}
/**
 *
 * @param data
 * @returns {{legend: Array, data: Array, _data: Array}}
 */
function getNightingaleData(data) {
  let res = {
    legend: [],
    data: [],
    _data: []
  };
  for (let i = 0; i < data.length; i++) {
    res.legend.push(data[i].name);
    res.data.push({
      name: data[i].name,
      value: data[i].value,
    });
    res._data.push({
      name: data[i].detail,
      value: data[i].value
    })
  }
  return res;
}


echart.createChart = createChart;
export default echart;