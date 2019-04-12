import React from 'react';
// import { Link } from 'dva/router';
import Link from 'umi/link';
import { Row, Col } from 'antd';
import moment from 'moment';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';
import label from '@/assets/news_label.png';

const NewsItem = ({
  showDate,
  title,
  summary,
  date,
  tags = [],
  issuer = '',
  linkTo,
  linkTarget,
}) => {
  const dateObj = moment(date);
  const tagList = tags.length > 0 ? tags.join('；') : null;
  return (
    <Row type="flex" className={styles.itemWrap}>
      <div className={styles.leftWrap}>
        {date && showDate && (
          <div className={styles.dateCard}>
            <div className={styles.day}>{dateObj.date()}</div>
            <div className={styles.month}>{dateObj.month() + 1}月</div>
          </div>
        )}
      </div>
      <div className={styles.rightWrap}>
        <div className={styles.title}>
          <Link to={linkTo} target={linkTarget}>
            {title}
          </Link>
        </div>
        <div className={styles.summary}>
          <Ellipsis lines={3}>{summary}</Ellipsis>
        </div>
        <Row className={styles.other}>
          <Col span={12}>
            {issuer} · {dateObj.fromNow()}
          </Col>
          {tagList && (
            <Col span={12}>
              <img alt="label" className={styles.label} src={label} />
              <span>{tagList}</span>
            </Col>
          )}
        </Row>
      </div>
    </Row>
  );
};

export default NewsItem;
