class SerialPortHandler {
	constructor(options, onConnect, onDisconnect) {
		this.encoder = new TextEncoder("utf-8");
		this.decoder = new TextDecoder("utf-8");
		this.onConnect = onConnect;
		this.onDisconnect = onDisconnect;
		this.options = options;
		this.port = null;
		this.isOpened = false;
		this.setupListeners();
	}

	async open() {
        try {
            const port = await navigator.serial.requestPort();
            await port.open(this.options);

            this.port = port;
            this.isOpened = true;

            return this.port.getInfo();
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

	async close() {
        await this.port.close();
        this.isOpened = false;
    }

	async write(data) {
        try {
            const writer = this.port.writable.getWriter();
            const encoded = this.encoder.encode(data);
            await writer.write(encoded);
            writer.releaseLock();

        } catch (error) {
          console.error(error);
          throw error;
        }

    }

	async read() {
        while (this.port.readable) {
            const reader = this.port.readable.getReader();
            let chunks = '';

            try {
              while (true) {
                const { value, done } = await reader.read();
                const decoded = this.decoder.decode(value);

                chunks += decoded;

                if (done || decoded.includes('\n')) {
                  console.log('Reading done.');
                  reader.releaseLock();
                  break;
                }
              }
              return chunks;
            } catch (error) {
              console.error(error);
              throw error;
            } finally {
              reader.releaseLock();
              await this.port.close();
            }
          }
    }

	setupListeners() {
        navigator.serial.addEventListener('connect', this.onConnect);
        navigator.serial.addEventListener('disconnect', this.onDisconnect);
    }
}
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
