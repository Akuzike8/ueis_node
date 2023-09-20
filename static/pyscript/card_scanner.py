from browser import document,console
import RPI.GPIO as rpi

def scan_card(req):
    prompt = document.select_one('#card-prompt-text')
    prompt.text = "Place your card on the sensor"


scanbtn = document.select_one('#scan-btn')
scanbtn.bind('click',scan_card)
