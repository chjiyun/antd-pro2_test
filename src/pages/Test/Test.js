import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import Test2 from './Test2';

export default class Test extends Component {
  state = {
    count: 0,
    other: 1,
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      count: value,
    });
  };

  add = () => {
    const { other } = this.state;
    this.setState({
      other: other + 1,
    });
  };

  render() {
    const { count, other } = this.state;
    console.log('parent', count, other);
    return (
      <Card bordered={false}>
        <h2>parent</h2>
        <Input value={count} style={{ width: 260, marginRight: 24 }} onChange={this.onChange} />
        <Button type="primary" onClick={this.add}>
          加 1
        </Button>
        <Test2 count={count} other={other} />
      </Card>
    );
  }
}
