import { Container, Title, ContactList } from './App.styled';
import { Component } from 'react';
import { Contacts } from './Contacts/Contacts';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts)
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  addNewContact = newContact => {
    const { contacts } = this.state;
    const newContactNormalize = newContact.name.toLowerCase();

    // const isDublicate = this.state.contacts.map(contact =>
    //   contact.name.toLowerCase()
    // );

    const isDublicate = contacts.find(
      ({ name }) => name.toLocaleLowerCase() === newContactNormalize
    );

    isDublicate
      ? alert(`${newContact.name} is already in contacts.`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, newContact],
          };
        });
  };

  findByFilter = filterValue => this.setState({ filter: filterValue });

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <Container>
        <ContactsForm addNewContact={this.addNewContact} />
        <Title>Contacts</Title>
        <Filter findByFilter={this.findByFilter} value={this.state.filter} />
        <ContactList>
          <Contacts
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </ContactList>
      </Container>
    );
  }
}
