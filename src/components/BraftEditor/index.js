import React, { Component } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import { convertRawToHTML } from 'braft-convert';
import Table from 'braft-extensions/dist/table';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import styles from './index.less';

// 初始化表格扩展
BraftEditor.use([
  Table({
    defaultColumns: 4, // 默认列数
    defaultRows: 4, // 默认行数
    // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
    // excludeEditors: ['editor-id-2'], // 指定该模块对哪些BraftEditor无效
  }),
]);

// 为了增加编辑器的可扩展性，同时避免传入一大堆onXxxx之类的属性，编辑器增加了hooks属性
// 更多钩子请查看：https://www.yuque.com/braft-editor/be/gz44tn#gug9gs
const hooks = {
  // 为设置文字链接时自动补全协议
  'toggle-link': ({ href, target }) => {
    const newHref = href.indexOf('http') === 0 ? href : `http://${href}`;
    return { href: newHref, target };
  },
};

// 编辑器自身不带有上传功能，具体的上传功能需要通过uploadFn指定。
// 编辑器在调用media.uploadFn时，会传入一个包含文件体、文件在媒体库的ID、进度回调、成功回调和失败回调的对象作为参数
const uploadFn = param => {
  const serverURL = '/api/file/upload';
  const xhr = new XMLHttpRequest();
  const fd = new FormData();

  const successFn = response => {
    // 上传成功后调用param.success并传入上传后的文件地址
    console.log('response', response);
    const res = JSON.parse(xhr.responseText);
    if (!res || res.code !== 0) return;
    param.success({
      url: `/api/file/${res.data.file_id}`,
      meta: {
        id: res.data.filename,
        title: param.file.name,
        alt: param.file.name,
        // loop: true, // 指定音视频是否循环播放
        // autoPlay: true, // 指定音视频是否自动播放
        // controls: true, // 指定音视频是否显示控制栏
        // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
      },
    });
  };

  const progressFn = event => {
    // 上传进度发生变化时调用param.progress
    param.progress((event.loaded / event.total) * 100);
  };

  const errorFn = response => {
    // 上传发生错误时调用param.error
    param.error({
      msg: response ? response.msg : '上传失败',
    });
  };

  xhr.upload.addEventListener('progress', progressFn, false);
  xhr.addEventListener('load', successFn, false);
  xhr.addEventListener('error', errorFn, false);
  xhr.addEventListener('abort', errorFn, false);

  fd.append('file', param.file);
  xhr.open('POST', serverURL, true);
  xhr.send(fd);
};

// 其他属性
const editorProps = {
  placeholder: '请输入正文内容',
  height: 500,
  contentFormat: 'raw',
  hooks,
  // onChange: this.handleChange,
  // colors: [], // 指定编辑器可用的颜色列表，仅支持16进制颜色字符串
  // onRawChange: this.handleRawChange,
  // pasteMode: ['text'],
};

// 控件功能
const controls = [
  'undo',
  'redo',
  'separator',
  'font-size',
  'font-family', // 考虑到系统平台之间的差异，实际上不太推荐在富文本中设置文字字体
  'line-height',
  'letter-spacing',
  'separator',
  // 'indent',
  'text-color',
  'bold',
  'italic',
  'underline',
  'strike-through',
  'superscript',
  'subscript',
  'remove-styles',
  'emoji',
  'separator',
  'text-indent',
  'text-align',
  'separator',
  'headings',
  'list-ul',
  'list-ol',
  'blockquote',
  'code',
  'separator',
  'media',
  'link',
  'hr',
  'separator',
  'table',
  'fullscreen',
  'clear',
];

// 多媒体属性
const media = {
  // 该函数用于校验从本地选择的媒体文件，可以是一个普通函数，也可以是一个Promise对象，校验不通过的媒体文件将不会被添加到媒体库中。
  validateFn: file => {
    return file.size < 1024 * 1024 * 2;
  },
  // uploadFn: uploadFn,
  pasteImage: true, // 是否允许粘贴图片到编辑
  accepts: {
    image: 'image/png,image/jpeg,image/gif,image/webp',
    video: false, // 'video/mp4'
    audio: false, // 'audio/mp3'
  },
  // onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
  // onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
  externals: {
    image: false,
    audio: false,
    video: false,
    embed: false,
  },
};

// 富文本转换为 Html
export const convertToHtml = text => {
  let innerHtml = null;
  if (text) {
    if (text.indexOf('entityMap') > -1) {
      innerHtml = convertRawToHTML(JSON.parse(text));
    } else if (text && text.indexOf('<p>') >= -1) {
      innerHtml = text;
    }
  }
  const createMarkup = () => {
    return { __html: innerHtml };
  };
  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

// 转换为 EditorState 对象（废弃，用下面的方法）
// export const convertToEditorState = text => {
//   let raw;
//   if (text) {
//     if (text.indexOf('entityMap') > -1) {
//       raw = convertRawToEditorState(JSON.parse(text));
//     } else {
//       raw = convertHTMLToEditorState(`<p>${text}</p>`);
//     }
//   } else {
//     raw = convertHTMLToEditorState(`<p></p>`);
//   }
//   return raw;
// };

// 转换 Raw | Text | Html | null 格式文本 为 editorState 对象
export const initEditorState = text => {
  return BraftEditor.createEditorState(text);
};

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.value) {
      console.log(props.value);
      return {
        value: props.value,
      };
    }
    return null;
  }

  // getInstance = instance => {
  //   this.editorInstance = instance;
  // };

  handleChange = editorState => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(editorState);
    }
  };

  handleBlur = editorState => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(editorState);
    }
  };

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    // console.log(value);
    return (
      <BraftEditor
        className={styles.editor}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        controls={controls}
        media={media}
        // ref={this.getInstance}
        {...editorProps}
      />
    );
  }
}
