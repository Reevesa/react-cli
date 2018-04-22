
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
const { Header } = Layout;

class HeaderLayout extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <Header>
        <div className="user-info">Hello, 欢迎 用户1 ^_^</div>
        <div className="header-content">后台管理系统</div>
        <div className="login-box">
          <a className="logout-btn" onClick={handleLogout}>退  出</a>
        </div>
      </Header>
    );
  }
}

// HeaderLayout.PropTypes = {
//     handleLogout: PropTypes.func,
//     userInfo: PropTypes.object
// };

export default HeaderLayout;