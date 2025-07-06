import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Validators } from '@angular/forms'

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
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      birthDate: [''],
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
  if (this.formGroupContact.invalid){
    alert("Preencha os campos obrigatórios!");
    return;
  }  

  this.service.save(this.formGroupContact.value).subscribe({
    next: json => {
      this.showMessage = 'Contato salvo com sucesso!';
      this.formGroupContact.reset();
      setTimeout(() => this.showMessage = '', 3000); 
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
      contact.telephone.includes(term);
      const matchesCategory = this.selectedCategory === '' || contact.category === this.selectedCategory;
      return matchesText && matchesCategory;
    });
  }






}
