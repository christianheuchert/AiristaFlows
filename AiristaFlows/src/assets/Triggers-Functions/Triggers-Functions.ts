// File for all empty Trigger and Function objects

// export all constants
export const TRIGGERSFUNCTIONS:TriggersFunctions = { 
  // flow object
  flow: {
    Name: "Name",
    Description: "Description",
    Triggers: [] as string[],
    Functions: [] as string[],
  },
  // mqtt trigger
  mqtt: {
    Name: "Name",
    Description: "Description",
    Type: "mqtt",
    Input: "Input",
    Output: "Output",
    Settings: {
      Protocol: "ws",
      Host: "00.00.00.000",
      Port: "0000",
      Topic: "Topic",
      Username: "Username",
      Password: "Password"
    }
  },
  // consoleLog function
  consoleLog: {
    Name: "Name",
    Description: "Description",
    Type: "consoleLog",
    Input: "Input",
    Output: "Output",
  }
}

interface TriggersFunctions {
  [key: string]: any;
}
