import { fakerZH_CN as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

function generateOrder(){
  return Array.from({length: 100}).map(() => {
    return {
      title: faker.book.title(),
      content: faker.string.numeric(100),
      view: faker.number.int({min: 1, max: 50}),
      authorId: 1
    }
  })
}

async function main(){
  await prisma.post.createMany({
    data: generateOrder(),
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