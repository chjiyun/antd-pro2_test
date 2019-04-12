import React from 'react';
import { Card, Icon } from 'antd';
import Link from 'umi/link';
import themeStyle from '@/theme/theme';
import styles from './NewsDraftList.less';

const NewsDraftList = ({ loading, data = [] }) => {
  return (
    <Card
      title={
        <span style={{ fontSize: 18 }}>
          <Icon type="printer" style={{ color: themeStyle.themeColor, marginRight: 8 }} />
          草稿箱
        </span>
      }
      extra={<Link to="/">查看全部</Link>}
      loading={loading}
      style={{ marginTop: 40 }}
      headStyle={{ padding: 0 }}
      bodyStyle={{ padding: '20px 0 0' }}
      bordered={false}
    >
      <ul className={styles.draftList}>
        {data.map(news => {
          return (
            <li key={news.industryNews_id}>
              <Link to={`/${news.industryNews_id}`} title={news.title}>
                {news.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default NewsDraftList;
