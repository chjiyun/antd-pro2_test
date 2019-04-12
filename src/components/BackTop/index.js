import React from 'react';
import { BackTop } from 'antd';
import styles from './index.less';

const GoBackTop = ({ visibilityHeight = 250, right = '20%' }) => {
  return (
    <BackTop visibilityHeight={visibilityHeight} style={{ right }}>
      <div className={styles.con} />
    </BackTop>
  );
};

export default GoBackTop;
