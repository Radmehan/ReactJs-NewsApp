import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title , description,imageUrl,newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl?imageUrl:"https://englishtribuneimages.blob.core.windows.net/gallary-content/2022/3/2022_3$largeimg_1025308223.JPG"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read more..</a>
            </div>
            </div>
    </div>
    )
  }
}

export default NewsItem