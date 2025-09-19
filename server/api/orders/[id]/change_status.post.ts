import { orderStatus } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const { status } = await readBody(event);

  const order = await prisma.order.findUniqueOrThrow({
    where: {id}
  })

  const statusList = Object.values(orderStatus)
  const currentIndex = statusList.indexOf(order.status)
  const index = statusList.indexOf(status);

  if(index - currentIndex != 1){
    return responFormat(null, 200002, '订单状态错误')
  }

  const res = await prisma.order.update({
    where: {
      id
    },
    data: {
      status
    }
  })
  return responFormat(res)
})