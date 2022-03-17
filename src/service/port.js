import Vue from 'vue'

import axios from 'axios'
let v = new Vue()
// http request 拦截器
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = sessionStorage.getItem('token') || ''
    // config.headers.common['X-Token'] = sessionStorage.getItem('token') || ''
    return config
}, function (err) {
    return Promise.reject(err)
})
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.status) {
            if (response.data.status === '5000' || response.data.status === '5001') {
                v.$message.error('未登录')
                sessionStorage.clear()
                location.href = '#/login'
            }
        }
        return response
    },
    error => {
        // if (error.response) {
        //   switch (error.response.status) {
        //     case 403:
        //       // 跳转到登录页面
        //       router.replace({
        //         path: '/'
        //       })
        //   }
        // }
        // 返回接口返回的错误信息
        // return Promise.reject(error.response.data)
        return Promise.reject(error)
    })
export function getAxios (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
export function postAxios (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
export function putAxios (url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
export function deleteAxios (url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
