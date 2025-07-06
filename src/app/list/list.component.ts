import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ListService } from '../list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  showFavoritesOnly: boolean = false;
  selectedFilter: string = 'todos';

  constructor(private service: ListService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.service.getAll().subscribe({
      next: json => {
        this.contacts = json;
        this.filterContacts();
      }
    });
  }

  filterContacts(): void {
  const term = this.searchTerm.toLowerCase();

  this.filteredContacts = this.contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.number.includes(term);

    const matchesFilter =
      this.selectedFilter === 'todos' ? true :
      this.selectedFilter === 'favoritos' ? contact.favorite :
      contact.category?.toLowerCase() === this.selectedFilter;

    return matchesSearch && matchesFilter;
    });
  }

  toggleFavorites(): void {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.filterContacts();
  }

  deleteContact(contact: Contact): void {
    if (confirm(`Tem certeza que deseja excluir ${contact.name}?`)) {
      this.service.delete(contact).subscribe(() => this.loadContacts());
    }
  }

  editContact(contact: Contact): void {
    this.router.navigate(['/contacts'], { state: { contact } });
  }

}
