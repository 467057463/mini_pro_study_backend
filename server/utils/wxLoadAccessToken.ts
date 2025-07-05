import prisma from "~/lib/prisma";

let p;
async function wxLoadAccessToken () {
  if(p && p.status === 'pending'){
    return p.promise
  }
  p = promiseWithResolvers()
  const tokenData = await prisma.wxToken.findUnique({
    where: {
      id: 1
    }
  })
  if(tokenData){
    p.resolve(tokenData)
  } else {
    const wxToken = await getAccessToken()
    await prisma.wxToken.upsert({
      where: {
        id: 1
      },
      update: wxToken,
      create: wxToken
    })
    console.log(wxToken)
    p.resolve(wxToken)
  }
  return p.promise
}

export default wxLoadAccessToken;