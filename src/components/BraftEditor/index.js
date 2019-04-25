import React, { Component } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import { convertRawToHTML, convertHTMLToRaw } from 'braft-convert';
import Table from 'braft-extensions/dist/table';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';

BraftEditor.use([
  Table({
    defaultColumns: 3, // 默认列数
    defaultRows: 3, // 默认行数
    // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
    // excludeEditors: ['editor-id-2'], // 指定该模块对哪些BraftEditor无效
  }),
]);

const editorProps = {
  placeholder: '请输入正文内容',
  height: 500,
  contentFormat: 'raw',
  // initialContent: value,
  // onChange: this.handleChange,
  // onRawChange: this.handleRawChange,
  pasteMode: ['text'],
};
const controls = [
  'undo',
  'redo',
  'separator',
  'font-size',
  'font-family',
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
const media = {
  allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
  image: true, // 开启图片插入功能
  video: false, // 开启视频插入功能
  audio: false, // 开启音频插入功能
  // validateFn: this.validateFn, // 指定本地校验函数，说明见下文
  // uploadFn: this.uploadFn, // 指定上传函数，说明见下文
  removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
  // onRemove: this.onRemove, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
  onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
  onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
  externalMedias: {
    image: false,
    audio: false,
    video: false,
    embed: false,
  },
};

export default class Index extends Component {
  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { value, placeholder } = this.props;
    return (
      <div>
        <BraftEditor
          initialContent={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          controls={controls}
          media={media}
          {...editorProps}
        />
      </div>
    );
  }
}

// 富文本转换为 Html
export const richToHtml = text => {
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
// 转换为Raw 格式文本
export const convertToRaw = text => {
  let raw;
  if (text) {
    if (text.indexOf('entityMap') > -1) {
      raw = JSON.parse(text);
    } else {
      raw = convertHTMLToRaw(`<p>${text}</p>`);
    }
  } else {
    raw = convertHTMLToRaw(`<p></p>`);
  }
  return raw;
};
