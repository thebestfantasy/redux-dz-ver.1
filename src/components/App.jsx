import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './app.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contact')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const formSubmitHandler = (name, number) => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (name.trim() !== '' && number.trim() !== '')
      setContacts(prevContacts => [
        ...prevContacts,
        { id: nanoid(), name, number },
      ]);
  };

  const handleDeleteContact = contactId => {
    const updateContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updateContacts);
  };

  return (
    <>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        filteredContacts={getFilteredContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </>
  );
};

export default App;
