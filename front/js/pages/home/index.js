import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import Upload from './upload';
import './home.less';

class Home extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showUpload: false
      }
    }

    handleClick = (url, e) => {
      e.preventDefault();
      //   const { history } = this.props;
      console.log(url);
      // history.push(url);
    }


    render() {
      return (
        <div className="home">
          {/* 上传组件 */}
          <Upload />
          <div className="col-wrap">
            <a className="block-a" href="javascript:;" >block1</a>
            <a className="block-a" href="javascript:;" >block2</a>
            <a className="block-a" href="javascript:;" >block3</a>
            <a className="block-a" href="javascript:;" >block4</a>
          </div>
        </div>
      );
    }
}

export default Home;