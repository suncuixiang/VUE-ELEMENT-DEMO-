import Mock from 'mockjs'
import userApi from './user'

Mock.mock(/\/user\/login/, 'post', userApi.userLogin)

Mock.mock(/\/user\/info/, 'get', userApi.userBaseInfo)

Mock.mock(/\/user\/signOut/, 'get', userApi.userSignOut)

Mock.mock(/\/user\/resetPass/, 'post', userApi.userResetPass)