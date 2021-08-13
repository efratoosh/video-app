import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoSessionService {

  constructor() { }

  checkInSession({title, year = ''}, page): string{
    let dataSaved = sessionStorage.getItem(`${title}_${year}_${page}`);
    return dataSaved;
  }

  saveToSession(data, {title, year = ''}, page) :void{
    sessionStorage.setItem(`${title}_${year}_${page}`, JSON.stringify(data));
  }


}
