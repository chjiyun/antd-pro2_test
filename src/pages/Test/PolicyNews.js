import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import NewsList from '@/components/NewsList/PolicyNewsList';
import SearchStatus from '@/components/NewsList/SearchStatus';
import NewsDraftList from '@/components/NewsList/NewsDraftList';
import BackTop from '@/components/BackTop';

@connect(({ test }) => ({
  policyNews: test.policyNews,
  policyCount: test.policyCount,
}))
class PolicyNews extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/searchPolicyNews',
    });
  }

  searchMore = () => {
    console.log('searchMore');
  };

  searchByIssuer = () => {};

  handleVisible = () => {};

  render() {
    const { policyNews, policyCount } = this.props;
    return (
      <PageHeaderWrapper title="政策组件测试" hiddenBreadcrumb>
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
                data={policyNews}
                count={policyCount}
                emptyText="没有更多政策了～"
                searchByIssuer={this.searchByIssuer}
                handleVisible={this.handleVisible}
                searchMore={this.searchMore}
              />
            </Col>
            <Col span={8}>
              <NewsDraftList data={policyNews.slice(0, 5)} style={{ marginTop: 8 }} />
            </Col>
          </Row>
        </Card>

        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default PolicyNews;
