//Single device login
import { readBody } from 'h3';
import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const { licenceKey, userMail, IP } = await readBody(event);
  const prisma = new PrismaClient();
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
    const currentDate = new Date();
    if (licence.EndDate && new Date(licence.EndDate) <= currentDate) {
      return { status: 400, message: 'Licence has expired' };
    }
  

    const existingLog = await prisma.logs.findFirst({
      where: {
        UserMail: userMail,
        LicenceKey: licenceKey,
        LogoutDate: null,
      },
    });
    console.log(existingLog);
    if (existingLog) {
      // Update the existing log's logout date to now
      await prisma.logs.update({
        where: { Id: existingLog.Id },
        data: { LogoutDate: new Date() },
      });

      const newlog = await prisma.logs.create({
        data: {
          UserMail: licence.UserMail,
          LicenceKey: licence.LicenceKey,
          IP,
          LoginDate: new Date(),
          LogoutDate: null,  // Initial logout date is null
        },
      });
      
      return { status: 200, newlog, message:'Logged out from the previous device. Log created successfully' };
    }

    if (!existingLog){
      const log = await prisma.logs.create({
        data: {
          UserMail: licence.UserMail,
          LicenceKey: licence.LicenceKey,
          IP,
          LoginDate: new Date(),
          LogoutDate: null,  // Initial logout date is null
        },
      });
      return { status: 200, message: 'Log created successfully', log };
    }
    
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Internal server error' };
  }
});
