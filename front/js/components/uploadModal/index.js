/**
 * 批量上传组件
 * 
 * @author: Andy
 * @since: 2017/01/17
 */

import './uploadModal.less';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { message, Button, Icon, Modal, Row, Col, Popover, Progress } from 'antd';
import * as File from '../../utils/file';

let _count = 0;     // 上传多文件时用作 uid.
let timer = null;   // 判断上传状态的间歇函数id

// TODO: 抽象出上传类

class BatchUploadModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],       // 列表中呈现的文件数组
            loading: false,     // 提交按钮加载状态
            disabled: true,     // 是否禁用提交按钮 
        };
        window.onunload = () => clearInterval(timer);
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    // 所选文件发生变化
    handleFileChange = (evt) => {
        if (!evt) return;

        const { beforeUpload, namePattern } = this.props;
        let { fileList } = this.state;
        let files = evt.target.files;         // 资源管理器中选中的文件列表
        let selectList = [];                  // 格式化后的文件列表

        // Reset file input's value
        this.fileInput.type = 'text';
        this.fileInput.type = 'file';
        console.log('---files--', files)
        // If beforeUpload returns false, stop uploading
        if (beforeUpload && !beforeUpload(files)) return false;

        // Filter out type unmatched files
        if (namePattern) {
            let prevLength = files.length;
            files = Array.from(files).filter(file => namePattern.test(file.name));
            if (files.length !== prevLength) {
                message.warning('已过滤文件类型不匹配的文件');
            }
        }

        if (!files.length) return false;

        selectList = files.map(file => {
            return {
                uid: ++_count,
                name: file.name,
                percent: 0,
                status: 'ready',
                content: ''
            };
        });

        // 将新选择的文件追加到列表尾部，并将提交按钮置为 loading & disabled 状态
        this.setState({
            fileList: fileList.concat(selectList),
            loading: true,
            disabled: true
        });

        console.log('---fileList--', fileList)

        // 压缩（如果需要）并上传所选文件
        files.forEach(async (file, idx) => {

            let res = await File.convertFile(file);
            console.log('---res--', res);
            if (res && res.status === 'success') {
                // request msg 具体实现逻辑 
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        disabled: false
                    });
                }, 3000);
            } else {
                message.error(res.msg);
            }
            
        });

        // 每隔一段时间（5min）查询附件的状态，如果一直是未启动上传，则视为失败；如果还有在上传中的，则继续传
        timer = setInterval(() => {
            let list = this.state.fileList.slice(0);
            let unfinished = 0;     // 未完成上传的附件个数

            list.forEach(file => {
                if (file.percent === 0 && file.status === 'ready') {
                    file.status = 'failed';
                }
                if (file.status === 'progress') {
                    unfinished += 1;
                }
            });

            // 如果所有文件已处理完，结束心跳
            if (unfinished === 0) clearInterval(timer);
            this.setState({
                fileList: list,
                loading: unfinished > 0,
                disabled: unfinished > 0
            });
            
        }, 5 * 60 * 1000);
        
    }

    // 点击浏览文件
    handleBrowse = () => {
        this.fileInput.click();
        this.fileInput.blur();
    }

    // 点击弹窗关闭
    handleCancel = () => {
        let { onCancel } = this.props;
        onCancel && onCancel();
    }
    
    // 点击清空按钮
    handleEmpty = () => {
        if (this.state.fileList.length === 0) return;
        this.setState({ fileList: [], disabled: true, loading: false });
    }

    // 清空已上传文件
    handleClean = () => {
        let unfinished = this.state.fileList.filter(file => file.status !== 'complete');
        console.log('--unfinished-', unfinished)
        this.setState({
            fileList: unfinished,
            loading: false,
            disabled: !unfinished.length
        });
    }

    // 点击提交
    handleSubmit = () => {
        
        let { fileList } = this.state;
        if (fileList.length === 0) return;
        // 提交前的校验, 可以重写
        let statusCountMap = {
            'ready': 0,
            'progress': 0,
            'complete': 0,
            'failed': 0
        };

        fileList.forEach(file => {
            statusCountMap[file.status] += 1;
        });

        if (statusCountMap['ready'] + statusCountMap['progress'] > 0) {
            return message.warning('尚有文件在上传中');
        } else if (statusCountMap['complete'] === 0) {
            return message.warning('没有可上传文件');
        } else {
            // 不要忘记解除禁用状态
            this.setState({ loading: true, disabled: true });
            let successList = fileList.filter(file => file.status === 'complete');
            this.props.onSubmit && this.props.onSubmit(successList);
        }
        
    }

    // 生成列表元素
    generateList = () => {
        const { fileList } = this.state;
        const statusMap = { 'complete': 'success', 'failed': 'exception' };
        return <ul>{
            fileList.map((file, idx) => <li key={idx}>
                <i className="anticon anticon-paper-clip"></i>
                <span>&nbsp;{file.name}</span>
                <Progress 
                    percent={file.percent}
                    strokeWidth={5}
                    status={statusMap[file.status] || 'normal'}
                />
            </li>)
        }</ul>;
    }

    render() {
        console.log('--this.state.disable--', this.state.disabled)
        const { visible, multiple, ...args } = this.props;
        const acceptArr = 'image/jpeg,image/png,application/pdf';      // TODO: 将允许类型抽出为参数
        
        return (
            <Modal
                visible={visible}
                title={args.title || '批量上传'}
                maskClosable={false}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="empty" onClick={this.handleEmpty}>清空</Button>,
                    <Button key="submit" type="primary"
                        loading={this.state.loading}
                        disabled={this.state.disabled}
                        onClick={this.handleSubmit}
                    >提交</Button>
                ]}
            >
                <input type="file" accept={acceptArr} 
                    ref={node => { this.fileInput = node; }} 
                    multiple={multiple}
                    onChange={this.handleFileChange}
                    style={{ display: 'none' }}
                />
                <Row type="flex" justify="space-between">
                    <Col>
                        <Button icon="folder-open" onClick={this.handleBrowse}>浏览</Button>
                    </Col>
                    <Col>
                        <Popover placement="rightTop" title="温馨提示：" content={args.tips}>
                            附件类型说明&ensp;<Icon type="question-circle-o" />
                        </Popover>
                    </Col>
                </Row>
                <div className="listContainer">{
                    this.generateList()
                }</div>
            </Modal>
        );
    }
}

BatchUploadModal.propTypes = {
    visible: PropTypes.bool.isRequired,       // 是否显示组件弹窗
    title: PropTypes.string,                  // 弹窗标题
    multiple: PropTypes.bool,                 // 是否支持多文件
    onCancel: PropTypes.func,                 // 点击取消
    onSubmit: PropTypes.func,                 // 点击提交
    beforeUpload: PropTypes.func,             // 执行上传前钩子
    namePattern: PropTypes.object             // 文件命名正则，如传入会对文件名检验
};

export default BatchUploadModal;