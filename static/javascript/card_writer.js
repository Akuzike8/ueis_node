function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// writing card button login page
document.getElementById('register-btn').addEventListener("click", async (e) => {
    e.preventDefault();
    const port = new SerialPortHandler(
        { baudRate: 9600},
        () => console.log("Device connected"),
        () => console.log("Device disconnected."),

    )

    const info = await port.open()

   // avoids the writing before the arduino is up and running

   const cardform = document.getElementById("card-form");
   const nid  = document.getElementById('NID-input').value;
   const prompt = document.getElementById('prompt');
   var payload;

   await fetch('/card/write',{
    method:'POST',
    body: JSON.stringify({nid:nid}),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    }).then((res) =>{
        res = res.json();
        return res;
    }).then((payload) =>{
        sleep(2000).then(async () => {
            console.log(payload.token);
            await port.write("1");
            sleep(1000).then(async () => {
                const feedback = await port.read();

                if (feedback == 0){
                    prompt.innerText = "Card not Detected!";
                    prompt.style.color = "red";
                }
                else{
                    await port.write(payload.token);
                    const message = await port.read();
                    prompt.innerText = "Card registered";
                    prompt.style.color = "green";

                    // request to server to register the card

                    console.log(message);
                }
                await port.close();
            })
        })

    })
});



