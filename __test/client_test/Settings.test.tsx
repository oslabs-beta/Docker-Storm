import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, getByText} from '@testing-library/react';
import Settings from '../../dist/client/pages/Settings.jsx';
import { Target } from '../../dist/types.js';



describe('Settings Page', () => {
  it('should render target button and update button', () => {
    const { getAllByRole } = render(<Settings targetsArr={[]} setTargetsArr={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
  });

  it('should handle clicks', () => {
    const { getByText } = render(<Settings targetsArr={[]} setTargetsArr={function (value: React.SetStateAction<Target[]>): void {
      throw new Error('Function not implemented.');
    } } />);
    const onClick = jest.fn();
    const button = getByText('SUBMIT A TARGET');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
});
});
