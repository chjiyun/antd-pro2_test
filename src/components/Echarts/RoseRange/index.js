import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import 'echarts/lib/chart/custom';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/radiusAxis';
import 'echarts/lib/component/angleAxis';

export default class RoseRange extends Component {
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

  renderItem = (params, api) => {
    console.log(params, api);
    const rectShape = echarts.graphic.clipRectByRect(
      {
        r: 30,
        startAngle: 0,
        endAngle: 30,
      },
      {
        r: 30,
        startAngle: 0,
        endAngle: 30,
      }
    );
    return (
      rectShape && {
        type: 'sector',
        shape: rectShape,
        style: api.style(),
      }
    );
  };

  updateChart = (data, notMerge = false) => {
    const { tooltip, legend, series, ...otherProps } = data;
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
      series: [
        {
          type: 'custom',
          coordinateSystem: 'polar',
          renderItem: this.renderItem,
          // radius: '55%',
          center: ['50%', '50%'],
          itemStyle: {
            // emphasis: {
            //   // 高亮的扇区和标签样式
            // },
          },
          ...seriesTail,
        },
      ],
      ...otherProps,
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
    return <div ref={this.getNode} style={{ height }} />;
  }
}
