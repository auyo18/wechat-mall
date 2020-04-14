const ApiRootUrl = 'http://router.julipay.com:8000'

export default {
  IndexUrl: ApiRootUrl + '/home/index', // 首页数据接口

  ItemList: ApiRootUrl + '/item/list', // 首页项目列表
  RankList: ApiRootUrl + '/rank/list', // 首页热销榜列表

  CartList: ApiRootUrl + '/cart/list', // 购物车列表
  CartTotal: ApiRootUrl + '/cart/total', // 购物车商品总数量
  CartSelect: ApiRootUrl + '/cart/select', // 购物车选择商品
  CartSelectAll: ApiRootUrl + '/cart/selectAll', // 购物车全选/全反选商品
  CartChangeCount: ApiRootUrl + '/cart/changeCount', // 购物车商品更改数量
  Cartadd: ApiRootUrl + '/cart/add', // 商品加入购物车

  AuthLoginByWeixin: ApiRootUrl + '/auth/loginByWeiXin', // 微信登录
  AuthLoginByWeixinMobile: ApiRootUrl + '/auth/loginByWeXinMobile', // 微信手机号登录
  AuthLoginByAccount: ApiRootUrl + '/auth/login', // 账号登录
  AuthRegister: ApiRootUrl + '/auth/register', // 账号注册
  AuthReset: ApiRootUrl + '/auth/reset', // 账号密码重置
  Order: ApiRootUrl + '/auth/order'
}