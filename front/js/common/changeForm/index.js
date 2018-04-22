import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';


const FormItem = Form.Item;

class ChangeForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    passwordHadEnter: false
  };

  onChangePwd = (e) => {
    // 消除默认事件
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('修改密码信息');
      }
    });
  };

  checkConfirmInput = (rule, value, cb) => {
    const form = this.props.form;
    if (value && this.state.passwordHadEnter) {
      form.validateFields([ 'confirm' ], { force: true });
    }

    cb();
  };

  checkPassInput = (rule, value, cb) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      cb('两次密码输入不相同！');
    } else {
      cb();
    }
  };

  handlePasswordBlur = e => {
    const value = e.target.value;
    this.setState({ passwordHadEnter: this.state.passwordHadEnter || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onChangePwd} className="login-form change-form">
        <FormItem>
          {
            getFieldDecorator('oldPassword', {
              rules: [ { required: true, message: '请输入旧密码!' } ],
            })(
              <Input className="wk-input" prefix={<Icon type="user" style={{ color: '#fff' }} />} type="password" placeholder="旧密码" />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('newPassword', {
              rules: [ { required: true, message: '请输入新密码!' },
                {
                  validator: this.checkConfirmInput
                }
              ],
            })(
              <Input
                className="wk-input"
                prefix={<Icon type="lock" style={{ color: '#fff' }} />}
                type="password"
                placeholder="新密码"
                onBlur={this.handlePasswordBlur}
              />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('confirm', {
              rules: [ { required: true, message: '请确认新密码!' }, {
                validator: this.checkPassInput
              } ],
            })(
              <Input className="wk-input" prefix={<Icon type="lock" style={{ color: '#fff' }} />} type="password" placeholder="确认密码" />
            )
          }
        </FormItem>
        <FormItem className="cneter">
          <Button type="primary" htmlType="submit" className="change-form-button" loading={this.props.loading}>
            修改密码
          </Button>
          {
            this.props.handleBackLogin ?
              <div className="center">
                <a href="javascript:;" onClick={this.props.handleBackLogin} style={{ color: '#84b6e4' }}>登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
              </div>
              :
              ''
          }

        </FormItem>
      </Form>
    );
  }
}

const Change = Form.create({})(ChangeForm);
export default Change;
