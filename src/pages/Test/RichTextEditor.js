import React, { Component } from 'react';
import { Card, Form, Button } from 'antd';
import BraftEditor from '@/components/BraftEditor';

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

@Form.create()
class RichTextEditor extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;
    validateFields((error, values) => {
      if (!error) {
        console.log(values.detail);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="文章正文">
            {getFieldDecorator('detail', {
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      callback('请输入正文内容');
                    } else {
                      callback();
                    }
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
