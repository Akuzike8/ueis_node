
document.getElementById('scan-btn').addEventListener("click", async () => {
    const port = await navigator.serial.requestPort();
    const textDecoder = new TextDecoderStream();
    await port.open({ baudRate: 9600});
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();
    var card_id = ""
    // Listen to data coming from the serial device.
        try {
          while (true) {
            const { value, done } = await reader.read();
            console.log(done)
            if (done) {
              // Allow the serial port to be closed later.
              console.log(done)
              reader.releaseLock();
              break;
            }
            if (value) {
              card_id += value
              console.log(value)
            }
          }
        } catch (error) {
          // TODO: Handle non-fatal read error.
          console.error(error)
        }finally{
            console.log("card_id")
        }
      }

)
