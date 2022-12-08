// import { Component } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';
import {
  FormStyled,
  Label,
  Input,
  TextArea,
  Button,
  ErrorText,
} from '../Component.styled';

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const relations = ['Family', 'Friends', 'Colleagues', 'Services'];

const validationSchema = Yup.object({
  relation: Yup.string().required('Please select a relation').oneOf(relations),
  name: Yup.string().required(),
  number: Yup.number().min(8, 'Too Short!').required(),
  notes: Yup.string(),
  birthDate: Yup.date().nullable().min(new Date(1960, 0, 30)),
  importantContact: Yup.boolean().default(false),
});

const initialValues = {
  name: '',
  number: '',
  notes: '',
  birthDate: new Date(1960, 0, 30).toLocaleDateString(),
  importantContact: false,
  relation: '',
};

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormStyled autoComplete="off">
        <div>
          <Label htmlFor="name">Full name</Label>
          <div>
            <Input name="name" type="text" placeholder="Full name" />
            <FormError name="name" />
          </div>
        </div>
        <div>
          <Label htmlFor="number">Phone number</Label>
          <div>
            <Input name="number" type="text" placeholder="Phone number" />
            <FormError name="number" />
          </div>
        </div>
        <div>
          <Label htmlFor="relation">Relations</Label>
          <div>
            <Field name="relation" as="select">
              <option value="">Select relations</option>
              {relations.map((relation, idx) => (
                <option value={relation} key={idx}>
                  {relation}
                </option>
              ))}
            </Field>
            <FormError name="relation" />
          </div>
        </div>
        <div>
          <Label htmlFor="birthDate">Date of birthday</Label>
          <div>
            <Input
              name="birthDate"
              type="text"
              placeholder="Date of birthday"
            />
            <FormError name="birthDate" />
          </div>
        </div>
        <div>
          <Label htmlFor="notes">For notes</Label>
          <div>
            <TextArea name="notes" as="textarea" placeholder="For notes" />
            <FormError name="notes" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="importantContact">
              <Field name="importantContact" type="checkbox" />
              Mark as important contact
            </label>
          </div>
        </div>
        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};

export default ContactForm;
