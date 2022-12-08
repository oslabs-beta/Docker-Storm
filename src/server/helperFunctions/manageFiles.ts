import fs from 'fs';

export function getGrafID(){
  return JSON.parse(fs.readFileSync('./grafana/grafId.json', 'utf-8'));
}

export function incrementGrafID(id?: {'panelId' : number}): void{
  const grafId = id || getGrafID();

  grafId.panelId += 1;

  fs.writeFileSync('./grafana/grafId.json', JSON.stringify(grafId));

  return grafId;
}