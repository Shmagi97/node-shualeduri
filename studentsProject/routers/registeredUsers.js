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
     logginedUserName,
     firstNameEdit,  
     lastNameEdit,
     ageEdit,
     useridEdit,
     useridEdDelete,

    } = req.body;

    if( firstName && 
        lastName &&
        age &&
        userName &&
        password  ) {

          var firstNameTrim = firstName.trim()
          var lastNameTrim = lastName.trim()
          var userNameTrim = userName.trim()
          var passwordTrim = password.trim()
        }

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

    firstNameTrim.length !== 0 && 
    lastNameTrim.length !== 0  &&
    age.length !== 0 &&
    userNameTrim.length !== 0  &&
    passwordTrim.length !== 0

    ) {

      const registeredValid = await prisma.students.findFirst({
        where: {
          userName : userNameTrim,
        },
        })

        if(registeredValid){
          res.status(202).json({error: 'ასეთი მომხმარებელი უკვე არსებობს'})
        } else {
         
          const createUsers = await prisma.students.create({
            data: {
              firstName: firstNameTrim,
              lastName: lastNameTrim,
              age,
              userName: userNameTrim,
              password: passwordTrim,
            },
          });
        
          if (createUsers)
            res
              .status(200)
              .json({ success: `მომხმარებელი ${firstName} ${lastName} დამატებულია` });
        }
    
  } else if ( firstNameEdit && lastNameEdit && ageEdit && useridEdit ){
    
      const userIDNumber = parseInt(useridEdit)

      await prisma.students.update({

      where: {
        ID: userIDNumber
      },

      data: {
        firstName: firstNameEdit,
        lastName: lastNameEdit,
        age: ageEdit,
      }
 
    });

     res.json({sucess: 'მონაცემები განახლდა '})

  } else if (useridEdDelete) {
    
    const userIDNumber = parseInt(useridEdDelete)

    await prisma.students.update({

      where: {
        ID: userIDNumber
      },
      data: {
        firstName: '',
        lastName: '',
        age: '',
      }
 
    });

    res.json({sucess: 'ინფორმაცია წაიშალა'})

  } else {
    res.json({error: 'სერვერის შეცდომა "რეგისტრაცია წარუმატებელია"'})
  }

});

export default registeredUsers;
