import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from '../../Wrapper/Wrapper';
import Spinner from '../../Spinner/Spinner';
import KartuMovie from '../../Kartu/KartuMovie/KartuMovie';
import { fetchRecommendation } from '../../../Redux/Actions/MovieListActions';

class MovieRecommendation extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { fetchRecommendation } = this.props;
    await fetchRecommendation(match.params.movieId);
    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match !== match) {
      // eslint-disable-react/no-did-update-set-state
      this.setState({
        isLoading: true,
      });
      this.componentDidMount();
    }
  }

  render() {
    const { isLoading } = this.state;
    const { movieRecommendations } = this.props;
    return (
      <Container fluid>
        <h1 className="text-danger">Movie recomendation</h1>
        <Wrapper>
          {isLoading ? (
            <Spinner />
          ) : (
            movieRecommendations
              .slice(0, 4)
              .map(datum => <KartuMovie key={datum.id} {...datum} />)
          )}
        </Wrapper>
      </Container>
    );
  }
}

MovieRecommendation.propTypes = {
  fetchRecommendation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  movieRecommendations: state.movieList.movieRecommendations,
});
export default connect(
  mapStateToProps,
  {
    fetchRecommendation,
  },
)(MovieRecommendation);