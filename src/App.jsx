import React, { Component } from 'react';
import axios from 'axios';

// Add conditions 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotation: {
        quote: 'Your quotation will be here',
        author: 'It\'s author, here'
      },
      image: ''
    }
    this.getQuote = this.getQuote.bind(this);
    this.getImage = this.getImage.bind(this);
    this.changeQuote = this.changeQuote.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  changeQuote(quote, author) {
    let quotation = {
      quote: quote,
      author: author
    }
    this.setState({
      quotation: quotation
    });
  }

  changeImage(image) {
    this.setState({ image: image });
  }

  getQuote(e) {
    e.preventDefault();
    axios.get('/quote')
      .then((response) => {
        if (response.data[0]) {
          this.changeQuote(response.data[0].quote, response.data[0].author);
        }
      })
      .catch((err) => {
        console.log('Error', err, 'has occurred');
      })
  }

  getImage(e) {
    e.preventDefault();
    let author = this.state.quotation.author;
    axios.get('/image', {
      params: {
        author: author
      }
    })
      .then((response) => {
        if (response.data) {
          console.log(response.data.value[0].url)
          this.changeImage(response.data.value[0].url);
        }
      })
      .catch((err) => {
        console.log('Error', err, 'has occurred');
      })
  }

  render() {
    return (
      <div className='container'>
        <h1 className='h1' style={{ color: 'white' }}>Hackathon</h1>
        <p style={{ color: 'white' }}>Get a Famous Quote and an image of the person</p><hr />
        <div className='row'>
          <div className='col-md-6'>
            <div className='card px-2' style={{ top: '50%' }}>
              <img className='card-img-top' src={this.state.image} style={{ maxHeight: '300px', maxWidth: '300px' }} />
              <div className='card-body'>
                <h5 className='card-title'></h5>
                <p className='card-text'>{this.state.quotation.quote}</p>
                <p className='card-text'>{this.state.quotation.author}</p>
              </div>
              <div className='card-footer'>
                <button className='btn btn-primary btn-block' onClick={this.getQuote}>Get Quote</button><br />
                <button className='btn btn-secondary btn-block' onClick={this.getImage}>Get Image</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
