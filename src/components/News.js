import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    console.log('hello I am a constructor from news component');
    this.state={
      articles:[],
      page:1,

      loading:false,
    }
  }

  async componentDidMount(){
    console.log('cdn');
    let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles, 
      totalResults:parsedData.totalResults
    });
  }
  handlePrevClick = async ()=>{
    console.log('clicked prev');
    
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page : this.page - 1,
      articles:parsedData.articles  
    })
  
}
  handleNextClick = async ()=>{
    console.log('clicked next');
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page : this.page + 1,
      articles:parsedData.articles  
    })
  }
  }
  render() {
    console.log('render');
    return (
      <div className='container my-3'>
          <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
          <div className="row my-3">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:"unknown"} description={element.description?element.description:'description'} imageUrl={element.urlToImage}
            newsUrl={element.url}/>
            </div>
          })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

          </div>
    </div>
    )
  }
}

export default News