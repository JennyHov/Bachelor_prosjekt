import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitApplication from '../../../pages/ContactUs/contact_us';  

// mocking for ContactForm
jest.mock('../../../pages/ContactUs/ContactForm', () => () => <div>ContactFormComponent</div>);

describe('SubmitApplication', () => {
  it('renders the component with title, message, and includes the ContactForm', () => {
    render(<SubmitApplication />);

    // ser etter sidetittelen for contact us 
    expect(screen.getByText('Contact us')).toBeInTheDocument();

    // sjekker for meldingene til brukere 
    expect(screen.getByText(/Do you have any questions, inquiries or would like us to add something to the calendar - send us a message!/)).toBeInTheDocument();

    // sikrer at contactus formen er med
    expect(screen.getByText('ContactFormComponent')).toBeInTheDocument();
  });
});
