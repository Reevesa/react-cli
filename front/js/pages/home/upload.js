import React, { Component } from 'react';
import { Row, Col, message, Button } from 'antd';
import UploadModal from '../../components/uploadModal';
import './home.less';

const FILE_TYPE_MAP = {
  '01': '个人借款及担保申请表',
  '02': '借款意向确认书'
};

class Upload extends Component {

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

    /*** 引用上传 组件 */
    // 生成提示文字内容
    getUploadTips = () => {
        let fileTypeList = Object.keys(FILE_TYPE_MAP);
        return (
            <div className="tip-cont">
                <div>上传文件名必须为附件类型编号开头，例如
                    <strong>{`${fileTypeList[0]}XXX.jpg`}</strong>
                    或
                    <strong>{`${fileTypeList[0]}XXX.pdf`}</strong>
                    ，请按照如下列文字分类来命名文件
                </div>
                <ul>
                    {
                        fileTypeList.sort((a, b) => (a - b)).map(key => (
                            <li key={key}>{key}-{FILE_TYPE_MAP[key]}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }

    upload = () => {
      this.setState({
        showUpload: true
      });
    }

    handleUploadCancel = () => {
      this.setState({
        showUpload: false
      });
    }

    handleFileSubmit = (files) => {
      // 上传完成后清除
      this.uploader.handleClean();
    }

    checkFileName = (files) => {
      let fileTypeList = Object.keys(FILE_TYPE_MAP);
      let typeUnmatched = Array.from(files).filter(file => !fileTypeList.includes(file.name.substr(0, 2)));

      if (typeUnmatched.length > 0) {
          message.warn('所选文件类型编号不正确，请参考“附件类型说明”', 5);
          return false;
      }
      console.log('-checkFileName-');
      return true;
    }
    /**引用上传组件 结束 */

    render() {
      return (
        <div className="home">
          <Button type="primary" onClick={this.upload}>上传附件</Button>
          <UploadModal 
            ref={node => { this.uploader = node; }}
            tips={this.getUploadTips()}
            multiple={true}
            visible={this.state.showUpload} 
            onCancel={this.handleUploadCancel}
            onSubmit={this.handleFileSubmit}
            namePattern={/^\d{2}.*\.(jpg|png|pdf)$/i}
            beforeUpload={this.checkFileName}
            />
        </div>
      );
    }
}

export default Upload;