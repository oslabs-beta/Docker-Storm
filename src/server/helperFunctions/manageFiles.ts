import fs from 'fs';

/**
 * Gets the grafana panel ID from a file and returns that object
 * 
 * @return { {'panelId': number} } The panelId Object read from the file
*/
export function getGrafID(){
  return JSON.parse(fs.readFileSync('./grafana/grafId.json', 'utf-8'));
}

/**
 * Increment the panelId value by 1 and write that back to the file returning the incremented object
 * @param { {'panelId': number} } id Optional parameter that represents an object with the current panelID
 * 
 * @return { {'panelId': number} } The result of incrementing panelId by 1
*/
export function incrementGrafID(id?: {'panelId' : number}): void {
  //Since the id parameter is optional if not provided method will automatically grab it
  const grafId = id || getGrafID();

  grafId.panelId += 1;
  fs.writeFileSync('./grafana/grafId.json', JSON.stringify(grafId));

  return grafId;
}