import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Pie from '@/components/Echarts/Pie';

const pieConfig = {
  // title: {
  //   text: '某站点用户访问来源',
  //   subtext: '纯属虚构',
  //   x: 'center',
  // },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: true,
    // bottom: true,
    // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  },
  // 在 render里更改
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

const dataArr = [
  { value: 335, name: '直接访问' },
  { value: 310, name: '邮件营销' },
  { value: 234, name: '联盟广告' },
  { value: 135, name: '视频广告' },
  { value: 1500, name: '搜索引擎' },
];

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
    }

    return (
      <PageHeaderWrapper title="园区统计测试" hiddenBreadcrumb>
        <Card title="饼图" bordered={false} bodyStyle={{ height: 400 }} loading={!data}>
          <Pie height={400} data={pieConfig} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Stat;
