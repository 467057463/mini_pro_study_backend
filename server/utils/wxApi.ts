import wRequest from "./wRequest";

export const getWxUserSession = (data = {}) => {
  return wRequest.get("/sns/jscode2session", {
    query: {
      ...data,
      grant_type: "authorization_code"
    }
  }, {
    needSecret: true
  })
}

export function getAccessToken(){
  return wRequest.get('/cgi-bin/token', {
    query: {
      grant_type: "client_credential"
    }
  }, {
    needSecret: true
  })
}

export function createActivity(){
  return wRequest.get('/cgi-bin/message/wxopen/activityid/create',{}, {needToken: true})
}

export function updateActivityMsg(data){
  return wRequest.post('/cgi-bin/message/wxopen/updatablemsg/send', {body: data}, {needToken: true})
}

export function sendMessage(data){
  return wRequest.post('/cgi-bin/message/subscribe/send', {body: data}, {needToken: true})
}