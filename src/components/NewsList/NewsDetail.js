import React from 'react';
import { Card, Row, Col } from 'antd';
import moment from 'moment';
import { richToHtml } from '@/components/BraftEditor';
import styles from './NewsDetail.less';

const layout = {
  xs: {
    span: 22,
    offset: 1,
  },
  sm: {
    span: 20,
    offset: 2,
  },
  md: {
    span: 18,
    offset: 3,
  },
  lg: {
    span: 16,
    offset: 4,
  },
};

/**
 * tags 新闻标签
 */
const initTags = tags => {
  return tags
    .replace(/[()]/g, '')
    .split(';')
    .map((v, i) => <span key={i.toString(16)}>{v}</span>);
};

/**
 * 新闻具体详情
 */
const NewsDetail = ({ loading, data = {}, prevData, nextData, searchByIssuer, getNearPolicy }) => {
  return (
    <Card bordered={false} loading={loading}>
      <Row>
        <Col {...layout}>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.info}>
            {searchByIssuer ? (
              <a onClick={() => searchByIssuer(data.issuer)}>{data.issuer}</a>
            ) : (
              <span>{data.issuer}</span>
            )}
            {data.issueDate && (
              <span className={styles.date}>{moment(data.issueDate).format('YYYY-MM-DD')}</span>
            )}
          </div>
          <div className={styles.richText}>{richToHtml(data.details)}</div>
          {data.url && (
            <div className={styles.reference}>
              {`本文参考了多个信息来源：["${data.url}"]，如若转载请注明出处。`}
            </div>
          )}
          {data.tags && <div className={styles.tags}>{initTags(data.tags)}</div>}
          <div className={styles.pagination}>
            <div className={styles.previous}>
              <span>上一篇：</span>
              {prevData ? (
                <span className={styles.highlight} onClick={() => getNearPolicy(prevData.id)}>
                  {prevData.title}
                </span>
              ) : (
                <span>没有更多了~</span>
              )}
            </div>
            <div className={styles.next}>
              <span>下一篇：</span>
              {nextData ? (
                <span className={styles.highlight} onClick={() => getNearPolicy(nextData.id)}>
                  {nextData.title}
                </span>
              ) : (
                <span>没有更多了~</span>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default NewsDetail;
