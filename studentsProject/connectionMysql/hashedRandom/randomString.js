import crypto from 'crypto'

function randomString(number){
    const numberTostring = number.toString()
    const hash = crypto.createHash('sha256').update(numberTostring).digest('hex');
    return hash
 }

 export default randomString