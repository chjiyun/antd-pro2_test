import React from 'react';
import { Card, Icon } from 'antd';
import themeStyle from '@/theme/theme';

const NewsTags = ({ title, loading, tags = [] }) => {
  return (
    <Card
      title={
        <span style={{ fontSize: 18 }}>
          <Icon type="tag-o" style={{ color: themeStyle.themeColor, marginRight: 8 }} />
          {title}
        </span>
      }
      loading={loading}
      style={{ marginTop: 8 }}
      headStyle={{ padding: 0 }}
      bodyStyle={{ minHeight: 170, padding: '20px 0 0' }}
      bordered={false}
    >
      12312
    </Card>
  );
};

export default NewsTags;
