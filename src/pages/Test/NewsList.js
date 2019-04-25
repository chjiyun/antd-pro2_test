import React, { PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import NewsList from '@/components/NewsList';
import SearchStatus from '@/components/NewsList/SearchStatus';
import NewsTags from '@/components/NewsList/NewsTags';
import NewsDraftList from '@/components/NewsList/NewsDraftList';
import BackTop from '@/components/BackTop';

@connect(({ test }) => ({
  news: test.news,
  tags: test.tags,
  count: test.count,
}))
class NewsListWrapper extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/searchNews',
    });
  }

  searchMore = () => {
    console.log('searchMore');
  };

  render() {
    const { news, tags, count } = this.props;
    return (
      <PageHeaderWrapper title="新闻组件测试" hiddenBreadcrumb>
        <Card bordered={false} style={{ marginBottom: 24 }}>
          <SearchStatus
            visible
            count={10}
            tags={['计算机通信', '股票', '融资公司']}
            style={{ marginTop: 24 }}
          />

          <Row gutter={48} style={{ paddingTop: 12 }}>
            <Col span={16}>
              <NewsList
                data={news}
                count={count}
                emptyText="没有更多新闻了～"
                searchMore={this.searchMore}
              />
            </Col>
            <Col span={8}>
              <NewsTags title="行业新闻" tags={tags} loading={false} />
              <NewsDraftList data={news.slice(0, 5)} loading={false} style={{ marginTop: 40 }} />
            </Col>
          </Row>
        </Card>

        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default NewsListWrapper;
