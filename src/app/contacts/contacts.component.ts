import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  
  contacts: Contact[] = [];
  formGroupContact: FormGroup;
  isEditing: boolean = false;
  filteredContacts: Contact[] = [];
  
  searchTerm: string = '';
  selectedCategory: String = '';
  showMessage: string = '';
  
  constructor(private service: ContactService, private formBuilder: FormBuilder){
    this.formGroupContact = formBuilder.group({
      id: [''],
      name: [''],
      number: [''],
      email: [''],
      address: [''],
      category: [''],
      favorite: [false],
      notes: [''],
      photoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadContacts();
    const contactFromNavigation = history.state.contact;

    if (contactFromNavigation) {
      this.isEditing = true;
      this.formGroupContact.patchValue(contactFromNavigation);
    }
  }

  loadContacts(){
    this.service.getAll().subscribe({
      next: json => {
        this.contacts = json;
        this.filteredContacts = json;
      }
    });
  }

  save() {
  this.service.save(this.formGroupContact.value).subscribe({
    next: json => {
      this.formGroupContact.reset(); // limpa o formulário
      this.showMessage = 'Contato salvo com sucesso!';
      setTimeout(() => this.showMessage = '', 3000); // some após 3 segundos
    }
  });
}

  onClickUpdate(contact: Contact){
    this.isEditing = true;
    this.formGroupContact.setValue(contact);
  }

  update(){
    this.service.update(this.formGroupContact.value).subscribe({
      next: () => {
        this.loadContacts();
        this.clear();
      }
    });
  }

  clear(){
    this.isEditing = false;
    this.formGroupContact.reset();
  }

  filterContacts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact => {
      const matchesText = contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.number.includes(term);
      const matchesCategory = this.selectedCategory === '' || contact.category === this.selectedCategory;
      return matchesText && matchesCategory;
    });
  }






}
