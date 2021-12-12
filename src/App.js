import React, { useState, useEffect } from 'react';
import './App.css';
import Wheel from './components/Wheel/Wheel';

export default function App({name}) {
  const [params, setParams] = useState({})

  //Handle user data
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    
    setParams({...params, 
      guid: urlParams.get('guid'),
      username: urlParams.get('username'),
      randomChosenPackage: urlParams.get('RandomChosenPackage')
    })
  }, []) 

  return (
    <div className="App">
      <h1 className="white-title"> {name ? name : "Default Title"}</h1>
      <Wheel params={params}/>
    </div>
  );
}




























// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       params: {}
//     }
//   }
//   componentDidMount() {
//     const queryString = window.location.search
//     const urlParams = new URLSearchParams(queryString)

//     this.setState(prev => ({ ...prev,
//       guid: urlParams.get('guid'),
//       username: urlParams.get('username'),
//       randomChosenPackage: urlParams.get('RandomChosenPackage')
//     }))
//   }

//   render() {
//     console.log(this.props)
//     return (
//       <div className="App">
//         <h1 className="white-title"> {this.props.name ? this.props.name : "Default Title"}</h1>
//         <Wheel params={this.params}/>
//       </div>
//     );
//   }
// }