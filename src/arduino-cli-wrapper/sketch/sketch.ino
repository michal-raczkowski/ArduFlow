#define ROW_1 9
#define ROW_2 4
#define ROW_3 10
#define ROW_4 6
#define ROW_5 A3
#define ROW_6 16
#define ROW_7 A2
#define ROW_8 15

#define COL_1 5
#define COL_2 A1
#define COL_3 A0
#define COL_4 8
#define COL_5 14                       
#define COL_6 7
#define COL_7 3
#define COL_8 2

const byte rows[] = {
    ROW_1, ROW_2, ROW_3, ROW_4, ROW_5, ROW_6, ROW_7, ROW_8
};

// The display buffer
// It's prefilled with a smiling face (1 = ON, 0 = OFF)


byte IMAGES[][8]{{ B01100110, B11111111, B11111111, B11111111, B11111111, B01111110, B00111100, B00011000 },
{ B01100110, B11111111, B11111111, B11111111, B01111110, B00111100, B00011000, B00000000 },
{ B00000000, B01100110, B01111110, B01111110, B00111100, B00011000, B00000000, B00000100 },
{ B00001000, B00000000, B00100100, B00111100, B00011000, B00000000, B00001000, B00001000 },
{ B01000000, B00000100, B00000000, B00011000, B00000000, B00000010, B00010000, B00000000 },
{ B00000010, B01000000, B00000000, B00011000, B01000000, B00000000, B10000000, B00010000 },
{ B01000000, B00000010, B00000000, B00011000, B00000000, B00010000, B00001000, B00000010 },
{ B00001000, B01000000, B00000000, B00011000, B00000100, B00000000, B00000000, B00010000 }};


const int IMAGES_LEN = sizeof(IMAGES)/8;



void setup() {
    
    // Open serial port
    Serial.begin(9600);
    
    // Set all used pins to OUTPUT
    // This is very important! If the pins are set to input
    // the display will be very dim.
    for (byte i = 2; i <= 13; i++)
        pinMode(i, OUTPUT);

        
    pinMode(15, OUTPUT);
    pinMode(14, OUTPUT);
    pinMode(16, OUTPUT);    
    pinMode(A0, OUTPUT);
    pinMode(A1, OUTPUT);
    pinMode(A2, OUTPUT);
    pinMode(A3, OUTPUT);
}

int i = 0;
int timeCount =0;
void loop() 
{
  // This could be rewritten to not use a delay, which would make it appear brighter
   drawScreen(IMAGES[i]);

   timeCount+= 1; 
  if(timeCount % 5 == 0){
    
    if(i >= IMAGES_LEN-1){
      i = 0;
      timeCount = 0;
    }else{
          i++;      
    };

  };
  
     

}
 void  drawScreen(byte buffer2[]){
     
    
   // Turn on each row in series
    for (byte i = 0; i < 8; i++) {
        setColumns(buffer2[i]); // Set columns for this specific row
        analogWrite(rows[i], 0);
        digitalWrite(rows[i], HIGH);
        delay(2); // Set this to 50 or 100 if you want to see the multiplexing effect!
        digitalWrite(rows[i], LOW);
        
    }
}


void setColumns(byte b) {
    digitalWrite(COL_1, (~b >> 0) & 0x01); // Get the 1st bit: 10000000
    digitalWrite(COL_2, (~b >> 1) & 0x01); // Get the 2nd bit: 01000000
    digitalWrite(COL_3, (~b >> 2) & 0x01); // Get the 3rd bit: 00100000
    digitalWrite(COL_4, (~b >> 3) & 0x01); // Get the 4th bit: 00010000
    digitalWrite(COL_5, (~b >> 4) & 0x01); // Get the 5th bit: 00001000
    digitalWrite(COL_6, (~b >> 5) & 0x01); // Get the 6th bit: 00000100
    digitalWrite(COL_7, (~b >> 6) & 0x01); // Get the 7th bit: 00000010
    digitalWrite(COL_8, (~b >> 7) & 0x01); // Get the 8th bit: 00000001
    
    // If the polarity of your matrix is the opposite of mine
    // remove all the '~' above.
}