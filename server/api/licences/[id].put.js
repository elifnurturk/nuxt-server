import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
    const body = await readBody(event)
    const enddate = body.EndDate

    const updateLicence = await prisma.licences.update({
      where: {
        Id: parseInt(event.context.params.id)},
        data: {
            EndDate: enddate,
          },
    });
    return updateLicence;
});
