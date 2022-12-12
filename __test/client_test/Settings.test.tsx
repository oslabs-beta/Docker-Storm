import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Settings from '../../dist/client/pages/Settings.jsx';


describe('Settings Page', () => {

  beforeEach(() => {
    render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
  });

  it('should render submit target button and password update button', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);    
  });

  it('should handle a click when clicking target Submit', () => {
    const mockClick = jest.fn();
    const button = screen.getByText('SUBMIT A TARGET');
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should render 5 input fields for password and target updating', () => {
    const currPass = screen.getByPlaceholderText('Current Password');
    const newPass = screen.getByPlaceholderText('New Password');
    const confNewPass = screen.getByPlaceholderText('Confirm New Password');
    const address = screen.getByPlaceholderText('Ip Address');
    const jobName = screen.getByPlaceholderText('Job Name');
    expect(currPass);
    expect(newPass);  
    expect(confNewPass);
    expect(address);
    expect(jobName);    
  });

  it('should show the correct choices in the dropdown list', () => {
    const dropdownList = screen.getByTestId('target-list');  
    expect(dropdownList).toHaveTextContent('Manager');
    expect(dropdownList).toHaveTextContent('Worker');
    expect(dropdownList).toHaveTextContent('Daemon');
    expect(dropdownList).toHaveTextContent('Overall');
  });



  // test below will not work as it won't invoke the actual function addTarget 
  // it('should render Added Node when clicking target Submit', () => {
  //   const mockClick = jest.fn();
  //   const button = screen.getByText('SUBMIT A TARGET');
  //   button.onclick = mockClick;
  //   fireEvent.click(button);
  //   const text = screen.getByText('Added node!');
  //   expect(text).toBeInTheDocument();
  // });
});
