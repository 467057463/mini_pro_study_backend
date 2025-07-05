export function promiseWithResolvers(){
  let _resolve;
  let _reject;
  let status = 'pending'

  const promise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  })
  
  const resolve = (data) => {
    status = 'fulfilled'
    _resolve(data)
  }

  const reject = (data) => {
    status = 'rejected'
    _reject(data)
  }

  return {
    promise,
    status,
    resolve,
    reject
  }
}