export default defineEventHandler(async (event) => {
  const res = await prisma.category.findMany({
    where: {},
    include: {
      products: {
        where: {
          status: 'normal'
        }
      }
    }
  })

  return responFormat(res, 0)
})