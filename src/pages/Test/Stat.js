import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Pie from '@/components/Echarts/Pie';
import MigrationMap from '@/components/Echarts/MigrationMap';

const pieConfig = {
  // title: {
  //   text: '某站点用户访问来源',
  //   subtext: '纯属虚构',
  //   x: 'center',
  // },
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

const roseConfig = {
  series: [
    {
      name: '访问来源',
      // roseType: 'radius',
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
      roseConfig.series[0].data = data;
    }

    return (
      <PageHeaderWrapper title="园区统计测试" hiddenBreadcrumb>
        {/* <Card
          title="饼图"
          bordered={false}
          bodyStyle={{ height: 448 }}
          loading={!data}
          style={{ marginBottom: 24 }}
        >
          <Pie height={400} data={pieConfig} />
        </Card> */}
        <Card
          title="限定角度范围饼图"
          bordered={false}
          bodyStyle={{ height: 448 }}
          loading={!data}
          style={{ marginBottom: 24 }}
        >
          <Pie height={400} data={roseConfig} />
        </Card>
        <Card
          title="迁徙图"
          bordered={false}
          bodyStyle={{ height: 548 }}
          loading={!data}
          style={{ marginBottom: 24 }}
        >
          <MigrationMap height={500} data={roseConfig} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Stat;
