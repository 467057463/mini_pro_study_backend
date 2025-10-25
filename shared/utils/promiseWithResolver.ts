export function promiseWithResolver(){
  let _resolve;
  let _reject;
  let _status = 'pending';
  const _promise = new Promise((resolve, reject) => {
    _resolve = (value) => {
      _status = "fulfilled";
      resolve(value)
    }
    _reject = (reason) => {
      _status = "rejected";
      reject(reason)
    }
  })
  return Object.freeze({
    get promise(){
      return _promise
    },

    get resolve(){
      return _resolve
    },

    get reject(){
      return _reject
    },

    get status(){
      return _status
    }
  })
}