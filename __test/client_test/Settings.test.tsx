import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Settings from '../../dist/client/pages/Settings.jsx';


describe('Settings Page', () => {
  
  it('should render submit target button and password update button', () => {
    const { getByTestId } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    const button = getByTestId('target-button');
    expect(button).toHaveTextContent('SUBMIT');    
  });

  it('should render submit target button and password update button', () => {
    const { getByTestId } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    const button = getByTestId('pw-button');
    expect(button).toHaveTextContent('SUBMIT');    
  });

  it('should handle a click when clicking Submit', () => {
    const mockClick = jest.fn();
    const { getByTestId } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    const button = getByTestId('pw-button');
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should handle a click when clicking Submit', () => {
    const mockClick = jest.fn();
    const { getByTestId } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    const button = getByTestId('target-button');
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should render 3 input fields for password updating', () => {
    const { getByPlaceholderText } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    const currPass = getByPlaceholderText('Current Password');
    const newPass = getByPlaceholderText('New Password');
    const confNewPass = getByPlaceholderText('Confirm New Password');
    expect(currPass);
    expect(newPass);  
    expect(confNewPass);
  });

  it('should render 3 input fields for target updating', () => {
    const { getByPlaceholderText } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    const address = getByPlaceholderText('Ip Address');
    const ports = getByPlaceholderText('Port(s) by comma');
    const jobName = getByPlaceholderText('Job Name');
    expect(address);
    expect(ports);
    expect(jobName);    
  });

  it('should contain a dropdown list', () => {
    const { getByTestId } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);    
    const dropdown = getByTestId('target-list');
    expect(dropdown).toBeInTheDocument();
  });
});