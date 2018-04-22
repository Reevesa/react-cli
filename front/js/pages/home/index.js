import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './home.less';

class Home extends Component {

    handleClick = (url, e) => {
      e.preventDefault();
      //   const { history } = this.props;
      console.log(url);
      // history.push(url);
    }

    render() {
      return (
        <div className="home">
          <div className="col-wrap">
            <a className="block-a" href="javascript:;" >block1</a>
            <a className="block-a" href="javascript:;" >block2</a>
            <a className="block-a" href="javascript:;" >block3</a>
            <a className="block-a" href="javascript:;" >block4</a>
          </div>
          {/* <Row>
            <Col className="col-wrap" span={6}>
              <a className="block-a" href="javascript:;" >
                                block1
              </a>
            </Col>
            <Col className="col-wrap" span={6}>
              <a className="block-a" href="javascript:;" >
                                block2
              </a>
            </Col>
            <Col className="col-wrap" span={6}>
              <a className="block-a" href="javascript:;" >
                                block3
              </a>
            </Col>
            <Col className="col-wrap" span={6}>
              <a className="block-a" href="javascript:;" >
                                block4
              </a>
            </Col>
          </Row> */}
        </div>
      );
    }
}

export default Home;