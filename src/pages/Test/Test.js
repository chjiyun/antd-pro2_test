import React, { Component } from 'react';
import { Card } from 'antd';
import ZoomImage from '@/components/ZoomImage';
import girl from '@/assets/girl_1.jpg';

export default class Test extends Component {
  componentDidMount() {}

  render() {
    return (
      <Card bordered={false}>
        <h2>测试放大镜</h2>
        <ZoomImage src={girl} alt="" />
      </Card>
    );
  }
}
