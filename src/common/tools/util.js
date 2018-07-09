/**
 * @file 通用工具
 */

import axios from 'axios';
import {stringify} from 'qs';
import store from 'store'
import router from 'src/router'

/**
 * Ajax 请求
 * @param {string} method 类型: get, post
 * @param {string} url 请求地址
 * @param {Object} data 参数
 * @param {Object} options post请求的其他配置
 * @return {Promise} 返回Promise对象
 */
const ajax = (method, url, data, options = {}) => {
    const isPost = method === 'post';
    const sentOptions = {
        url,
        method,
        headers: {
        'Content-Type':''
    },
        ...options
    };

    if (isPost) {
        sentOptions.headers['Content-Type']
            = 'application/x-www-form-urlencoded';
        sentOptions.data = stringify(data);
    } else {
        sentOptions.params = data;
    }

    return axios(sentOptions)
        .then(res => res.data)
        .then(({retCode, retMsg, retData}) => {
            if (retCode === 12) {
                goUUAP();
            } else if (retCode === 22) {
                router.push({name: 'No-Auth'});
            }
            return retCode === 0
                ? Promise.resolve(retData)
                : Promise.reject(retMsg);
        })
        .catch(errMsg => {
            if (typeof errMsg === 'object') {
                console.error(errMsg);
                return Promise.reject(new Error('后台出错'));
            }
            return Promise.reject(errMsg);
        });
};

/**
 * GET 请求
 * @param {string} url 请求地址
 * @param {Object} data 参数
 * @return {Promise} get类型的ajax promise
 */
export const get = (url, data = {}) => {
    return ajax('get', url, data);
};

/**
 * POST 请求
 * @param {string} url 请求地址
 * @param {Object} data 参数
 * @param {Object} options post 选项
 * @return {Promise} post类型的ajax promise
 */
export const post = (url, data = {}, options = {}) => {
    return ajax('post', url, data, options);
};