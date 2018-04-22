/**
 * Request 是一个静态类,用于发请求，统一的请求管理*
 *
 * 支持
 * Request.get()
 * Request.post()
 * ...
 *
 * 方式调用.
 * Created by wython on 2017/12/6.
 */


import axios from 'axios';

export default class Request {
  /**
   * 获得一个instance
   * @param config
   * @return {AxiosInstance}
   */
  static create = config => {
    return axios.create(config);
  };
  /**
   * 发送get请求
   * @param url {string} 请求url
   * @param params {object} 请求参数对象
   * @return {Promise}
   */
  static get = async (url, params) => {
    try {
      const res = await axios.get(url, { params });
      if ( res.data && res.data.status === 'failed' && (res.data.code === '900001' || res.data.code === '900002' || res.data.code === '900003')) {
        window.location.href = '/login';
      }
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  /**
   * 发送post请求
   * @param url {string} 请求url
   * @param params {object} 请求参数对象
   * @return {Promise}
   */
  static post = async (url, params) => {
    try {
      const res = await axios.post(url, params);
      if ( res.data && res.data.status === 'failed' && (res.data.code === '900001' || res.data.code === '900002' || res.data.code === '900003')) {
        window.location.href = '/login';
      }
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  /**
   * 上传文件
   * @param url
   * @param data
   * @param opts
   * @return {Promise}
   */


    static upload = (url, data, opts) => {
      return new Promise((resolve, reject) => {
        axios.put(url, data, {
        // 上传百分比回调

          onUploadProgress: (progressEvent) => {
            opts.progress && opts.progress(Math.round(progressEvent.loaded * 100));
          }
        }).then(res => {
          if (!res.data.retCode === 'success') reject(res);
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    };

}
