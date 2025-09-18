import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


async function main(){
  await prisma.category.createMany({
    data: [
      {
        name: 'bbq',
        label: '烧烤',
        order: 0,
      },
      {
        name: 'rice',
        label: '炒饭',
        order: 1
      }
    ],
    skipDuplicates: true
  })

  await prisma.product.createMany({
    data: [
      {
        "name": "土豆",
        "price": 1.5,
        "image": "https://picture.leigod.com/uploads/images/2025-09-12/1757672463492194.png",
        "count": 10,
        "categoryId": 1
      },
      {
        "name": "炒饭",
        "price": 1.5,
        "image": "https://picture.leigod.com/uploads/images/2025-09-12/1757672463492194.png",
        "count": 10,
        "categoryId": 2
      },
      {
        "name": "炒米粉",
        "price": 1.5,
        "image": "https://picture.leigod.com/uploads/images/2025-09-12/1757672463492194.png",
        "count": 10,
        "categoryId": 2
      },
      {
        "name": "炒河粉",
        "price": 1.5,
        "image": "https://picture.leigod.com/uploads/images/2025-09-12/1757672463492194.png",
        "count": 10,
        "categoryId": 2
      },
      {
        "name": "炒面",
        "price": 1.5,
        "image": "https://picture.leigod.com/uploads/images/2025-09-12/1757672463492194.png",
        "count": 3,
        "categoryId": 2
      }
    ],
    skipDuplicates: true
  })

}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('seeds run success!')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })