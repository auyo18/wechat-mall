const ApiRootUrl = 'http://192.168.50.3:8000'

export default {
  IndexUrl: ApiRootUrl + '/home/index', // 首页数据接口

  ItemList: ApiRootUrl + '/item/list', // 首页项目列表

  AuthLoginByWeixin: ApiRootUrl + '/auth/loginByWeiXin', // 微信登录
  AuthLoginByWeixinMobile: ApiRootUrl + '/auth/loginByWeXinMobile', // 微信手机号登录
  AuthLoginByAccount: ApiRootUrl + '/auth/login', // 账号登录
  AuthRegister: ApiRootUrl + '/auth/register', // 账号注册
  AuthReset: ApiRootUrl + '/auth/reset', // 账号密码重置
  Order: ApiRootUrl + '/auth/order'
}