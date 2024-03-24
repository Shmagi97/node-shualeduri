import express from 'express'
import { prisma } from '../connectionMysql/connectMysql.js'
import randomString from '../connectionMysql/hashedRandom/randomString.js'
import jwt from 'jsonwebtoken'

const logginedUsers = express.Router()

logginedUsers.get('/:randomUserID/:tekenUserID', async (req, res)=> {

//    const userId = parseInt(req.params.usersID)
   const tokenID = req.params.tekenUserID
   const secretKey = 'myFirstToken'

   const getTokenDecoded = jwt.verify(tokenID, secretKey)
  
   const findUser = await prisma.students.findFirst({
    where: {
     ID : getTokenDecoded.tokenUserId,
    },
    })

    const checkRendomUserID = randomString(getTokenDecoded.tokenUserId)
 
    const takeRandomUserID = req.params.randomUserID

    if (checkRendomUserID === takeRandomUserID ){

        const getMasivUsers = [ findUser ]
        const faindedUser = getMasivUsers.map((el) => {
          const { userName, password, ...reset } = el;
          return reset;
        });

        res.render('logginedUsers/logginedUsers', {faindedUser, userId : getTokenDecoded.tokenUserId})

    } else {
        const faindedUser = 'თქვენ არ ხართ რეგისტრირებული , გთხოვთ გაიარეთ რეგისტრაცია !'
        res.render('logginedUsers/logginedUsers', {faindedUser, userId : getTokenDecoded.tokenUserId })
    }
})

export default logginedUsers