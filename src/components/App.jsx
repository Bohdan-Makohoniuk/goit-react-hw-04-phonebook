import React, { Component } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import {Container} from '../App.styled'


      

class App extends Component {
   state = {
      contacts: [
         // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
         // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
         // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
         // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
   };
   onSubmit = newContact => {
     
      if (this.state.contacts.find(
            contact =>
               contact.name.toLocaleLowerCase() ===
               newContact.name.toLocaleLowerCase()
         )
      ) {
         alert(newContact.name + ' is alredy in contacts');
         return true;
      }
      this.setState(prevState => ({
         contacts: [...prevState.contacts, newContact],
      }));
   };

   
   onChangeFilter =  e => {
       this.setState({ filter: e.target.value });
   };


   deleteContact = id => {
      this.setState(prevState => ({
         contacts: prevState.contacts.filter(contact => contact.id !== id),
      }));
   };

// Під час завантаження застосунку контакти, якщо такі є, зчитуються з локального сховища і записуються у стан.
   componentDidMount() {
      const contacts = localStorage.getItem('contacts');
      const parsContact = JSON.parse(contacts);
      if (parsContact) {
         this.setState({ contacts: parsContact })
      }
      ;
   }

   // Під час додавання та видалення контакту, контакти зберігаються у локальне сховище.
   componentDidUpdate(prevProps, prevState) {
      if (this.state.contacts !== prevState) {
         localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
      }
      console.log(prevState);
      console.log(this.state);
   }

   

   render() {
      const { contacts, filter } = this.state;
      const normFilter = filter.toLocaleLowerCase();
      const visibleContacts = contacts.filter(contact =>
         contact.name.toLocaleLowerCase().includes(normFilter)
      );

      return (
         <Container>
            <h1>Phonebook</h1>
            <ContactForm
               onSubmit={this.onSubmit}
               
            />
            <h2>Contacts</h2>
            <Filter filter={filter} onChange={this.onChangeFilter} />
            <ContactList
               visibleContacts={visibleContacts}
               deleteContact={this.deleteContact}
            />
         </Container>
      );
   }
}

export default App;

