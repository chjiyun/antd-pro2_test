import React, { Component } from 'react';
import styles from './index.less';

export default class ZoomImage extends Component {
  constructor(props) {
    super(props);
    const zoom = props.zoom || 2;
    this.state = {
      floatSty: {
        opacity: 0,
      },
      largeSty: {
        opacity: 0,
        width: (props.wrapStyle && props.wrapStyle.width) || undefined,
        height: (props.wrapStyle && props.wrapStyle.height) || undefined,
      },
      largeImg: {
        transform: `scale(${zoom})`,
      },
      zoom,
    };
    this.imgOffset = null;
  }

  componentDidMount() {
    const { zoom } = this.state;
    this.img.onload = () => {
      const offset = this.getOffsetTop(this.img);
      const cw = this.float.clientWidth;
      const ch = this.float.clientHeight;
      const iw = this.img.clientWidth;
      const ih = this.img.clientHeight;
      this.imgOffset = {
        cLeft: iw - cw,
        cTop: ih - ch,
        left: offset.left + cw / 2,
        top: offset.top + ch / 2,
      };
      // 被放大图片宽高-容器宽高 / 图片容器宽高 - float宽高 = 缩放比
      this.ratio = {
        x: (iw * zoom - iw) / (iw - cw),
        y: (ih * zoom - iw) / (ih - cw),
      };
    };
  }

  // getNode = node => {
  //   this.img = node;
  // };

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

  mouseEnter = () => {
    if (!this.imgOffset) return;
    const { largeSty } = this.state;
    this.setState({
      floatSty: {
        opacity: 1,
      },
      largeSty: {
        ...largeSty,
        opacity: 1,
        visibility: 'visible',
      },
    });
  };

  mouseLeave = () => {
    if (!this.imgOffset) return;
    const { zoom, largeSty } = this.state;
    this.setState({
      floatSty: {
        opacity: 0,
        transform: `translate(0, 0)`,
      },
      largeSty: {
        ...largeSty,
        opacity: 0,
        visibility: 'hidden',
      },
      largeImg: {
        transform: `translate(0, 0) scale(${zoom})`,
      },
    });
  };

  mouseMove = e => {
    const offset = this.imgOffset;
    const { zoom } = this.state;
    if (!offset) return;
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > offset.cLeft) x = offset.cLeft;
    if (y > offset.cTop) y = offset.cTop;
    const ix = 0 - x * this.ratio.x;
    const iy = 0 - y * this.ratio.y;
    this.setState({
      floatSty: {
        opacity: 1,
        transform: `translate(${x}px, ${y}px)`,
      },
      largeImg: {
        transform: `translate(${ix}px, ${iy}px) scale(${zoom})`,
      },
    });
  };

  render() {
    const { src, alt, title, wrapStyle } = this.props;
    const { floatSty, largeSty, largeImg } = this.state;
    return (
      <div className={styles.wrap} style={wrapStyle}>
        <img
          src={src}
          alt={alt}
          title={title}
          ref={node => {
            this.img = node;
          }}
          draggable="false"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onMouseMove={this.mouseMove}
        />
        <div
          className={styles.float}
          style={floatSty}
          ref={node => {
            this.float = node;
          }}
        />
        <div className={styles.large} style={largeSty}>
          <img src={src} draggable="false" alt="" style={largeImg} />
        </div>
      </div>
    );
  }
}
