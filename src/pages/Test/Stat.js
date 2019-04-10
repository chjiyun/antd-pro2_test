import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Pie from '@/components/Echarts/Pie';

class Stat extends Component {
  state = {
    sds: null,
  };

  render() {
    console.log(this.state);
    return (
      <PageHeaderWrapper title="园区统计测试" hiddenBreadcrumb>
        <Card title="饼图" bordered={false}>
          <Pie height={400} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Stat;
