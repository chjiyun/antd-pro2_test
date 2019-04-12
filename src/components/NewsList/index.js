import React from 'react';
import { Row, Col, Divider, Button } from 'antd';
import NewsItem from './NewsItem';
import { mergeByTime } from '@/utils/utils';

// 加载更多组件
const LoadMore = ({ count, newsLength, emptyText = '', loading, searchMore }) => {
  if (count <= 10) return null;
  return (
    <div>
      <Row>
        <Col span={21} push={2}>
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

// 新闻列表组件
const NewsList = ({ data = [], ...otherProps }) => {
  const mergeNews = mergeByTime(data, 'issueDate');
  const newsList = mergeNews.map((dates, datesIdx) => {
    return dates.map((item, index) => {
      const tags = item.tags
        ? item.tags
            .replace(/[()]/g, '')
            .split(/;|；/)
            .filter(word => word)
        : [];
      return (
        <div key={item.industryNews_id}>
          <Row>
            {datesIdx > 0 && index === 0 && (
              <Col span={23}>
                <Divider />
              </Col>
            )}
            {index > 0 && (
              <Col span={21} push={2}>
                <Divider />
              </Col>
            )}
          </Row>
          <NewsItem
            date={item.issueDate}
            showDate={index === 0}
            title={item.title}
            summary={item.summary}
            tags={tags}
            issuer={item.issuer}
            linkTo={{
              pathname: `/news/${item.industryNews_id}`,
              state: 'newsList',
            }}
          />
        </div>
      );
    });
  });
  return (
    <section>
      {newsList}
      <LoadMore {...otherProps} />
    </section>
  );
};

export default NewsList;
