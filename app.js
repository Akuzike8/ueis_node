const express = require("express");
const cors = require("cors");
const path = require('path');
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const hostname = "127.0.0.1"
const PORT = process.env.PORT || 3000;

const app = express();

//middleware
app.use('/static',express.static('static'))

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use(cookieParser());

//routes
app.get('/',(req,res) => {
    return res.sendFile(path.join(__dirname+'/templates/index.html'))
})

app.use("/Dashboard",require("./routes/api/Dashboard"));

app.use("/Auth",require("./routes/api/Auth"));

app.use("/user",require("./routes/api/User"));

app.use('/card',require("./routes/api/card"));

app.use('/test',require("./routes/api/Test"));

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
