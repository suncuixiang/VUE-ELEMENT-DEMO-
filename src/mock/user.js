import Mock from 'mockjs'

function params2Obj(params) {
    // const search = params.split('?')[1];
    if (!params) return {};
    return JSON.parse(
        '{"' +
        params.replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

export default {
    userLogin:config => {
        return {
            code: 0,
            codeText:'OK',
            power:''
        }
    },
    userResetPass:config => {
        return {
            code: 0,
            codeText:'OK',
            power:''
        }
    },
    userSignOut:config => {
        return {
            code: 0,
            codeText:'OK'
        }
    },
    userBaseInfo:config => {
        return {
            code: 0,
            codeText:'OK',
            data:{
                id: Mock.Random.integer(0, 10),
                name: Mock.Random.cname(),
                sex: Mock.Random.integer(0, 1)
            }
        }
    }
}