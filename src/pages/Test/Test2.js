import React, { Component } from 'react';

export default class Test2 extends Component {
  state = {
    count: 0,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.count !== state.count) {
      return {
        count: props.count,
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps) {
    const { count } = this.state;
    if (nextProps.count !== count) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    const { other } = this.props;
    if (prevProps.other !== other) {
      console.log(other);
    }
  }

  render() {
    const { count } = this.state;
    console.log('children render', this);
    return (
      <div>
        <h3>children</h3>
        <span style={{ fontSize: 30, color: 'salmon' }}>{count}</span>
      </div>
    );
  }
}
