import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitApplication from '../../../pages/ContactUs/contact_us';  // Corrected path to the component

// Mock the ContactForm since we only need to ensure it is rendered in SubmitApplication
// Import path is corrected as well, assuming the ContactForm is a separate component file
jest.mock('../../../pages/ContactUs/ContactForm', () => () => <div>ContactFormComponent</div>);

describe('SubmitApplication', () => {
  it('renders the component with title, message, and includes the ContactForm', () => {
    render(<SubmitApplication />);

    // Check for the page title
    expect(screen.getByText('Contact us')).toBeInTheDocument();

    // Check for the message to users
    expect(screen.getByText(/Do you have any questions, inquiries or would like us to add something to the calendar - send us a message!/)).toBeInTheDocument();

    // Ensure the ContactForm is included
    expect(screen.getByText('ContactFormComponent')).toBeInTheDocument();
  });
});
