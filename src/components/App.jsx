import { Container, Title, ContactList } from './App.styled';
import { useState, useEffect } from 'react';
import { Contacts } from './Contacts/Contacts';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = newContact => {
    const newContactNormalize = newContact.name.toLowerCase();

    const isDublicate = contacts.find(
      ({ name }) => name.toLocaleLowerCase() === newContactNormalize
    );

    isDublicate
      ? alert(`${newContact.name} is already in contacts.`)
      : setContacts(prevState => [...prevState, newContact]);
  };

  const findByFilter = filterValue => setFilter(filterValue);

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContacts = getFilteredContacts();
  return (
    <Container>
      <ContactsForm addNewContact={addNewContact} />
      <Title>Contacts</Title>
      <Filter findByFilter={findByFilter} value={filter} />
      <ContactList>
        <Contacts contacts={filteredContacts} deleteContact={deleteContact} />
      </ContactList>
    </Container>
  );
};
