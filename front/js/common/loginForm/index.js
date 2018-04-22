import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import './login.less';
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  onLogin = (e) => {
    // 消除默认事件
    e.preventDefault();
    const { onSubmit } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('登录信息', values);
        onSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onLogin} className="box login-form">
        <FormItem>
          {
            getFieldDecorator('username', {
              rules: [ { required: true, message: '请输入用户名!' } ],
            })(
              <Input className="wk-input" prefix={<Icon type="user" style={{ color: '#fff' }} />} placeholder="用户名" />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password', {
              rules: [ { required: true, message: '请输入密码!' } ],
            })(
              <Input className="wk-input" prefix={<Icon type="lock" style={{ color: '#fff' }} />} type="password" placeholder="密码" />
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.loading}>
            登&nbsp;&nbsp;&nbsp;&nbsp;录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create({})(LoginForm);
export default connect()(Login);
