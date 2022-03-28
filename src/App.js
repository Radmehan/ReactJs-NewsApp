import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { Routes,
         Route,
        
         } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  // c='harry';
  state ={
    progress:0
  }

  pageSize = 5
  setProgress = (progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() { 
    return (
      // <div>Hello my first app {this.c}</div>
     
      <div>
        <NavBar/> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          {/* <Route path="/" element={<Navigate to="/"/>}/> */}
          <Route path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general"/>}/>
          <Route path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} category="business"/>}/>
          <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category="entertainment"/>}/>
          <Route path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general"/>}/>
          <Route path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health"/>}/>
          <Route path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science"/>}/>
          <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports"/>}/>
          <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology"/>}/>
        </Routes>
      </div>
    
    )
  }
}
