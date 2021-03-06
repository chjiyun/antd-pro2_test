import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

class TagCloud extends React.Component {
  constructor() {
    super();
    this.state = {
      fontSizeRange: [12, 24],
      color: [
        '#9D9D9D',
        '#9BD133',
        '#01CAE6',
        '#DCDCDC',
        '#3A3A3A',
        '#44C49B',
        '#0E79E6',
        '#BA48E9',
        '#DE8047',
      ],
    };
  }

  shouldComponentUpdate(nextProps) {
    const { data = [] } = this.props;
    if (!data || !nextProps.data || !(data.length === nextProps.data.length)) {
      return true;
    }
    return false;
  }

  onTagClick = (name, data) => {
    const { click } = this.props;
    if (click) click(name, data);
  };

  getFontSize = () => {
    const { fontSizeRange: range } = this.state;
    const max = range[1];
    const min = range[0];
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  getColor = () => {
    const { color } = this.state;
    const index = Math.floor(Math.random() * color.length);
    return color[index];
  };

  getStyle = () => {
    return {
      fontSize: this.getFontSize(),
      color: this.getColor(),
    };
  };

  shuffle = input => {
    const result = input;
    for (let i = input.length - 1; i >= 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const itemAtIndex = input[randomIndex];
      result[randomIndex] = input[i];
      result[i] = itemAtIndex;
    }
    return result;
  };

  renderTagCloud = datas => {
    return this.shuffle(datas).map((data, index) => {
      const i = index;
      return (
        <Col
          className={styles.tag}
          key={`item-${i}`}
          style={this.getStyle()}
          onClick={() => this.onTagClick(data.name, data)}
        >
          {data.name}
        </Col>
      );
    });
  };

  render() {
    const { data = [] } = this.props;
    return (
      <div className={styles.wrap}>
        <Row type="flex" gutter={12} align="middle" justify="space-between">
          {this.renderTagCloud(data)}
        </Row>
      </div>
    );
  }
}

export default TagCloud;
