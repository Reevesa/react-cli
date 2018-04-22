import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, LocaleProvider } from 'antd';
import storage from '@/utils/storage.js';
import Sider from './sider';
const { Content, Footer } = Layout;
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './style.less';
import Header from './header';


class Container extends Component {
    static childContextTypes = {
      userInfo: PropTypes.array
    }
    constructor(props) {
      super(props);
    }
    getChildContext = () => {
      const { common } = this.props;
      return {
        ...common
      };
    }
    componentDidMount() {
      const { dispatch } = this.props;
      // dispatch
    }
    handleLogout = () => { 
      const { history } = this.props;
      storage.delLocal('userInfo');
      history.replace('/');
    }
    render() {
      const username = 'user';
      const { formatRoutes } = this.props;

      return (
        <LocaleProvider locale={zh_CN}>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider {...this.props} username={username} menuConfig={formatRoutes} className="leftSider" />
            <Layout className="flexColumnContainer">
              <Header handleLogout={this.handleLogout} />
              <Content>
                <div className="main mt15 ml15 flexColumnContainer">
                  {
                    this.props.children
                  }
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>版权所有</Footer>
            </Layout>
          </Layout>
        </LocaleProvider>
      );
    }
}

export default Container;