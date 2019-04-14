import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/extension/bmap/bmap';
import options from './Config';

class MigrationMap extends PureComponent {
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
      this.updateChart();
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
      // this.chart.setOption(data, true); // 使用设置notMerge的方式不和之前的option合并
      this.updateChart(true);
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestRef);
    window.removeEventListener('resize', this.resize);
    this.resize.cancel();
  }

  updateChart = (notMerge = false) => {
    console.log(options);
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

export default MigrationMap;
