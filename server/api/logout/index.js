import { readBody } from 'h3';
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const { licenceKey, userMail, IP } = await readBody(event);
const prisma = new PrismaClient()
  if (!userMail || !licenceKey || !IP) {
    console.log(userMail, licenceKey, IP);
    return { status: 400, message: 'Missing required fields' };
  }

  try {
    // Check if licence key exists
    const licence = await prisma.licences.findUnique({
      where: { LicenceKey: licenceKey, UserMail: userMail },
    });

    if (!licence) {
      return { status: 400, message: 'User or licence key not found' };
    }


    const existingLog = await prisma.logs.findFirst({
      where: {
        UserMail: userMail,
        LicenceKey: licenceKey,
        LogoutDate: null,
      },
    });

    if (!existingLog){
      return { status: 400, message: 'Not logged in.' };
    }    
      // Update the existing log's logout date to now
    await prisma.logs.update({
      where: { Id: existingLog.Id },
      data: { LogoutDate: new Date() },
    });

      return { status: 200, message: 'Logged out' };

  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Internal server error' };
  }
});
