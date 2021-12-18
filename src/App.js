import { Component } from 'react';

import ContactForm from './ContactForm';
import Section from './Section';
import ContactList from './ContactList';
import InputElement from './ContactForm/InputElement';

import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  filterContacts = text =>
    this.state.contacts.filter(contact => contact.name.toUpperCase().includes(text.toUpperCase()));

  handleDelete = event => {
    const newContacts = this.state.contacts.filter(contact => contact.id !== event.target.id);

    this.setState(() => ({ contacts: newContacts, filter: '' }));
  };

  addContact = ({ id, name, number }) =>
    this.setState(prevstate => ({
      contacts: [...prevstate.contacts, { id, name, number }],
      filter: '',
    }));

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onFormSubmit={this.addContact} contacts={this.state.contacts} />
        </Section>
        <Section title="Contacts">
          <InputElement
            className={styles.filter}
            name="filter"
            type="text"
            value={this.state.filter}
            text="Find contacts by name"
            onChange={this.handleChange}
          />
          <ContactList
            contacts={this.filterContacts(this.state.filter)}
            onClick={this.handleDelete}
          />
        </Section>
      </>
    );
  }
}

export default App;
