import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../../store/actions/user';
import LoginForm from '../../common/loginForm';
import ChangeForm from '../../common/changeForm';
import storage from '@/utils/storage.js';
import './loginPage.less';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changePass: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(params) {
    console.log('登录', this.props);
    const { dispatch, history } = this.props;
    // return await new Promise((resolve, reject) => {
    dispatch(login(params)).then(res => {
      console.log('登录数据传输');
      // 成功后
      storage.setLocal('userInfo', { isLogin: true });
      history.replace('/');
    });
      
    // });
  }

    handleChangePassword = () => {
      console.log('修改密码');
    }

    handleBackLogin = () => {
      this.setState({
        changePass: false
      });
    }

    render() {
      return (
        <div className="login-page">
          <header className="login-logo">
            <div className="login-header-content">
              <img src={require('@/imgs/logo.png')} />
            </div>
          </header>
          <div className="form-wrapper">
            <h1>后台管理系统</h1>
            <div className="form-bg">
              <header className="form-title">
                {
                  this.state.changePass ? '修改密码' : '·'
                }
              </header>
              {
                this.state.changePass ?
                  <ChangeForm ref="ChangeForm"
                    onChangePwd={this.handleChangePwd}
                    loading={this.state.loading}
                    handleBackLogin={this.handleBackLogin}
                  />
                  :
                  <LoginForm ref="loginForm" onSubmit={this.handleLogin} loading={this.state.loading} />
              }
            </div>
          </div>
          <footer className="login-footer">Copyright © 2018 后台管理系统</footer>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    // 传想要的数据
  };
}

export default connect(mapStateToProps)(LoginPage);