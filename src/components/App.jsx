import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImages  from 'services/pixabayAPI';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

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


  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, currentPage: 1 });

  };

  handleFetch = (prevPage, prevSearchQuery) => {
    const { currentPage, searchQuery } = this.state;

    getImages(searchQuery, currentPage).then(images => {
      if (images.hits.length === 0) {
        toast.info('There is no such images');
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
    .catch(response => {
        console.log(response);
      })
    .finally(() => this.setState({ loading: false }));;
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
    document.body.style.overflow = this.state.isModalOpen ? 'auto' : 'hidden';
  };

  incrementPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  showLargeImage = clickedImage => {
    this.toggleModal();
    this.setState({
      modalImage: clickedImage,
    });
  };

  render() {
    const {
      searchQuery,
      queryResult,
      loading,
      isModalOpen,
      modalImage,
      totalQueryResult,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {queryResult && (
          <ImageGallery images={queryResult} openModal={this.showLargeImage} />
        )}
        {isModalOpen && (
          <Modal
            largeImageURL={modalImage}
            onClose={this.toggleModal}
            description={searchQuery}
          />
        )}
        {loading && <Loader />}
        {queryResult.length > 11 &&
          queryResult.length !== totalQueryResult &&
          !loading && <Button onClick={this.incrementPage} />}
      </>
    );
  }
}