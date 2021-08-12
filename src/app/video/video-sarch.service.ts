import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IVideo } from './video.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VideoSarchService {

  constructor(private http: HttpClient,) { }

  getVideos(videoData, page = 1 ): Observable<IVideo[]> {
    //console.log("service", videoData)
    let url =`http://www.omdbapi.com/?s=${videoData.title}&page=${page}&y=${videoData.year}&type=movie&apikey=157f34ed`;
    return this.http.get<IVideo[]>(url).pipe(
      catchError(this.handleError<IVideo[]>('getVideos', []))
    )
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
    }
  }

}
