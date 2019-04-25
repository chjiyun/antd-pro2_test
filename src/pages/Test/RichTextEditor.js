import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Button } from 'antd';
import BraftEditor, { initEditorState } from '@/components/BraftEditor';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

@connect(({ test }) => ({
  newsDetail: test.newsDetail,
}))
@Form.create()
class RichTextEditor extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/searchNewsDetail',
      payload: 1,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;
    validateFields((error, values) => {
      if (!error) {
        const details = values.details && values.details.toRAW();
        console.log(values.details, details);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      newsDetail,
    } = this.props;
    console.log(newsDetail.details);
    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="文章正文">
            {getFieldDecorator('details', {
              initialValue: newsDetail.details && initEditorState(newsDetail.details),
              validateTrigger: 'onBlur',
              rules: [
                {
                  // required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      return callback('请输入正文内容');
                    }
                    return callback();
                  },
                },
              ],
            })(<BraftEditor placeholder="请输入正文内容" />)}
          </FormItem>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}

export default RichTextEditor;
