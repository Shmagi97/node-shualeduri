import express from 'express'

const logginedUsers = express.Router()

logginedUsers.get('/', (req, res)=> {

  res.render('logginedUsers/logginedUsers')
})

export default logginedUsers