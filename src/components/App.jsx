import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Layout } from './Layout';

import { ContactForm } from './ContactForm/contactForm';

export class App extends Component {
  render() {
    return (
      <Layout>
        <ContactForm />
      </Layout>
    );
  }
}
