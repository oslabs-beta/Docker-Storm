import 'whatwg-fetch';
import * as React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../../dist/client/App.jsx';
import RenderViews from '../../dist/client/RenderViews.jsx';
import Metrics from '../../dist/client/pages/Metrics.jsx';
import Settings from '../../dist/client/pages/Settings.jsx';
import Users from '../../dist/client/pages/Users.jsx';


describe('Initial Login View', () => {
  it('should render Initial Login Page', () => {
    render(<App />);
    const loginButton = screen.getByText('LOGIN');
    expect(loginButton).toBeInTheDocument();    
  });

  it('should render Home page', () => {
    render(
      <Router>
        <RenderViews dashId={''} targetsArr={[]} setTargetsArr={function (): void {
          throw new Error('Function not implemented.');
        } } grafUrl={''} />
      </Router>);
    const settings = screen.getByText('Settings');
    expect(settings).toBeInTheDocument();    
  });
  
  it('should render Metrics page', () => {
    render(
      <Router>
        <Metrics dashId={''} grafUrl={''} />
      </Router>);    
    const metrics = screen.getByText('Metrics');
    expect(metrics).toBeInTheDocument();
  });

  it('should render Settings page', () => {
    render(
      <Router>
        <Settings targetsArr={[]} setTargetsArr={function (): void {
          throw new Error('Function not implemented.');
        } } />
      </Router>);
    const updatePassword = screen.getByText('UPDATE PASSWORD');
    expect(updatePassword).toBeInTheDocument();  
  });

  it('should render Users page', () => {
    render(
      <Router>
        <Users />
      </Router>);   
    const userList = screen.getByText('List of all users');
    expect(userList).toBeInTheDocument();     
  });
});

describe('Logout Button', () => {
  it('should display login page', () => {
    render(<App />);
    const loginButton = screen.getByText('LOGIN');
    expect(loginButton).toBeInTheDocument();    
  });

});


