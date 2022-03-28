import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  constructor(props){
    super(props);
    console.log('hello I am a constructor from news component');
    this.state={
      articles:[],
      page:1,
      loading:false,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading:false
    });
  }

  async componentDidMount(){
    console.log('cdn');
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles, 
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // });
    this.updateNews();
  }


  handlePrevClick = async ()=>{
    console.log('clicked prev');
    
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);

    // this.setState({
    //   page : this.state.page - 1,
    //   articles:parsedData.articles,
    //   loading:false  
    // })
    this.setState({
      page : this.state.page -1
    });
    this.updateNews();
  
}
  handleNextClick = async ()=>{
    console.log('clicked next');
  //   if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

  //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     page : this.state.page + 1,
  //     articles:parsedData.articles,
  //     loading:false
  //   })
  // }
  this.setState({
    page : this.state.page + 1
  });
  this.updateNews();
  }

  fetchMoreData = async() => {
   
      this.setState({
        page: this.state.page + 1
      });
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4502b5e1b10b488f99a4abc72f717a0b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        articles:this.state.articles.concat(parsedData.articles), 
        totalResults:parsedData.totalResults
    });
   
  };

  render() {
    console.log('render');
    return (
      <>
          <h1 className='text-center'style={{margin:'35px 0px'}}>NewsMonkey - Top <span className='text-danger'>{this.capitalizeFirstLetter(this.props.category)}</span> Headlines</h1>
          {/* {this.state.loading && <Spinner/>} */}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length != this.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row my-3">
          {/* !this.state.loading &&  */}
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:"unknown"} description={element.description?element.description:'description'} imageUrl={element.urlToImage}
            newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
          </div>
          </div>
          
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

          </div> */}
    </>
    )
  }
}

export default News