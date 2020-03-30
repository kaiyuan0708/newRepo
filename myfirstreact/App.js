import React from 'react';
import ReactDOM from 'react-dom';
import styles from './mystyle.module.css'; 

/*function App() {
  return (
    <div className="App">
		<h1>Hello!/h1>  
    </div>
  );
}*/

class Car extends React.Component {
  render() {
    return <h1 className={styles.bigblue}>Hello Car from App.js!</h1>;
  }
   
}


export default Car;
