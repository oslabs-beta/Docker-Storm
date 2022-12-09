import React from 'react';
import * as ReactDOM from 'react-dom';



const PgInit = () => {
  return (
    ReactDOM.createPortal(<div>asdf</div>, document.getElementById('root') as HTMLElement)
  );
};

export default PgInit;
