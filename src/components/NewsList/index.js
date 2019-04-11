import React, { PureComponent } from 'react';
import { Row, Col, Divider } from 'antd';
import NewsItem from './NewsItem';
import { mergeByTime } from '@/utils/utils';

export default class NewsList extends PureComponent {
  render() {
    const { data = [] } = this.props;
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
          <Row key={item.industryNews_id}>
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
            <Row>
              <NewsItem
                item={item}
                date={item.issueDate}
                showDate={index === 0}
                title={item.title}
                summary={item.summary}
                tags={tags}
                name={item.issuer}
                linkTo={{
                  pathname: `/news/${item.industryNews_id}`,
                  state: 'newsList',
                }}
              />
            </Row>
          </Row>
        );
      });
    });
    return (
      <section>
        <Row gutter={48}>
          <Col span={16}>{newsList}</Col>
          <Col span={8}>2</Col>
        </Row>
      </section>
    );
  }
}
