input.onButtonPressed(Button.A, function () {
    valor = HX711.get_units(1)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    OLED.writeStringNewLine(serial.readString())
})
let valor_string = ""
let ceros = ""
OLED.init(128, 64)
let valor: number = 0
HX711.SetPIN_DOUT(DigitalPin.P1)
HX711.SetPIN_SCK(DigitalPin.P16)
HX711.begin()
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
serial.writeLine("HX711 Initializing Scale: ")
serial.writeLine("Before Setting Up the Scale: ")
serial.writeString("Read: ")
serial.writeLine("" + (HX711.read()))
serial.writeString("Read Average: ")
serial.writeLine("" + (HX711.read_average(20)))
serial.writeString("Get Value: ")
serial.writeLine("" + (HX711.get_value(5)))
serial.writeString("Get Units: ")
serial.writeLine("" + (HX711.get_units(5)))
HX711.set_scale(5000)
HX711.tare(10)
basic.pause(1000)
serial.writeString("Read:")
serial.writeLine("" + (HX711.read()))
serial.writeString("Read Average:")
serial.writeLine("" + (HX711.read_average(20)))
serial.writeString("Get Value:")
serial.writeLine("" + (HX711.get_value(5)))
serial.writeString("Get Units")
serial.writeLine("" + (HX711.get_units(5)))
serial.writeLine("")
serial.writeLine("")
serial.writeLine("")
serial.writeLine("")
serial.writeLine("Readings: ")
OLED.writeStringNewLine("Start weighing...")
OLED.newLine()
basic.pause(1000)
OLED.clear()
basic.forever(function () {
    serial.writeString("One Reading: ")
    valor = HX711.get_units(1)
    ceros = ""
    if (Math.abs(Math.round((valor - Math.trunc(valor)) * 100)).toString().length == 0) {
        ceros = "00"
    } else if (Math.abs(Math.round((valor - Math.trunc(valor)) * 100)).toString().length == 1) {
        ceros = "0"
    }
    valor_string = "" + Math.trunc(valor) + "." + ceros + Math.abs(Math.round((valor - Math.trunc(valor)) * 100))
    serial.writeLine(valor_string)
    serial.writeString("Average: ")
    valor = HX711.get_units(20)
    ceros = ""
    if (Math.abs(Math.round((valor - Math.trunc(valor)) * 100)).toString().length == 0) {
        ceros = "00"
    } else if (Math.abs(Math.round((valor - Math.trunc(valor)) * 100)).toString().length == 1) {
        ceros = "0"
    }
    valor_string = "" + Math.trunc(valor) + "." + ceros + Math.abs(Math.round((valor - Math.trunc(valor)) * 100))
    serial.writeLine(valor_string)
    OLED.writeStringNewLine("Weight: " + convertToText(Math.round(valor * 11.5)))
    OLED.writeStringNewLine("")
    OLED.newLine()
    HX711.power_down()
    basic.pause(4000)
    HX711.power_up()
    basic.pause(100)
})
