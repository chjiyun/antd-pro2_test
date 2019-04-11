import React from 'react';
// import { Link } from 'dva/router';
import Link from 'umi/link';
import { Row, Col } from 'antd';
import moment from 'moment';
import styles from './index.less';

const NewsItem = ({ showDate, title, summary, date, tags = [], name = '', linkTo, linkTarget }) => {
  const dateObj = moment(date);
  console.log(dateObj);
  return (
    <Row type="flex" className={styles.itemWrap}>
      <Row className={styles.leftWrap}>
        {date && showDate && (
          <Row className={styles.leftContent}>
            <Row className={styles.day}>
              {
                moment(date)
                  .format('YYYY-MM-DD')
                  .split('-')[2]
              }
            </Row>
            <Row className={styles.month}>
              {
                moment(date)
                  .format('YYYY-MM-DD')
                  .split('-')[1]
              }
              月
            </Row>
          </Row>
        )}
      </Row>
      <Row className={styles.rightWrap}>
        <div className={styles.title}>
          <Link to={linkTo} target={linkTarget}>
            {title}
          </Link>
        </div>
        <div className={styles.content}>{summary}</div>
        <Row className={styles.other}>
          <Col span={12}>
            {name} · {moment(date).fromNow()}
          </Col>
          <Col span={12}>
            <img alt="" className={styles.tagImg} src="/images/park-news-label.png" />
            {tags &&
              tags.map((item, idx) => {
                return (
                  <span key={`item-${item}`}>
                    {idx === 0 ? '' : '；'}
                    {item}
                  </span>
                );
              })}
          </Col>
        </Row>
      </Row>
    </Row>
  );
};

export default NewsItem;
