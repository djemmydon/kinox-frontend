import jwt from  'jsonwebtoken'


const signToken =(user) => {
    return jwt.sign(user, process.env.JSON_TOKEN, {

        expiresIn: "30d"
    })
}

export {signToken} 