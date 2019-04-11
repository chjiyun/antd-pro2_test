import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

export default class Pie extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   if (props.data !== state.data) {
  //     return {
  //       data: props.data,
  //     };
  //   }
  //   return null;
  // }

  componentDidMount() {
    window.addEventListener(
      'resize',
      () => {
        this.requestRef = requestAnimationFrame(() => this.resize());
      },
      { passive: true }
    );
    this.chart = echarts.init(this.root);
    const { data } = this.props;
    if (data) {
      // this.chart.setOption(data);
      this.updateChart(data);
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
      console.log('didUpdate');
      // this.chart.setOption(data, true); // 使用设置notMerge的方式不和之前的option合并
      this.updateChart(data, true);
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestRef);
    window.removeEventListener('resize', this.resize);
    this.resize.cancel();
  }

  updateChart = (data, notMerge = false) => {
    const { tooltip, legend, series } = data;
    // series 为数组，notMerge === true 时 echarts 取数组最后一个对象作为配置
    const seriesTail = series && series.length > 0 ? series[0] : {};
    // 默认值与自定义配置合并
    const options = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%',
        textStyle: {
          fontSize: 12,
        },
        ...tooltip,
      },
      legend: {
        show: false,
        // orient: 'vertical', // horizontal
        top: 'bottom',
        left: 'center',
        ...legend,
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          hoverOffset: 6,
          data: [],
          itemStyle: {
            // 图形样式
            emphasis: {
              // 高亮的扇区和标签样式
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          ...seriesTail,
        },
      ],
      color: ['#ffcd64', '#fe912a', '#065381', '#34b2e4', '#65d1dd'],
    };
    this.chart.setOption(options, notMerge);
  };

  getNode = node => {
    this.root = node;
  };

  @Bind()
  @Debounce(300)
  resize() {
    this.chart.resize();
  }

  render() {
    const { height } = this.props;
    console.log(this);
    return <div ref={this.getNode} style={{ height }} />;
  }
}
