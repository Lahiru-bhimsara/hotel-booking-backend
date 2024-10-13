import User from  '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from  'dotenv'
import  bcrypt from 'bcryptjs'


dotenv.config();


export function postUsers(req,res){

  const user = req.body

  const password = req.body.password

  const saltRound = 10;
  const passwordHash = bcrypt.hashSync(password, saltRound);

  user.password = passwordHash

  const newUser = new User(user)
  newUser.save().then(

    ()=>{
      res.json({
        message : "User created successfully"
      })
    }
  ).catch(
    ()=>{
      res.json({
        message : "User creation failed"
      })
    }
  )

}

export function loginUser(req,res){
  const credentials = req.body
  const password = bcrypt.hashSync(credential.password, 10);

  User.findOne({email : credentials.email, password :passwordHash}).then(
    (user)=>{

      if(user == null){

        res.status(403).json({
          message : "User not found"
        })

      }else{

        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
        };
  

        const token = jwt.sign(payload, "secret", { expiresIn: "48h" });

        res.json({
          message : "User found",
          user : user,
          token : token
        })
        
      }
    }
  )
}




