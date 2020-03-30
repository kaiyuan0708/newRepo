import React from 'react';
import ReactDOM from 'react-dom';
//import Car from './App.js';
//import './CSS.css';
import './mysass.scss';


const myelement1 = <h1>React is {5 + 5} times better with JSX</h1>;
const myelement2 = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);
const myelement3 = (
  <div>
    <h1>I am a Header.</h1>
    <h1>I am a Header too.</h1>
  </div>
);
//const myelement = <input type="text" />;


/*class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}*/

/*function Car() {
  return <h2>Hi, I am also a Car!</h2>;
}*/

/*class Car extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
    return <h2>I am a {this.state.color} Car!</h2>;
  }
}*/

/*class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.color} Car!</h2>;
  }
}*/

/*class Car extends React.Component {
  render() {
    return <h2>I am a Car!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    return (
      <div>
      <h1>Who lives in my Garage?</h1>
      <Car />
      </div>
    );
  }
}*/

//Props
/*class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>
  }
}
const myelement = <Car brand="Ford" />;
ReactDOM.render(myelement, document.getElementById('root'));*/

/*class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
	const carname="Ford"; //new add
    return (
      <div>
      <h1>Who lives in my garage?</h1>
	  <Car brand={carname} />
      <Car brand="Ford" />
      </div>
    );
  }
}
ReactDOM.render(<Garage />, document.getElementById('root'));*/

/*class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand.name} {this.props.brand.model}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    const carinfo = {name: "Ford", model: "Mustang"};
    return (
      <div>
      <h1>Who lives in my garage?</h1>
      <Car brand={carinfo} />
      </div>
    );
  }
}
ReactDOM.render(<Garage />, document.getElementById('root'));*/

/*class Car extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h2>I am a Car!</h2>;
  }
}
ReactDOM.render(<Car model="Mustang"/>, document.getElementById('root'));*/

//ReactDOM.render(myelement, document.getElementById('root'));

//ReactDOM.render(<Car />, document.getElementById('root')); //can use for App.js 1 2 3

//ReactDOM.render(<Car color="black"/>, document.getElementById('root')); //props

//ReactDOM.render(<Garage />, document.getElementById('root'));

//State
/*class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Perodua",
      model: "Myvi",
      color: "Grey",
      year: 2020
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color} {this.state.model} from {this.state.year}.
        </p>
      </div>
    );
  }
}
ReactDOM.render(<Car />, document.getElementById('root'));*/
/*
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  changeColor = () => {
    this.setState({color: "blue",brand:"BMW"});
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
			It is a {this.state.color} {this.state.model} from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
      </div>
    );
  }
}
ReactDOM.render(<Car />, document.getElementById('root'));*/

//react lifecycle (mounting, updating, unmounting)
/*
1) mounting - putting elements into DOM
- constructor()
- getDerivedStateFromProps()
- render()
- componentDidMount()
*/
//constructor()
/*class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red",brand:"BMW"};
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor} and car is {this.state.brand} </h1>
    );
  }
}
ReactDOM.render(<Header />, document.getElementById('root'));*/

//getDerivedStateFromProps()
/*class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red",brand:"BMW"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol, brand: props.favbrand};
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor} and car is {this.state.brand}</h1>
    );
  }
}
ReactDOM.render(<Header favcol="yellow" favbrand="Perodua"/>, document.getElementById('root'));
*/
//render()
/*class Header extends React.Component {
  render() {
    return (
      <h1>This is the content of the Header component</h1>
    );
  }
}
ReactDOM.render(<Header />, document.getElementById('root'));*/

//componentDidMount()
/*class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}
ReactDOM.render(<Header />, document.getElementById('root'));*/

/*
2) updating- A component is updated whenever there is a change in the component's state or props.
React has five built-in methods that gets called, in this order, when a component is updated:
- getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()
*/
//getDerivedStateFromProps() //no matter how also can yellow colour
/*class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}
ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));*/

//shouldComponentUpdate() --> true or false (cannot change)
// render()
// getSnapshotBeforeUpdate() --?before after
/*class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "Before the update, the favorite was " + prevState.favoritecolor;
  }
  componentDidUpdate() {
    document.getElementById("div2").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <div id="div1"></div>
      <div id="div2"></div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));*/
// componentDidUpdate()



/*
3) unmounting - when a component is removed from the DOM
//componentWillUnmount()
*/
/*
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }
  delHeader = () => {
    this.setState({show: false});
  }
  render() {
    let myheader;
    if (this.state.show) {
      myheader = <Child />;
    };
    return (
      <div>
      {myheader}
      <button type="button" onClick={this.delHeader}>Delete Header</button>
      </div>
    );
  }
}

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));*/

