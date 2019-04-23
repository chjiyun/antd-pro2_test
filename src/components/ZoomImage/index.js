import React, { Component } from 'react';
import styles from './index.less';

export default class ZoomImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floatSty: {
        opacity: 0,
      },
    };
    this.imgOffset = null;
  }

  componentDidMount() {
    this.img.onload = () => {
      this.imgOffset = this.getOffsetTop(this.img);
    };
  }

  getNode = node => {
    this.img = node;
  };

  getOffsetTop = ele => {
    let mOffsetTop = ele.offsetTop;
    let mOffsetLeft = ele.offsetLeft;
    let mOffsetParent = ele.offsetParent;
    while (mOffsetParent && mOffsetParent.nodeName !== 'BODY') {
      mOffsetTop += mOffsetParent.offsetTop;
      mOffsetLeft += mOffsetParent.offsetLeft;
      mOffsetParent = mOffsetParent.offsetParent;
    }
    return {
      left: mOffsetLeft,
      top: mOffsetTop,
    };
  };

  mouseEnter = e => {
    if (!this.imgOffset) return;
    this.setState({
      floatSty: {
        opacity: 1,
      },
    });
  };

  mouseLeave = e => {
    if (!this.imgOffset) return;
    this.setState({
      floatSty: {
        opacity: 0,
        transform: `translate(0, 0)`,
      },
    });
  };

  mouseMove = e => {
    if (!this.imgOffset) return;
    const x = e.clientX - this.imgOffset.left;
    const y = e.clientY - this.imgOffset.top;
    let fx = x - 50;
    let fy = y - 50;
    if (fx <= 0) {
      fx = 0;
    }
    if (fy <= 0) {
      fy = 0;
    }
    console.log(fx, fy);
    this.setState({
      floatSty: {
        opacity: 1,
        transform: `translate(${fx}px, ${fy}px)`,
      },
    });
  };

  render() {
    const { src, alt, title } = this.props;
    const { floatSty } = this.state;
    return (
      <div className={styles.wrap}>
        <img
          src={src}
          alt={alt}
          title={title}
          ref={this.getNode}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onMouseMove={this.mouseMove}
        />
        <div className={styles.float} style={floatSty} />
        <div className={styles.large} />
      </div>
    );
  }
}
