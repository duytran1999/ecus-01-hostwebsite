import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import ImageUpload from './components/ImageUpload'
import { FirebaseApp } from './firebase'
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ImageUpload />
        </header>

      </div>
    );
  }
}

