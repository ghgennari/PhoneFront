import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://ghgennari.duckdns.org/contacts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl);
  }

  save(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  update(contact: Contact): Observable<Contact>{
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`,contact);
  }

}
