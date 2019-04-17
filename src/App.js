import React, { Component } from 'react';
import './style.css'
import image from './assets/images/haha.jpg';

class App extends Component {
  render() {
    return (
      <div className="hello">
      Hellow, React World
      <img src={image}/>
      </div>
    );
  }
}

export default App;
