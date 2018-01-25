import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/article/list';
import { success } from '../../actions/article/delete';
import { itemToLinks } from '../../utils/helpers';

class List extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.list(this.props.match.params.page && decodeURIComponent(this.props.match.params.page));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) nextProps.list(nextProps.match.params.page && decodeURIComponent(nextProps.match.params.page));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return <div>
      <header className="masthead" style={{backgroundImage: "url('img/home-bg.jpg')"}}>
          <div className="overlay"></div>
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-md-10 mx-auto">
                      <div className="site-heading">
                          <h1>My Blog</h1>
                          <span className="subheading">A blog just for you &lt;3</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>

      {this.props.loading && <div className="alert alert-info">Loading...</div>}
      {this.props.deletedItem && <div className="alert alert-success">{this.props.deletedItem['@id']} deleted.</div>}
      {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}


        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                        {this.props.data['hydra:member'] && this.props.data['hydra:member'].map(item =>
                            <div className="post-preview" key={item['@id']}>
                                <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                                  <h2 className="post-title">
                                      {item['name'] ? itemToLinks(item['name']) : ''}
                                  </h2>
                                  <h3 className="post-subtitle">
                                      {item['description'] ? itemToLinks(item['description']) : ''}
                                  </h3>
                                </Link>
                                <p className="post-meta">Posted by <a href="#">Greg</a> Today</p>
                                <hr/>
                            </div>
                        )}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 offset-3">
                    {this.pagination()}
                </div>
            </div>
        </div>
    </div>;
  }

  pagination() {
    const view = this.props.data['hydra:view'];
    if (!view) return;

    const {'hydra:first': first, 'hydra:previous': previous,'hydra:next': next, 'hydra:last': last} = view;

    return <nav aria-label="Page navigation">
        <Link to='.' className={`btn btn-default${previous ? '' : ' disabled'}`}><span aria-hidden="true">&lArr;</span> First</Link>
        <Link to={!previous || previous === first ? '.' : encodeURIComponent(previous)} className={`btn btn-default${previous ? '' : ' disabled'}`}><span aria-hidden="true">&larr;</span> Previous</Link>
        <Link to={next ? encodeURIComponent(next) : '#'} className={`btn btn-default${next ? '' : ' disabled'}`}>Next <span aria-hidden="true">&rarr;</span></Link>
        <Link to={last ? encodeURIComponent(last) : '#'} className={`btn btn-default${next ? '' : ' disabled'}`}>Last <span aria-hidden="true">&rArr;</span></Link>
    </nav>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.article.list.data,
    error: state.article.list.error,
    loading: state.article.list.loading,
    deletedItem: state.article.del.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    list: (page) => dispatch(list(page)),
    reset: () => {
      dispatch(reset());
      dispatch(success(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
