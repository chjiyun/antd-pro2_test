import React from 'react';
import { Row, Col, Divider } from 'antd';
import NewsItem from './NewsItem';
import LoadMore from './LoadMore';
import { mergeByTime } from '@/utils/utils';

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
        <div key={item.id}>
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
            linkTo={`/news/${item.id}`}
          />
        </div>
      );
    });
  });
  return (
    <section>
      {newsList}
      <LoadMore newsLength={data.length} colProps={{ span: 21, push: 2 }} {...otherProps} />
    </section>
  );
};

export default NewsList;
