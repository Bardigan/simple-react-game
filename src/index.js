import React from 'react';
import ReactDOM from 'react-dom';
import Perry from './components/Perry';
import './index.css';

class App extends React.Component {  
  state = {
    cactus : [{marginLeft: '650px'}],
    jump: {top: '365px'},
    clicked: false,
    lose: false,
    opacity: {opacity: '0.3'} ,
    timer: 0
  }

  componentDidMount() {
    if (!localStorage.getItem('bestScore')) {
      localStorage.setItem('bestScore', 0);
    }
     
    setInterval(() => {
      if (this.state.lose === false) {
        this.setState({timer: this.state.timer + 1});
      }
    }, 1000);

    setInterval(() => {
      if (this.state.lose === false) {
        const oldCactusList = [...this.state.cactus];
        const combined = oldCactusList.concat([{marginLeft: '650px'}]);
        this.setState({
          cactus: combined
        });
      }
    }, Math.round((Math.random() * (2500 - 1500)) + 1500));  
  
    setInterval(() => {
      const oldCactusList = [...this.state.cactus];

      const newList = oldCactusList.map(cactus => {
        if (parseInt(this.state.jump.top, 10) === 365 &&
          parseInt(cactus.marginLeft, 10) <= 100 &&
          parseInt(cactus.marginLeft, 10) >= 50
        ) {
          this.setState({lose: true});
        }

        if (parseInt(this.state.jump.top, 10) === 300 &&
          parseInt(cactus.marginLeft, 10) <= 100 &&
          parseInt(cactus.marginLeft, 10) >= 130
        ) {
          this.setState({lose: true});
        }

        if (this.state.lose === true) {
          return {marginLeft: parseInt(cactus.marginLeft, 10) + 'px'};
        }

        if (parseInt(cactus.marginLeft,10) === -100) {
          return {marginLeft: parseInt(cactus.marginLeft, 10) + 'px'};
        } else {
          return {marginLeft: parseInt(cactus.marginLeft, 10) - 50 + 'px'};
        }
      });

      this.setState({
        cactus: newList
      });
    }, 200);
  }

  makeCactus = () => {
    const listOfCactuses = [...this.state.cactus];

    return listOfCactuses.map((cactus,index) => {     
      return <div className='cactus' key={index} style={cactus}/>
    });
  }

  makeJump = () => {
    this.setState({
      jump: {top: '290px'},
      clicked: true
    });

    setTimeout(() =>{
      this.setState({
        jump: {top:'220px'}
      });
     }, 300);

     setTimeout(() =>{
      this.setState({
        jump: {top:'300px'}
      });
     }, 600);

    setTimeout(() =>{
     this.setState({
       jump: {top:'365px'}
     })
    }, 900);

    setTimeout(() =>{
      this.setState({
        clicked: false
      });
     }, 1200);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.lose === true) {
      setTimeout(() =>{
        this.setState({
          opacity: {opacity: '1'}
        });
      }, 300);
    }

    return true;
  }
  
  render() {    
    if (this.state.lose === true && localStorage.getItem('bestScore') < this.state.timer) {
      localStorage.setItem('bestScore', this.state.timer);
    }
             
    return (      
      <div className='app'>
        <div className='best-score'>Best score: {localStorage.getItem('bestScore')}</div>
        <div className='timer'>Score: {this.state.timer}</div>
        <button className='up-button' onClick={this.state.clicked===false ? this.makeJump : null}>Up</button>
        <div className='lose-message' style={{transform: this.state.lose ? 'translateY(0)' : null}}>You've lost</div>
        <Perry jump={this.state.jump} loseProp={this.state.lose} opacityProp={this.state.opacity}/>
        <div className='ground' style={this.state.lose===true ? {animationName: 'none'}: null}>          
        {this.makeCactus()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
