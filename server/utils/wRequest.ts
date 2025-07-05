import { ofetch } from "ofetch";

const baseURL = 'https://api.weixin.qq.com';

const Request = ofetch.create({
  baseURL,
  responseType: "json"
})

const wRequest = async (url: string, option: any = {}, config:any = {}) => {
  const runtimeConfig = useRuntimeConfig();
  if(config.needToken){
    const res = await wxLoadAccessToken()
    console.log(res)
    option.query =  option.query ?? {}
    option.query.access_token = res.access_token
  }
  if(config.needSecret){
    option.query = option.query ?? {}
    option.query.appid = runtimeConfig.wxAppId;
    option.query.secret = runtimeConfig.wxAppSecret;
  }
  console.log(option)

  return Request(url, option)
};

["get", "post"].forEach(item => {
  wRequest[item] = (url, option, config) => {

    return wRequest(url, {
      ...option,
      method: item
    }, config)
  }
})

export default wRequest 