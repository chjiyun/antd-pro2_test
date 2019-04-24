import React, { Component } from 'react';
import { Card } from 'antd';
import ZoomImage from '@/components/ZoomImage';
import dog from '@/assets/dog.jpg';

export default class Test extends Component {
  componentDidMount() {}

  render() {
    return (
      <Card bordered={false}>
        <h2>放大镜</h2>
        <ZoomImage zoom={2.4} src={dog} alt="" />
      </Card>
    );
  }
}
