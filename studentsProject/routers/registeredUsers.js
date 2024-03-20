import express from "express";
import { prisma } from "../connectionMysql/connectMysql.js";

const registeredUsers = express.Router();

registeredUsers.post("/", async (req, res) => {

  const { 

     firstName, 
     lastName,
     age, 
     userName, 
     password , 
     logginedPassword, 
     logginedUserName

    } = req.body;

  if (  (typeof logginedPassword ==='string' && logginedPassword.length > 0) && 
        (typeof logginedUserName === 'string' && logginedUserName.length > 0)
     ) {

    const logginedUsers = await prisma.students.findFirst({
       where: {
        userName : logginedUserName,
        password : logginedPassword
       },
 
    })

    if(logginedUsers) {
       res.status(200).json({user: logginedUsers.ID})

    } else {
      res.status(300).json({notValuid: 'არასწორი სახელია ან პაროლი'})
    }

  } else if (
    
            firstName, 
            lastName,
            age, 
            userName, 
            password 
    
            ) {
      
              const createUsers = await prisma.students.create({
                data: {
                  firstName,
                  lastName,
                  age,
                  userName,
                  password,
                },
              });
            
              if (createUsers)
                res
                  .status(200)
                  .json({ success: `მომხმარებელი ${firstName} ${lastName} დამატებულია` });
    
  }

});

export default registeredUsers;
