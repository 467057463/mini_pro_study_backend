export default defineEventHandler(async(event) => {
  const { category, condition, keyword, size = 20, page = 1, ...res } = getQuery(event);

  const query = keyword ? 
    {
      [category as string]: {
        [condition as string]: keyword
      }
    } : {};
  
  const [list, count] = await prisma.$transaction([
    prisma.setting.findMany({
      skip: (Number(page) - 1) * Number(size),
      take: Number(size),
      orderBy: {
        createdAt: "desc"
      },
      where: query
    }),
    prisma.setting.count({
      where: query
    })
  ])


  return responFormat({list, count}, 0)
})