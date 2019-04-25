import React, { Component } from 'react';
import { connect } from 'dva';
import NewsDetail from '@/components/NewsList/NewsDetail';

@connect(({ test }) => ({
  newsDetail: test.newsDetail,
  prevNews: test.prevNews,
  nextNews: test.nextNews,
}))
class NewsDetailWrap extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/searchNewsDetail',
      payload: 1,
    });
  }

  render() {
    const { newsDetail, prevNews, nextNews } = this.props;
    return (
      <div>
        <NewsDetail
          data={newsDetail}
          prevData={prevNews}
          nextData={nextNews}
          searchByIssuer={() => {}}
          getNearPolicy={() => {}}
        />
      </div>
    );
  }
}

export default NewsDetailWrap;
