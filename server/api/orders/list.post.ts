export default defineEventHandler(async(event) => {
  const user = await useRquestUser(event);

  const res = await prisma.order.findMany({
    where: {
      customerId: user.id
    },
    include: {
      customer: {
        include: {
          address: true,
          profile: true
        }
      },
      products: true
    }
  })

  return responFormat(res, 0)
})