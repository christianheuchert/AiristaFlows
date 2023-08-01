// File for all empty Trigger and Function objects

// export all constants
export const TRIGGERSFUNCTIONS:TriggersFunctions = { 
  // flow object
  flow: {
    Id: "0",
    Name: "Name",
    Description: "Description",
    Triggers: [] as string[],
    Functions: [] as string[],
  },
  // mqtt trigger
  mqtt: {
    Id: "0",
    Name: "Name",
    Description: "Description",
    Type: "mqtt",
    Input: "0",
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
    Id: "0",
    Name: "Name",
    Description: "Description",
    Type: "consoleLog",
    Input: "0",
    Output: "Output",
  }
}

interface TriggersFunctions {
  [key: string]: any;
}
