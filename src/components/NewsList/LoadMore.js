import React from 'react';
import { Row, Col, Divider, Button } from 'antd';

// 加载更多组件
const LoadMore = ({ count, newsLength, colProps, emptyText = '', loading, searchMore }) => {
  if (count <= 10) return null;
  return (
    <div>
      <Row>
        <Col {...colProps}>
          <Divider />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        {count > newsLength ? (
          <Button type="default" className="middle-color" loading={loading} onClick={searchMore}>
            加载更多
          </Button>
        ) : (
          <span className="empty-tips">{emptyText}</span>
        )}
      </Row>
    </div>
  );
};

export default LoadMore;
