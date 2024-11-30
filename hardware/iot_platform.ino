#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <cmath>
#include <time.h>

#define ledGPIO 5         // define for light (D2)
#define fanGPIO 4         // define for fan (D1)
#define airConditioner 0  // define for air conditioner (D6)
#define dht11GPIO 14      // define for humidity and temperature (D5)
#define DHTTYPE DHT11
#define lightGPIO A0  // used to measure light

int LDR_value;
#define ADC_value 0.0048828125
int brightness;

const char* sensorData = "home/sensordata";  // return topic name and data is 0 or 1, 1 is on, 0 is off
const char* statusLight = "home/light";
const char* statusFan = "home/fan";
const char* statusAirConditioner = "home/air_conditioner";
const char* statusAll = "home/all";

DHT dht(dht11GPIO, DHTTYPE);

const char* ssid = "Minnie";        // WiFi name
const char* password = "88888888";  // WiFi password

// Config server
const char* mqtt_server = "194.195.90.124";
const int mqtt_port = 1883;
const char* mqtt_username = "test";
const char* mqtt_password = "123456";

// Set time used for sending data to HiveMQ cloud 1 minute
const unsigned long sendInterval = 3000;
unsigned long lastSend = 0;

WiFiClient espClient;
PubSubClient client(espClient);

