export default defineEventHandler(async (event) => {
  const users = await prisma.post.groupBy({
    by: ['authorId', "status"],
    where: {
      view: {
        gte: 20
      }
    },
    // having: {
    //   view: {
    //     _avg: {
    //       gte: 30
    //     }
    //   }
    // },
    _avg: {
      view: true
    },
    _max: {
      view: true
    },
    _min: {
      view: true
    },
    _count: {
      view: true,
      status: true
    }
  })
  return responFormat(users)
})