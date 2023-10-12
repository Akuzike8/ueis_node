const express = require("express");
const cors = require("cors");
const path = require('path');
const exphbs = require('express-handlebars')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const hostname = "127.0.0.1"
const PORT = process.env.PORT || 3000;

const app = express();

//middleware
app.use('/static',express.static('static'))

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use(cookieParser());

app.use(sessions({
    name: 'ueisAuth',
    secret: 'randompassword',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
      secure: false,
    }
}));

//routes
app.get('/',(req,res) => {
    return res.sendFile(path.join(__dirname+'/templates/index.html'))
})

app.use("/Dashboard",require("./routes/api/Dashboard"));

app.use("/Auth",require("./routes/api/Auth"));

app.use("/identity",require("./routes/api/identity"));

app.use('/card',require("./routes/api/card"));

app.use('/test',require("./routes/api/Test"));

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
