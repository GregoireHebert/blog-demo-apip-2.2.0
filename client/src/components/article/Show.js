import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {retrieve, reset} from '../../actions/article/show';
import { del, loading, error } from '../../actions/article/delete';

class Show extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleted: PropTypes.object,
    del: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
    // this.props.retrieve(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?')) this.props.del(this.props.retrieved);
  };

  render() {
    if (this.props.deleted) return <Redirect to=".."/>;

    const item = this.props.retrieved;

    return (<div>

      {this.props.loading && <div className="alert alert-info" role="status">Loading...</div>}
      {this.props.error && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.error}</div>}
      {this.props.deleteError && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.deleteError}</div>}

      {item &&
        <header className="masthead" style={{backgroundImage: "url('/img/post-bg.jpg')"}}>
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="post-heading">
                            <h1>{item['name']}</h1>
                            <h2 className="subheading">{item['description']}</h2>
                            <span className="meta">Posted by <a href="#">greg</a> Today</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        }

        {item &&<article>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto" dangerouslySetInnerHTML={{__html: item['articleBody']}}>
                    </div>
                </div>
            </div>
        </article>
        }
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.article.show.error,
    loading: state.article.show.loading,
    retrieved:state.article.show.retrieved,
    deleteError: state.article.del.error,
    deleteLoading: state.article.del.loading,
    deleted: state.article.del.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    del: item => dispatch(del(item)),
    reset: () => {
      dispatch(reset());
      dispatch(error(null));
      dispatch(loading(false));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
