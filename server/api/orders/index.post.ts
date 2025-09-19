// @ts-nocheck
import { v4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const user = await useRquestUser(event);
  const { address, phone, productList, type, dispatchTime, remark } = await readBody(event);

  const productIds = Object.keys(productList).map(Number)
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

  // 验证库存
  const notEnoughProducts = products.filter(i => i.count < productList[i.id]);
  if(notEnoughProducts.length){
    return responFormat(notEnoughProducts.map(i => i.id), 200001, '商品库存不足')
  }

  // 计算价格
  const price = products.reduce((prev, i) => {
    return prev + i.price * productList[i.id]
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
    // 更新联系方式
    prisma.profile.upsert({
      where: {
        userId: user.id
      },
      update: {
        phone
      },
      create: {
        userId: user.id,
        phone
      }
    }),
    // 创建订单
    prisma.order.create({
      data: {
        id: orderId,
        customerId: user.id,
        price: price,
        type, 
        dispatchTime: new Date(dispatchTime), 
        remark,
      }
    }),
    // 创建订单商品快照
    prisma.productSnapshoot.createMany({
      data: products.map(({id, categoryId, ...res}) => ({
        ...res, 
        originId: id, 
        orderId, 
        count: productList[id]
      }))
    }),
    // 更新商品库存
    ...products.map(i => {
      return prisma.product.update({
        where: {
          id: i.id
        },
        data: {
          count: {
            decrement: productList[i.id]
          }
        }
      })
    })
  ])

  return responFormat(null, 0)
})