import React from 'react';
import Link from 'umi/link';
import { Divider } from 'antd';
import moment from 'moment';
import Ellipsis from '@/components/Ellipsis';
import LoadMore from './LoadMore';
import styles from './PolicyNewsList.less';

const NewsItem = ({
  title,
  summary,
  date,
  tags = [],
  issuer = '',
  linkTo,
  linkTarget,
  searchByIssuer,
  handleVisible,
}) => {
  return (
    <div className={styles.item}>
      <h2 className={styles.title}>
        <Link to={linkTo} target={linkTarget}>
          {title}
        </Link>
      </h2>
      <div className={styles.tags}>{tags}</div>
      <div className={styles.summary}>
        <Ellipsis lines={3}>{summary}</Ellipsis>
      </div>
      <div className={styles.info}>
        <a onClick={() => searchByIssuer(issuer)}>{issuer}</a>
        <span>{date}</span>
      </div>
      <div>
        <span className={styles.extra} onClick={handleVisible}>
          <i className="iconfont icon-qiye-apply" />
          可申请企业
        </span>
      </div>
    </div>
  );
};

// 政策新闻列表
const PolicyNews = ({ data = [], searchByIssuer, handleVisible, ...otherProps }) => {
  const newsList = data.map((item, index) => {
    const tags =
      item.tags &&
      item.tags
        .replace(/[()]/g, '')
        .split(/;|；/)
        .map((v, i) => <span key={i.toString(16)}>{v}</span>);
    return (
      <div key={item.id}>
        {index > 0 && <Divider />}
        <NewsItem
          title={item.title}
          date={item.issueDate && moment(item.issueDate).format('YYYY-MM-DD')}
          summary={item.summary}
          tags={tags}
          issuer={item.issuer}
          linkTo={`/news/${item.id}`}
          searchByIssuer={searchByIssuer}
          handleVisible={handleVisible}
        />
      </div>
    );
  });
  return (
    <section style={{ marginTop: 22 }}>
      {newsList}
      <LoadMore newsLength={data.length} colProps={{ span: 24 }} {...otherProps} />
    </section>
  );
};

export default PolicyNews;
