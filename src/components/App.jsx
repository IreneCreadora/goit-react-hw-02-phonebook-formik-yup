import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Layout } from './Layout';

import ContactForm from './ContactForm/contactForm';
import Notification from './Notification/notification';
import ContactList from './ContactList/contactList';
import Filter from './Filter/filter';

import { Container, Phonebook, Contacts, Section } from './Component.styled';

export class App extends Component {
  state = {
    contacts: [
      {
        id: 'id-1',
        name: 'Rosie Simpson',
        number: '459-12-56',
        birthDate: '03.08.2011',
        notes:
          'dndvkmdjncxjnmjscnjsnchbndchbhdcbhscbhbnscjncsjnmcjimsjckmckjmn',
      },
      {
        id: 'id-2',
        name: 'Hermione Kline',
        number: '443-89-12',
        relation: 'Family',
        birthDate: '07.23.1969',
        notes: 'dflks dfljknsdfc dknkdnfv dfckjkndf',
      },
      {
        id: 'id-3',
        name: 'Eden Clements',
        number: '645-17-79',
        relation: 'Services',
        birthDate: '11.22.2003',
      },
      {
        id: 'id-4',
        name: 'Annie Copeland',
        number: '227-91-26',
        relation: 'Colleagues',
        birthDate: '09.20.1999',
      },
    ],
    filter: '',
  };

  handleFilterChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  filteredContacts = () => {
    const filterNormalize = this.state.filter.toLowerCase();

    return this.state.contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(filterNormalize);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  formSubmit = values => {
    console.log(values);
    this.setState(prevState => {
      const { contacts } = prevState;
      if (
        contacts.find(
          contact => contact.name.toLowerCase() === values.name.toLowerCase()
        )
      ) {
        alert(`${values.name} is already in contact`);
        return contacts;
      }
      return {
        contacts: [{ id: nanoid(), ...values }, ...contacts],
      };
    });
  };

  contactDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(constact => constact.id !== id),
    }));
  };
  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.filteredContacts(filter);
    return (
      <Layout>
        <Container>
          <Phonebook>Phonebook</Phonebook>
          <ContactForm onSubmit={this.formSubmit} />

          <Contacts>Contacts</Contacts>
          {contacts.length === 0 ? (
            <Notification message="Your contact book is empty, add your first contact!" />
          ) : (
            <Section>
              <Filter
                title="Find contact by name"
                onChange={this.handleFilterChange}
                value={filter}
              />
              <ContactList
                filteredContacts={filteredContacts}
                onDelete={this.contactDelete}
              />
            </Section>
          )}
        </Container>
      </Layout>
    );
  }
}
