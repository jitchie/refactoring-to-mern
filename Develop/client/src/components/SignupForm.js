import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_USERS } from '../utils/queries';

const SignupForm = () => {
  
  // // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // // set state for form validation
  const [validated] = useState(false);
  // // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // const [createUser, { error }] = useMutation(CREATE_USER, {
  //   // The update method allows us to access and update the local cache
  //   update(cache, { data: { createUser } }) {
  //     try {
  //       // First we retrieve existing profile data that is stored in the cache under the `QUERY_PROFILES` query
  //       // Could potentially not exist yet, so wrap in a try/catch
  //       const { users } = cache.readQuery({ query: QUERY_USERS });

  //       // Then we update the cache by combining existing profile data with the newly created data returned from the mutation
  //       cache.writeQuery({
  //         query: QUERY_USERS,
  //         // If we want new data to show up before or after existing data, adjust the order of this array
  //         data: { users: [...users, createUser] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   // check if form has everything (as per react-bootstrap docs)
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   try {
  //     const response = await createUser(userFormData);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const { token, user } = await response.json();
  //     console.log(user);
  //     Auth.login(token);
  //   } catch (err) {
  //     console.error(err);
  //     setShowAlert(true);
  //   }

  //   setUserFormData({
  //     username: '',
  //     email: '',
  //     password: '',
  //   });
  // };

    // const [formState, setFormState] = useState({
    //   username: '',
    //   email: '',
    //   password: '',
    // });
    const [createUser, { error, data }] = useMutation(ADD_USER);
  
    // const handleChange = (event) => {
    //   const { name, value } = event.target;
  
    //   setFormState({
    //     ...formState,
    //     [name]: value,
    //   });
    // };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(userFormData);
  
      try {
        const { data } = await createUser({
          variables: { ...userFormData },
        });
  
        Auth.login(data.createUser.token);
      } catch (e) {
        console.error(e);
      }
    };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
