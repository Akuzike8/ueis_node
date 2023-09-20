class dbcontroller
{
    static connect = () => {
        const mongoose = require("mongoose")
        const engine = "mongodb"
        const host = "localhost"
        const dbname = "comm"
        const port = "27017"
        const username = ""
        const passwd = ""
        const connection = `${engine}://${host}:${port}/${dbname}`
        mongoose.connect(connection)
        mongoose.set('strictQuery',false)
    }
}

module.exports = dbcontroller;
