import mongoose, {Document,Schema} from "mongoose";
import { User } from "../types/types";


const userSchema:Schema = new Schema({
   name: {type:String, required:true},
   email:{type:String, required:true, unique:true},
},
{timestamps:true}

)


export default mongoose.model<User>("User",userSchema)




