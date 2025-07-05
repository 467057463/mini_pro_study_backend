export default defineEventHandler(async () => {
  const res = await sendMessage({
    template_id: 'TtI92qcaZkzC7Da_i6A3Vxz2UNU72QmM_X-NGE2XHTY',
    page: 'message/index?test=1111',
    touser: 'oCgld5Yo1nyWf5fuHEyaIxL8sryo',
    data: {
      thing1: {
        value: 'aaaaa'
      },
      character_string16: {
        value: 'bbbb'
      },
      thing18: {
        value: 'ccccc'
      }
    }
  })
  console.log(res)
  return responFormat('success')
})