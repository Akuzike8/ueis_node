function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
document.getElementById('scan-btn').addEventListener("click", async () => {
    const port = new SerialPortHandler(
        { baudRate: 9600},
        () => console.log("Device connected"),
        () => console.log("Device disconnected."),

    )

    const info = await port.open()
   // var message = await port.read()
   // message = message.replace(/\s/g, "")

   // avoids the writing before the arduino is up and running
   sleep(2000).then(async () => {
        await port.write("1");
        const message = await port.read();
        console.log(message);
    });

})
