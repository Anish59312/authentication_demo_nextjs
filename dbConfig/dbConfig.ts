import mongoose from "mongoose"

let isConnected = false

export async function connect(){

    if(isConnected){
        return;
    }

    try{
        await mongoose.connect(process.env.DATABASE_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB Connected")
        })

        connection.on('error', (error) => {
            console.log("error on connecting to mongoDB")
            console.log(error)
            process.exit()
        })
    }
    catch (error)
    {
        console.log("something went wrong in connection to db");
        console.log(error)
    }
}
