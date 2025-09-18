export default defineEventHandler(async (event) => {
  const res = await prisma.category.findMany({
    where: {},
    include: {
      products: true
    }
  })

  return responFormat(res, 0)
})