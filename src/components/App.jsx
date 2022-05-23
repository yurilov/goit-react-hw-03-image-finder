import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImages  from 'services/pixabayAPI';
import Searchbar from 'Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchQuery: '',
    queryResult: [],
    loading: false,
    currentPage: 1,
    isModalOpen: false,
    modalImage: null,
    totalQueryResult: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchQuery } = this.state;
    const prevPage = prevState.currentPage;
    const prevSearchQuery = prevState.searchQuery;

    if (prevSearchQuery !== searchQuery) {
      this.setState({ loading: true, queryResult: [] });
      this.handleFetch(prevPage, prevSearchQuery);
    }

    if (prevSearchQuery === searchQuery && prevPage !== currentPage) {
      this.setState({ loading: true });
      this.handleFetch(prevPage, prevSearchQuery);
    }
  }


  handleFormSubmit = e => {
    //
  };

  handleFetch = (prevPage, prevSearchQuery) => {
    const { currentPage, searchQuery } = this.state;

    getImages(searchQuery, currentPage).then(images => {
       if (images.hits.length === 0) {
          toast.info('There is no images with such query');
          return this.setState({
            queryResult: [],
            currentPage: 1,
          });
        }
        if (prevSearchQuery !== searchQuery) {
          this.setState({
            queryResult: images.hits,
            totalQueryResult: images.totalHits,
          });
        }
        if (prevSearchQuery === searchQuery && prevPage !== currentPage) {
          this.setState(prevState => ({
            queryResult: [...prevState.queryResult, ...images.hits],
          }));
        }
    })
  }

  render() {
    // const {
    //   searchQuery,
    //   queryResult,
    //   loading,
    //   isModalOpen,
    //   modalImage,
    //   totalQueryResult,
    // } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}/>
      </>
    );
  }
}