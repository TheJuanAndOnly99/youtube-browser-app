import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';

const KEY = 'AIzaSyAdAH5aZgO0nTQctqNO_leQzgvFDHu6YW0';
const EKEY = `${process.env.REACT_APP_YOUTUBE_API_KEY}`;

class App extends React.Component {
  state = { videos: [] };

  onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params : {
        q          : term,
        part       : 'snippet',
        type       : 'video',
        maxResults : 5,
        key        : `${KEY}`
      }
    });

    this.setState({ videos: response.data.items });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
