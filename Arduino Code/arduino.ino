#include <SimpleDHT.h>
#include "GravityTDS.h"
#include <MQ2.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

// DHT11 sensor pin
int pinDHT11 = 2;
SimpleDHT11 dht11(pinDHT11);

// MQ2 sensor pin
int Analog_Input = A0;
int lpg, co, smoke;
MQ2 mq2(Analog_Input);

#define TdsSensorPin A1
GravityTDS gravityTds;

// LCD setup
LiquidCrystal_I2C lcd(0x27, 16, 2); // Adjust the address and dimensions according to your LCD

float tdsValue = 0; // Declare tdsValue variable here

void setup() {
  Serial.begin(9600);
  
  // Initialize LCD with 16 columns and 2 rows
  lcd.begin(16, 2);
  lcd.backlight();
  
  // Initialize MQ2 sensor
  mq2.begin();
}

void loop() {
  // Read temperature and humidity from DHT11 sensor
  byte temperature = 0;
  byte humidity = 0;
  int err = SimpleDHTErrSuccess;
  if ((err = dht11.read(&temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT11 failed, err=");
    Serial.println(err);
    delay(1000);
    return;
  }else{
     Serial.print("Temperature: ");
  Serial.println(temperature);

  Serial.print("Humidity: ");
  Serial.println(humidity);
  }
  
  // Clear LCD
  lcd.clear();

  

  // Display temperature and humidity on LCD
  lcd.setCursor(0, 0);
  lcd.print("WEATHER INFO...");
  delay(2000);
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print((int)temperature);
  lcd.print("C");
  lcd.setCursor(0, 1);
  lcd.print("Humidity: ");
  lcd.print((int)humidity);
  lcd.print("%");
  
  delay(5000); // Delay to allow viewing the data

  // Read sensor values from MQ2 sensor
  float* values = mq2.read(true); // Set it false if you don't want to print the values in the Serial
  
  // Read sensor values
  lpg = mq2.readLPG();
  co = mq2.readCO();
  smoke = mq2.readSmoke();
  
  // Clear LCD
  lcd.clear();


  

  // Display sensor values on LCD
   lcd.setCursor(0, 0);
  lcd.print("GAS VALUE...");
  delay(2000);
 lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("LPG:");
  lcd.print(lpg);
  lcd.print(" CO:");
  lcd.print(co);
  lcd.setCursor(0, 1);
  lcd.print("SMOKE:");
  lcd.print((smoke * 100)/10000);
  lcd.print(" %");
  
  
  delay(5000); // Delay to allow viewing the data
  lcd.clear();

  // Read TDS value
  gravityTds.setTemperature(temperature);  // Set the temperature and execute temperature compensation
  gravityTds.update();  // Sample and calculate
  tdsValue = gravityTds.getTdsValue();  // Then get the value


  // Display TDS values on LCD
   lcd.setCursor(0, 0);
  lcd.print("TDS VALUE...");
  delay(2000);
 lcd.clear();

  // Display TDS value on LCD
  lcd.setCursor(0, 0);
  lcd.print("TDS ");
  lcd.print(tdsValue, 0); // Print TDS value without decimal places
  lcd.print(" PPM");

delay(2000);
lcd.clear();
  if(tdsValue>500){
   lcd.print("Unsafe water");
  }else{
    lcd.print("safe water");
  }

  // Output TDS value to serial monitor
  Serial.print("TDS Value: ");
  Serial.print(tdsValue, 0); // Print TDS value without decimal places
  Serial.println(" ppm.");

  delay(5000); // Delay to stabilize readings and update display
}
