import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    console.log('hello I am a constructor from news component');
    this.state={
      articles:[],
      loading:false,
    }
  }

  async componentDidMount(){
    console.log('cdn');
    let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=4502b5e1b10b488f99a4abc72f717a0b";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles});
  }

  render() {
    console.log('render');
    return (
      <div className='container my-3'>
          <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
          <div className="row my-3">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,60):"unknown"} description={element.description?element.description.slice(0,100):'description'} imageUrl={element.urlToImage}
            newsUrl={element.url}/>
            </div>
          })}
              
              
          </div>
    
    </div>
    )
  }
}

export default News