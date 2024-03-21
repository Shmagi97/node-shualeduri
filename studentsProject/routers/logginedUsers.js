import express from 'express'
import { prisma } from '../connectionMysql/connectMysql.js'
import randomString from '../connectionMysql/hashedRandom/randomString.js'

const logginedUsers = express.Router()

logginedUsers.get('/:usersID/:randomUserID', async (req, res)=> {

   const userId = parseInt(req.params.usersID)

   const findUser = await prisma.students.findFirst({
    where: {
     ID : userId,
    },
    })

    const checkRendomUserID = randomString(userId)
 
    const takeRandomUserID = req.params.randomUserID

    if (checkRendomUserID === takeRandomUserID){

        const getMasivUsers = [ findUser ]
        const faindedUser = getMasivUsers.map((el) => {
          const { userName, password, ...reset } = el;
          return reset;
        });

        res.render('logginedUsers/logginedUsers', {faindedUser})

    } else {
        
        const faindedUser = 'not user'
        res.render('logginedUsers/logginedUsers', {faindedUser})
    }
})

export default logginedUsers