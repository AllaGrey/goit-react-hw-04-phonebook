import { Contact } from 'components/Contact/Contact';

export const Contacts = ({ contacts, deleteContact }) => {
  return contacts.map(contact => (
    <Contact key={contact.id} contact={contact} deleteContact={deleteContact} />
  ));
};
