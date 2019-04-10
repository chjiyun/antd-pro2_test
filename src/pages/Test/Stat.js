import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Stat extends Component {
  state = {
    sds: null,
  };

  render() {
    console.log(this.state);
    return (
      <PageHeaderWrapper title="可视化组件测试" hiddenBreadcrumb>
        <Card title="test" bordered={false}>
          123
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Stat;
