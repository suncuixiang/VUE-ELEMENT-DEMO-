import axios from './index'

export function handleUserLogin(params={}){
    return axios.post('/user/login',params).then(result => {
        if(parseInt(result.code) === 0){
            return result.power;
        }
        return Promise.reject(result.codeText);
    });
}

export function queryBaseInfo(params = {}){
    return axios.get('/user/info',{
        params
    }).then(result => {
        if(parseInt(result.code)===0){
            return result.data;
        }
        return Promise.reject(result.codeText);
    });
}

export function signOut(){
    return axios.get('/user/signOut').then(result => {
        if(parseInt(result.code)===0){
            return true;
        }
        return Promise.reject(result.codeText);
    })
}

export function resetPass(option){
    let params = {};
    if(typeof option === 'number'){
        params.userId = option;
    }else if(typeof option === 'string'){
        params.password = option;
    }
    return axios.post('/user/resetPass',params).then(result => {
        if(parseInt(result.code)===0){
            return true;
        }
        return Promise.reject(result.codeText);
    })
}