import { Request,Response } from "express"
import User from "../models/User"


export const GetUser = async(req:Request, res:Response) => {
     try {
            const newUser = new User({name:"romay", email:"romaric250"})
    
            await newUser.save()
            res.status(201).json({message:"User created successfully", user:newUser.toJSON()})
            
        } catch (error:any) {
            console.log(error)
            res.status(500).json({message:"internal Server error"})
            
        }
}


