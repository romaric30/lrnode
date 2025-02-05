import express, {Request, Response} from  "express"

const app = express()
const port = process.env.PORT || 5000 


app.get('/', (req:Request, res:Response) => {
    res.send("testing more and more")
})

app.listen(port, ()=> {
    console.log("server running");
    
})