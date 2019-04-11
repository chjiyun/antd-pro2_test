import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import NewsList from '@/components/NewsList';

@connect(({ test }) => ({
  news: test.news,
}))
class NewsListWrapper extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/searchNews',
    });
  }

  render() {
    const { news } = this.props;
    console.log(news);
    return (
      <PageHeaderWrapper title="新闻组件测试" hiddenBreadcrumb>
        <Card bordered={false} style={{ marginBottom: 24 }}>
          {/* <NewsList data={news} /> */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewsListWrapper;