//react events - onClick,  onClick="shoot()"
//event handler
/*class Football extends React.Component {
  shoot() {
    alert("Great Shot!");
  }
  render() {
    return (
      <button onClick={this.shoot}>Take the shot!</button>
    );
  }
}

ReactDOM.render(<Football />, document.getElementById('root'));*/

//goal
/*class Football extends React.Component {
  shoot = (a) => {
    alert(a);
  }
  render() {
    return (
      <button onClick={() => this.shoot("Goal")}>Take the shot!</button>
    );
  }
}

ReactDOM.render(<Football />, document.getElementById('root'));*/

//send goal as parameter
/*class Football extends React.Component {
  shoot(a) {
    alert(a);
  }
  render() {
    return (
      <button onClick={this.shoot.bind(this, "Goal")}>Take the shot!</button>
    );
  }
}

ReactDOM.render(<Football />, document.getElementById('root'));*/

//click
/*class Football extends React.Component {
  shoot = (a, b) => {
    alert(b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
/*  }
  render() {
    return (
      <button onClick={(ev) => this.shoot("Goal", ev)}>Take the shot!</button>
    );
  }
}

ReactDOM.render(<Football />, document.getElementById('root'));*/

//bind method
/*class Football extends React.Component {
  shoot = (a, b) => {
    alert(b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
 /* }
  render() {
    return (
      <button onClick={this.shoot.bind(this, "Goal")}>Take the shot!</button>
    );
  }
}

ReactDOM.render(<Football />, document.getElementById('root'));*/

//form - initialize the state in the constructor method before you can use it.

/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    return (
      <form>
      <h1>Hello {this.state.username}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));*/

//Display the header only if username is defined:
/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    let header = '';
    if (this.state.username) {
      header = <h1>Hello {this.state.username}</h1>;
    } else {
      header = '';
    }
    return (
      <form>
      {header}
      <p>Enter your name:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));*/

//submitting form

/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.username);
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>Hello {this.state.username}</h1>
      <p>Enter your name, and submit:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      <input
        type='submit'
      />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));*/

//multiple value
/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
	  gender: '',
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
	let gen = event.target.genderhaha;
    this.setState({[nam]: val, [gen]:gen}); //luan lai de
  }
  render() {
    return (
      <form>
      <h1>Hello {this.state.username} Age: {this.state.age}  Gender: {this.state.gender}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Enter your age:</p>
      <input
        type='text'
        name='age'
        onChange={this.myChangeHandler}
      />
	  <p>Enter your gender:</p>
      <input
        type='text'
        name='gender'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root')); */

//validating from input
/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam === "age") {
      if (!Number(val)) {
        alert("Your age must be a number");
      }
    }
    this.setState({[nam]: val});
  }
  render() {
    return (
      <form>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Enter your age:</p>
      <input
        type='text'
        name='age'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));*/

//submit age must be number
/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    let age = this.state.age;
    if (!Number(age)) {
      alert("Your age must be a number");
    }
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Enter your age:</p>
      <input
        type='text'
        name='age'
        onChange={this.myChangeHandler}
      />
      <br/>
      <br/>
      <input type='submit' />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));*/

//error message
/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
      errormessage: ''
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "age") {
      if (val !="" && !Number(val)) {
        err = <strong>Your age must be a number</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});
  }
  render() {
    return (
      <form>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Enter your age:</p>
      <input
        type='text'
        name='age'
        onChange={this.myChangeHandler}
      />
      {this.state.errormessage}
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));*/

//textarea select

//css
/*class MyHeader extends React.Component {
  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };
	const freestyle = {
      color: "black",
      backgroundColor: "Blue",
      padding: "20px",
      fontFamily: "Arial"
    };
    return (
      <div>
      <h1 style={mystyle}>Hello Style!</h1>
      <p style={freestyle}>Add a little style!</p>
      </div>
    );
  }
}

ReactDOM.render(<MyHeader />, document.getElementById('root'));*/


/*class MyHeader extends React.Component {
  render() {
    return (
      <div>
      <h1>Hello Style!</h1>
      <p>Add a little style!.</p>
      </div>
    );
  }
}

ReactDOM.render(<MyHeader />, document.getElementById('root'));*/

//ReactDOM.render(<Car />, document.getElementById('root')); //use for module

//Sass

class MyHeader extends React.Component {
  render() {
    return (
      <div>
      <h1>Hello Style!</h1>
      <p>Add a little style!.Changed</p>
      </div>
    );
  }
}

ReactDOM.render(<MyHeader />, document.getElementById('root'));

