import React, { Fragment } from 'react';
import { Alert, Tag } from 'antd';
import themeStyle from '@/theme/theme';

const SearchStatus = ({ visible = false, count, tags = [], clearSearch, closeTag, style }) => {
  if (!visible) return null;
  return (
    <Alert
      type="info"
      message={
        <Fragment>
          <span>
            共
            <span
              style={{ color: themeStyle.themeColor, display: 'inline-block', margin: '0 8px' }}
            >
              {count}
            </span>
            条数据
          </span>
          <a style={{ marginLeft: 24 }} onClick={clearSearch}>
            清空
          </a>
          <span style={{ marginLeft: 16 }}>
            {tags.map((tag, idx) => {
              return (
                <Tag
                  key={`${tag}-${idx.toString(16)}`}
                  color="cyan"
                  closable
                  onClose={() => closeTag(tag)}
                >
                  {tag}
                </Tag>
              );
            })}
          </span>
        </Fragment>
      }
      style={style}
    />
  );
};

export default SearchStatus;