void connect_mqtt_broker() {
  while (!client.connected()) {
    Serial.println("Connecting to MQTT Broker . . .");
    String clientID = "ESPClient-";
    clientID += String(random(0xffff), HEX);
    if (client.connect(clientID.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("Connected to MQTT Broker");
      client.subscribe(statusLight);
      client.subscribe(statusFan);
      client.subscribe(statusAirConditioner);
      client.subscribe(statusAll);
    } else {
      Serial.print("Failed with state: ");
      Serial.print(client.state());
      delay(2000);
    }
  }
  Serial.println("Connected to MQTT Broker success");
}

float roundTo(float value, int decimalPlaces) {
  float factor = pow(10.0, decimalPlaces);
  return round(value * factor) / factor;
}

void publish_message_data(const char* topic) {
  StaticJsonDocument<256> jsonDoc;  // light -> fan -> air conditioner // 0 is off, 1 is on
  jsonDoc["light"] = digitalRead(ledGPIO);
  jsonDoc["fan"] = digitalRead(fanGPIO);
  jsonDoc["air_conditioner"] = digitalRead(airConditioner);
  jsonDoc["temperature"] = roundTo(dht.readTemperature(), 2);
  jsonDoc["humidity"] = roundTo(dht.readHumidity(), 2);

  if (isnan(dht.readTemperature()) || isnan(dht.readHumidity())) {
    Serial.println("Failed to read from DHT sensor");
    return;
  }

  int analogValue = analogRead(lightGPIO);
  jsonDoc["brightness"] = analogValue;

  // Get current time
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  char timeString[64];
  strftime(timeString, sizeof(timeString), "%Y-%m-%d %H:%M:%S", &timeinfo);
  // Add time to json
  jsonDoc["time"] = timeString;

  char buffer[256];
  serializeJson(jsonDoc, buffer);
  Serial.println(buffer);
  client.publish(topic, buffer);
}

void publish_message_status_device(const char* topic, const char* message) {
  StaticJsonDocument<256> jsonDoc;  // light -> fan -> air conditioner // 0 is off, 1 is on
  jsonDoc["status"] = message;

  // Get current time
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  char timeString[64];
  strftime(timeString, sizeof(timeString), "%Y-%m-%d %H:%M:%S", &timeinfo);
  // Add time to json
  jsonDoc["time"] = timeString;

  char buffer[256];
  serializeJson(jsonDoc, buffer);
  Serial.println(buffer);
  client.publish(topic, buffer);
}

void call_back(char* topic, byte* payload, unsigned int length) {
  String incoming_message = "";
  for (int i = 0; i < length; i++) incoming_message += (char)payload[i];
  Serial.print(topic);
  Serial.print(" ");
  Serial.println(incoming_message);

  if (strcmp(topic, statusLight) == 0) {
    if (incoming_message == "1")
      digitalWrite(ledGPIO, HIGH);
    else if (incoming_message == "0")
      digitalWrite(ledGPIO, LOW);
  }
  if (strcmp(topic, statusFan) == 0) {
    if (incoming_message == "1")
      digitalWrite(fanGPIO, HIGH);
    else if (incoming_message == "0")
      digitalWrite(fanGPIO, LOW);
  }

  if (strcmp(topic, statusAirConditioner) == 0) {
    if (incoming_message == "1")
      digitalWrite(airConditioner, HIGH);
    else if (incoming_message == "0")
      digitalWrite(airConditioner, LOW);
  }
  if (strcmp(topic, statusAll) == 0) {
    if (incoming_message == "1") {
      digitalWrite(ledGPIO, HIGH);
      digitalWrite(fanGPIO, HIGH);
      digitalWrite(airConditioner, HIGH);
    } else if (incoming_message == "0") {
      digitalWrite(ledGPIO, LOW);
      digitalWrite(fanGPIO, LOW);
      digitalWrite(airConditioner, LOW);
    }
  }
}

void setup_wifi() {
  Serial.begin(9600);
  Serial.print("Đang kết nối tới Wi-Fi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi đã kết nối!");
  Serial.print("Địa chỉ IP: ");
  Serial.println(WiFi.localIP());
  configTime(25200, 0, "pool.ntp.org", "time.nist.gov");
}

void setup_led() {
  pinMode(ledGPIO, OUTPUT);
  pinMode(fanGPIO, OUTPUT);
  pinMode(airConditioner, OUTPUT);
}

void setup() {
  setup_wifi();
  setup_led();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(call_back);
}

int lastLedState = LOW;
int lastFanState = LOW;
int lastAirState = LOW;

void public_change_status() {
  int currentLedState = digitalRead(ledGPIO);
  if (currentLedState != lastLedState) {
    lastLedState = currentLedState;
    publish_message_status_device("light_status", currentLedState == HIGH ? "1" : "0");
  }
  int currentFanState = digitalRead(fanGPIO);
  if (currentFanState != lastFanState) {
    lastFanState = currentFanState;
    publish_message_status_device("fan_status", currentFanState == HIGH ? "1" : "0");
  }
  int currentAirState = digitalRead(airConditioner);
  if (currentAirState != lastAirState) {
    lastAirState = currentAirState;
    publish_message_status_device("air_status", currentAirState == HIGH ? "1" : "0");
  }
  if (currentLedState != lastLedState || currentFanState != lastFanState || currentAirState != lastAirState) {
    lastLedState = currentLedState;
    lastFanState = currentFanState;
    lastAirState = currentAirState;
    if (currentLedState == HIGH && currentFanState == HIGH && currentAirState == HIGH) {
      publish_message_status_device("all_status", "all : 1");
    } else if (currentLedState == LOW && currentFanState == LOW && currentAirState == LOW) {
      publish_message_status_device("all_status", "all : 0");
    }
  }
}
int conversion(int raw_val) {
  int lux = (250.000000 / (ADC_value * LDR_value)) - 50.000000;
  return lux;
}

// Hàm gửi dữ liệu cảm biến đến backend qua HTTP POST
void sendSensorDataToBackend(float temperature, float humidity, int brightness) {
  WiFiClient client;
  HTTPClient http;
  http.begin(client, "http://172.20.10.2:3006/api/data-sensor");  // Địa chỉ máy chủ API của bạn

  http.addHeader("Content-Type", "application/json");

  // Tạo JSON payload để gửi dữ liệu
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["temperature"] = temperature;
  jsonDoc["humidity"] = humidity;
  jsonDoc["brightness"] = brightness;

  String payload;
  serializeJson(jsonDoc, payload);

  // Gửi yêu cầu POST
  int httpCode = http.POST(payload);

  // Kiểm tra mã phản hồi HTTP
  if (httpCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpCode);
    if (httpCode == HTTP_CODE_OK) {
      Serial.println("Data sent successfully");
    } else {
      Serial.print("Error response: ");
      Serial.println(http.getString());  // In ra lỗi trả về từ máy chủ
    }
  } else {
    // In chi tiết lỗi nếu không thể kết nối
    Serial.print("Failed to connect. HTTP code: ");
    Serial.println(httpCode);
    if (httpCode == -1) {
      Serial.println("Check network connection or server availability.");
    }
  }

  http.end();  // Kết thúc kết nối HTTP
}


void loop() {
  if (!client.connected()) {
    connect_mqtt_broker();
  }
  client.loop();

  public_change_status();

  // Gửi dữ liệu MQTT định kỳ
  unsigned long currentMillis = millis();
  if (currentMillis - lastSend >= sendInterval) {
    lastSend = currentMillis;

    // Đọc dữ liệu từ cảm biến
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    LDR_value = analogRead(lightGPIO);
    brightness = conversion(LDR_value);

    // Kiểm tra nếu có lỗi đọc cảm biến
    if (!isnan(temperature) && !isnan(humidity)) {
      // Gửi dữ liệu lên MQTT
      publish_message_data(sensorData);

      // Gửi dữ liệu lên backend
      sendSensorDataToBackend(temperature, humidity, brightness);
    } else {
      Serial.println("Error reading sensor data");
    }
  }
}
