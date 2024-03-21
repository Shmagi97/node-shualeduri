import express from "express";
import { prisma } from "../connectionMysql/connectMysql.js";
import randomString from "../connectionMysql/hashedRandom/randomString.js";

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
        password : logginedPassword,
       },
 
    })

    if(logginedUsers) {

       const randomEdUserID = randomString(logginedUsers.ID)
       res.status(200).json({userID: logginedUsers.ID , randomUserID: randomEdUserID} )

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

      const registeredValid = await prisma.students.findFirst({
        where: {
          userName : userName,
        },
        })

        if(registeredValid){
          res.status(202).json({error: 'ასეთი მომხმარებელი უკვე არსებობს'})
        } else {

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
    
  }

});

export default registeredUsers;
