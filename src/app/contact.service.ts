import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl);
  }

  save(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  /*delete(contact: Contact): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${contact.id}`)
  }*/

  update(contact: Contact): Observable<Contact>{
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`,contact);
  }

}
