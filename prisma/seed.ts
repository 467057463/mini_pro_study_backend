import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main(){

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