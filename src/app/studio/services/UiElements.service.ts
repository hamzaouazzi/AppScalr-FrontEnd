import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UiCategory } from '../models/UiCategory.model';
import { CONSTANTES } from '../../core/config/constantes';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UiElementsService {
    constructor(private http: HttpClient) { }



    //get call to fetch all ui elements from DB
    __fetchAllUiElements(): Observable<UiCategory[]>{
        return this.http.get<UiCategory[]>(CONSTANTES.urls.fetch_categories_url, CONSTANTES.HTTP_HEADERS);
    }
    
}