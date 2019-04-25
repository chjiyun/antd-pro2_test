import React, { PureComponent } from 'react';
import { Table } from 'antd';

export default class index extends PureComponent {
  render() {
    const { data = [], pagination, rowKey, ...rest } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    return (
      <Table pagination={paginationProps} dataSource={data} rowKey={rowKey || 'key'} {...rest} />
    );
  }
}
