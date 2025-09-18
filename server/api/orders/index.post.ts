import { v4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const user = await useRquestUser(event);
  const { address, productIds, ...rest } = await readBody(event);

  // 产品列表
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds
      }
    },
    omit: {
      createdAt: true,
      updatedAt: true
    }
  })
  const price = products.reduce((prev, i) => {
    return prev + i.price
  }, 0)
  
  const orderId = v4()
  await prisma.$transaction([
    // 更新或创建地址
    prisma.address.upsert({
      where: {
        userId: user.id
      },
      update: {
        address
      },
      create: {
        userId: user.id,
        address
      }
    }),
    // 创建订单
    prisma.order.create({
      data: {
        ...rest,
        id: orderId,
        customerId: user.id,
        price: price,
      }
    }),
    prisma.productSnapshoot.createMany({
      data: products.map(({id, categoryId, ...res}) => ({...res, originId: id, orderId}))
    })
  ])

  return responFormat(null, 0)
})