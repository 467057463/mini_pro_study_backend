export default defineEventHandler(async (event) => {
  // const users = await prisma.post.update({
  //   where: {
  //     id: "03235fd8-a2dc-463b-acf2-d28e6edeef50"
  //   },
  //   data: {
  //     view: {
  //       increment: 1
  //     }
  //   }
  // })
  // const users = await prisma.post.findUnique({
  //   where: {
  //     id: "03235fd8-a2dc-463b-acf2-d28e6edeef50"
  //   },
  //   // select: {
  //   //   title: true
  //   // },
  //   omit: {
  //     title: true
  //   },
  //   include: {
  //     author: {
  //       select: {
  //         id: true
  //       }
  //     }
  //   }
  // })
  // const users = await prisma.post.findMany({
  //   where: {
  //     OR: [
  //       {
  //         title: {
  //           startsWith: "中"
  //         }
  //       },
  //       {
  //         title: {
  //           startsWith: "日"
  //         },
  //         view: {
  //           gt: 40
  //         }
  //       }
  //     ]
  //   }
  // });
  // const users = await prisma.post.findFirst({
  //   where: {
  //     view: {
  //       gt: 41
  //     },
  //   },
  //   orderBy: {
  //     view: "asc"
  //   }
  // })

  const users = await prisma.user.findFirst({
    include: {
      _count: {
        select: {
          Post: true,
          order: true
        }
      }
    }
  })

  return responFormat(users)
})