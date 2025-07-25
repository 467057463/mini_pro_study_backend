export default defineEventHandler(async (event) => {
  const users = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            startsWith: "中"
          }
        },
        {
          title: {
            startsWith: "日"
          },
          view: {
            gt: 40
          }
        }
      ]
    }
  });

  return responFormat(users)
})