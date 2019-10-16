import serial

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=0)
while True:
    txt = ser.readline().decode('utf-8')
    if txt != '':
        print(txt)
