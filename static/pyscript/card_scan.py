from js import document, console, alert
from pyodide.ffi import create_proxy
import RPI.GPIO as rpi
from mfrc522 import SimpleMFRC522

scanbtn = document.getElementById('scan-btn')

def scan(val):
    prompt = document.getElementById('card-prompt-text')
    prompt.innerText = "Place your card on the sensor"
    prompt.style = "color: red;"

scan = create_proxy(scan)
scanbtn.addEventListener('click',scan)
