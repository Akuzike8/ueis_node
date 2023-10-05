function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//Login button configurations

const login_btn = document.getElementById('login_btn');

login_btn.addEventListener('mouseenter',() => {
    const login_btn_pic = document.getElementById('login_btn_pic');
    login_btn_pic.setAttribute('src','../static/images/login_btn_hover.png');
})

login_btn.addEventListener('mouseleave',() => {
    const login_btn_pic = document.getElementById('login_btn_pic');
    login_btn_pic.setAttribute('src','../static/images/login_btn.png');
})

login_btn.addEventListener('click', async(e) => {
    e.preventDefault();
    const port = new SerialPortHandler(
        { baudRate: 9600},
        () => console.log("Device connected"),
        () => console.log("Device disconnected."),

    )

    const info = await port.open()
    const prompt = document.getElementById("prompt");

   // avoids the writing before the arduino is up and running
   sleep(2000).then(async () => {
        await port.write("4");
        var message = await port.read();
        prompt.style.color = "#0d99ff";
        console.log(message);
        await port.close();

        id = message;

        if(id == 0){
            prompt.innerText = "Authentication failed";
            prompt.style.color = "red";
        }
        else{
            prompt.innerText = "Authenticated";
            prompt.style.color = "green";
        }
    });
})


let body = document.querySelector('body');
let fingerprint = document.querySelector('.fingerprint');
let center = document.querySelector('.center');
let scan = document.querySelector('.scan');
let timer, timerSuccesss;


function onSuccess() {
    body.removeEventListener('mousedown', onTouchstart);
    body.removeEventListener('touchstart', onTouchstart);


    fingerprint.classList.remove('active');
    center.classList.add('success')

    clearTimeout(timerSuccesss);

    timerSuccesss = setTimeout(() => {
        body.addEventListener('mousedown', onTouchstart);
        body.addEventListener('touchstart', onTouchstart);
        center.classList.remove('success')

    },3000);
}

function onTouchstart () {
    fingerprint.classList.add('active');
    timer = setTimeout(onSuccess,2000)
}

function onTouchEnd() {
    fingerprint.classList.remove('active')
    clearTimeout(timer)
}

body.addEventListener('mousedown', onTouchstart)
body.addEventListener('touchstart', onTouchstart)
body.addEventListener('mouseup', onTouchEnd)
body.addEventListener('touchend', onTouchEnd)
