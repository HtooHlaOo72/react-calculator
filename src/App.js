import React from 'react';
import Button from './components/Button';
import './css/style.css';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      current:'0',
      previous:[],
      isResetNext:false,
    }
  }
  reset=()=>{
    console.log("reset.......")
    this.setState(
      {current:0,previous:[],isResetNext:true}
    );
  }
  addToCurrent=(symbol)=>{
    //console.log(symbol);
    if(['+','-','*','/'].indexOf(symbol)>-1){
      let {previous}=this.state;
      previous.push(this.state.current+symbol);
      this.setState({current:'0',previous,isResetNext:false});
      
    }
    else{
      if((this.state.current==='0'&&symbol!=='.')||(this.state.isResetNext)){
        this.setState({current:symbol,isResetNext:false});
      }
      else{
        this.setState(
          {current:this.state.current+symbol}
        );
      }
      
    }
    
  }
  remove=(symbol)=>{
    
    if(this.state.current!=="0" && this.state.current.length>1){
      let temp=this.state.current;
      let current=temp.slice(0,-1);
      temp=null;
      console.log(current);
      this.setState({current});
      console.log(`in remove upper and length of current is ${current.length}`);

    }
    else if(this.state.current.length===1){
      this.setState({current:'0'});
      console.log("length 1 and remove ...");

    }
    console.log("inremove...",this.state.current.length , this.state.current);
  }
  display=(symbol)=>{
    let {previous}=this.state;
    previous.push(this.state.current);
    //let result=Math.parse(temp);
    let temp=previous.reduce((now,next)=>{
      return now+next;
    },'');
    temp=String(eval(temp));
    this.state.previous.push(temp);
    this.setState({current:temp,previous:[],isResetNext:true});
    console.log(this.state.current);
  }
  render(){
    const buttons=[
      {symbol:'C',cols:3,action:this.reset},
      {symbol:'<<',cols:1,action:this.remove},
      {symbol:'/',cols:1,action:this.addToCurrent},
      {symbol:'7',cols:1,action:this.addToCurrent},
      {symbol:'8',cols:1,action:this.addToCurrent},
      {symbol:'9',cols:1,action:this.addToCurrent},
      {symbol:'*',cols:1,action:this.addToCurrent},
      {symbol:'4',cols:1,action:this.addToCurrent},
      {symbol:'5',cols:1,action:this.addToCurrent},
      {symbol:'6',cols:1,action:this.addToCurrent},
      {symbol:'-',cols:1,action:this.addToCurrent},
      {symbol:'1',cols:1,action:this.addToCurrent},
      {symbol:'2',cols:1,action:this.addToCurrent},
      {symbol:'3',cols:1,action:this.addToCurrent},
      {symbol:'+',cols:1,action:this.addToCurrent},
      {symbol:'=',cols:1,action:this.display},
      {symbol:'0',cols:1,action:this.addToCurrent},
      {symbol:'.',cols:1,action:this.addToCurrent},
    ]
    return (
      <div>
        
        
        <input className='result' type="text" placeholder={this.state.current}></input>
        {
          (this.state.previous.length>0)?
          <div className="floaty-last">{this.state.previous[this.state.previous.length-1]}</div>
          :<div className="floaty-last">0</div>
        }
        {
          buttons.map((btn,i)=>{
            return (
              <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol)=>btn.action(symbol)}/>
            );
          })
        }
      </div>
    );
  }
}

export default App;