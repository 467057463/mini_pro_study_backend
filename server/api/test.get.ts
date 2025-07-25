export default defineEventHandler(async (event) => {
  const users = await prisma.post.findMany({
    where: {
      view: {
        gt: 20
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10,
    skip: 10
  });

  return responFormat(users)
})