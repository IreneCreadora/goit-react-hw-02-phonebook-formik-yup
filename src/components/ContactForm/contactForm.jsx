// import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const ErrorText = styled.p`
  color: red;
`;

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
  relation: Yup.string().required('Please select a product').oneOf(relations),
  name: Yup.string().required(),
  number: Yup.number().min(8, 'Too Short!').required(),
  notes: Yup.string(),
  birthDate: Yup.date().nullable().min(new Date(1960, 0, 1)),
  importantContact: Yup.boolean().default(false),
});

const initialValues = {
  name: '',
  number: '',
  notes: '',
  birthDate: new Date(1960, 0, 1),
  importantContact: false,
  relation: '',
};

export const ContactForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <div>
          <label htmlFor="name">Full name</label>
          <div>
            <Field name="name" type="text" placeholder="Full name" />
            <FormError name="name" />
          </div>
        </div>
        <div>
          <label htmlFor="number">Phone number</label>
          <div>
            <Field name="number" type="text" placeholder="Phone number" />
            <FormError name="number" />
          </div>
        </div>
        <div>
          <label htmlFor="relation">Relations</label>
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
          <label htmlFor="birthDate">Date of birthday</label>
          <div>
            <Field
              name="birthDate"
              type="text"
              placeholder="Date of birthday"
            />
            <FormError name="birthDate" />
          </div>
        </div>
        <div>
          <label htmlFor="notes">For notes</label>
          <div>
            <Field name="notes" as="textarea" placeholder="For notes" />
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
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
