import dotenv from "dotenv"
import mongoose from "mongoose"


dotenv.config()


// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict

mongoose.set('strictQuery',true)

const dbUrl = process.env.DB_URI || "mongodb+srv://romy:HFnP5hgJ9QNS2Jfy@pixel.l3waj.mongodb.net/lnode"


const ConnectDB = async () => {
    try {

        await mongoose.connect(dbUrl, {
            useNewUrlParser:true,
            
        } as mongoose.ConnectOptions)

        console.log("DB connected")
        
    } catch (error:any) {
        console.error("error:", error.message)
        
    }
}


export default ConnectDB
