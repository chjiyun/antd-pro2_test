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
      this.chart.setOption(data);
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
      console.log('didUpdate');
      this.chart.setOption(data, true); // 使用设置notMerge的方式不和之前的option合并
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestRef);
    window.removeEventListener('resize', this.resize);
    this.resize.cancel();
  }

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
