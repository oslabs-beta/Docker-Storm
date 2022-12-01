import 'whatwg-fetch';
import * as React from 'react';
import '@testing-library/jest-dom';
import App from '../../dist/client/App.jsx';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import RenderViews from '../../dist/client/RenderViews.jsx';
import Metrics from '../../dist/client/pages/Metrics.jsx';
import Settings from '../../dist/client/pages/Settings.js';
import Swarms from '../../dist/client/pages/Swarms.jsx';
import Users from '../../dist/client/pages/Users.jsx';


describe('all React components', () => {
  it('renders the App component', () => {
    render(<App />);
    const loginButton = screen.getByText('LOGIN');
    expect(loginButton).toBeInTheDocument();    
  });

  it('should render RenderView page', () => {
    render(
      <Router>
        <RenderViews />
      </Router>);
    const appName = screen.getByText('DOCKER STORM');
    expect(appName).toBeInTheDocument();    
  });
  
  it('should render Metrics page', () => {
    render(
      <Router>
        <Metrics />
      </Router>);    
    const metrics = screen.getByText('Metrics');
    expect(metrics).toBeInTheDocument();
  });

  it('should render Settings page', () => {
    render(
      <Router>
        <Settings />
      </Router>);
    const updatePassword = screen.getByText('UPDATE PASSWORD');
    expect(updatePassword).toBeInTheDocument();  
  });

  it('should render Swarms page', () => {
    render(
      <Router>
        <Swarms />
      </Router>);   
    const swarms = screen.getByText('Swarms');
    expect(swarms).toBeInTheDocument(); 
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