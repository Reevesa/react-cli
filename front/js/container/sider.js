import React, { Component } from 'react';
import { Layout, Menu, Icon, } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

class SiderLayout extends Component {
  constructor(props) {
    super(props);

    const { history } = this.props;
    this.state = {
      collapsed: history.location.pathname !== '/',
      hasSet: false
    };
    console.log(this.props);
  }
    onCollapse = (collapsed) => {
      this.setState({ collapsed, hasSet: true });
    }
    getSelectedKeys() {
      const path = window.location.pathname.split('/')[1];
      return [ path ? '/' + path : '/' ];
    }
    handleSignOut = () => {
      console.log('退出');
    }
    handleResetPassWord = () => {
      console.log('重置密码');
    }
    renderMenu(menuConfig) {
      return menuConfig.map((menu, index) => {
        if (menu.noNav) return;
        return (
          <Menu.Item key={menu.path}>
            <Link to={menu.path}>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </Link>
          </Menu.Item>
        );
      });
      // console.log('menuConfig', menuConfig);
      // return menuConfig;
    }
    render() {
      const { menuConfig, username, history } = this.props;
      const { collapsed, hasSet } = this.state;
      // 首页 展开左侧 sideBar, 其他的 收缩
      const bCollapsed = hasSet ? collapsed : (history.location.pathname !== '/' && history.location.pathname !== '/home');
      let selectedKeys = this.getSelectedKeys()[0] === '/' ? [ '/home' ] : this.getSelectedKeys();
      console.log('--selectedKeys--', selectedKeys);
      return (
        <Sider
          collapsible
          collapsed={bCollapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" onClick={() => (location.href = '/')}>
            <img src={require('@/imgs/logo.png')} alt="" />
            <span style={{ color: '#fff' }}>此处放置 logo</span>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {this.renderMenu(menuConfig)}
          </Menu>
          <div className="loginUserContainer">
            <div className="siderBtn siderUsername">
              <span className="name">用户名{username}</span>
            </div>
            {/* <div className="siderBtn " onClick={this.handleResetPassword}>
              <a href="javascript:;" >修改密码</a>
            </div>
            <div className="siderBtn" onClick={this.handleSignOut} >
              <a href="javascript:;">退出登录</a>
            </div> */}
          </div>
        </Sider>
      );
    }
}

export default SiderLayout;