import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Pie from '@/components/Echarts/Pie';
import RoseRange from '@/components/Echarts/RoseRange';
import MigrationMap from '@/components/Echarts/MigrationMap';

const colorMap = ['#ffcd64', '#fe912a', '#065381', '#34b2e4', '#65d1dd'];

const pieConfig = {
  // title: {
  //   text: '某站点用户访问来源',
  //   subtext: '纯属虚构',
  //   x: 'center',
  // },
  color: colorMap,
  tooltip: {
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
    formatter: '{b}: {d}%<br/>数量: {c}',
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'left',
    top: 'top',
    // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  },
  // 在 render里更改
  series: [
    {
      name: '访问来源',
      label: {
        show: true,
        formatter: '{b}: {d}%',
      },
    },
  ],
};

const dataArr = [
  { value: 335, name: '直接访问' },
  { value: 310, name: '邮件营销' },
  { value: 234, name: '联盟广告' },
  { value: 135, name: '视频广告' },
  { value: 1000, name: '搜索引擎' },
];
const roseData = dataArr.slice(0, 2);
const roseConfig = {
  color: colorMap,
  polar: {},
  angleAxis: {
    type: 'category',
    data: roseData.map(v => {
      return v.name;
    }),
    boundaryGap: false,
    startAngle: 180,
    endAngle: 90,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#999',
        type: 'dashed',
      },
    },
    axisLine: {
      lineStyle: {
        color: '#999',
      },
    },
  },
  radiusAxis: {
    type: 'value',
    data: roseData.map(v => {
      return v.value;
    }),
    axisLine: {
      // show: false,
    },
    axisLabel: {
      rotate: 45,
    },
  },
  series: [
    {
      name: '访问来源',
      roseType: 'radius',
      radius: [0, 100],
      label: {
        show: false,
        formatter: '{b}: {d}%',
      },
    },
  ],
};

// 连接 model
class Stat extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: dataArr,
      });
    }, 1500);
  }

  render() {
    const { data } = this.state;
    if (data) {
      pieConfig.series[0].data = data;
      roseConfig.series[0].data = roseData;
    }

    return (
      <PageHeaderWrapper title="园区统计测试" hiddenBreadcrumb>
        <Card
          title="基础饼图"
          bordered={false}
          bodyStyle={{ height: 448 }}
          loading={!data}
          style={{ marginBottom: 24 }}
        >
          <Pie height={400} data={pieConfig} />
        </Card>
        <Card
          title="限定角度范围饼图"
          bordered={false}
          bodyStyle={{ height: 448 }}
          loading={!data}
          style={{ marginBottom: 24 }}
        >
          <RoseRange height={400} data={roseConfig} />
        </Card>
        {/* <Card
          title="迁徙图"
          bordered={false}
          bodyStyle={{ height: 548 }}
          loading={!data}
          style={{ marginBottom: 24 }}
        >
          <MigrationMap height={500} data={roseConfig} />
        </Card> */}
      </PageHeaderWrapper>
    );
  }
}

export default Stat;
