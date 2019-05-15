import React from 'react';
import ReactDOM from 'react-dom';
import AppLayou from '.src/components/AppRoutes';

window.onload = () => {
  ReactDOM.render(<AppLayou/>, document.getElementById('react-app-root'));
};
