import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {unsetNextUrl} from 'universal/redux/authDuck';
import {getAuthedOptions, getAuthQueryString} from "../../redux/getAuthedUser";
import {cashay} from "cashay";

const mapStateToProps = (state) => {
  const {auth} = state;
  return {
    auth,
    // query required because we need a query before a mutation
    user: cashay.query(getAuthQueryString, getAuthedOptions(auth.obj.sub)).data.user

  };
};

const handleAuthChange = (props) => {
  const {auth, dispatch, history} = props;

  if (auth.obj.sub) {
    // note if you join a team & leave it, tms will be an empty array
    const isNew = !auth.obj.hasOwnProperty('tms');
    if (isNew) {
      history.push('/welcome');
    } else if (auth.nextUrl) {
      history.push(auth.nextUrl);
      dispatch(unsetNextUrl());
    } else {
      history.push('/me');
    }
  }
};

export default (ComposedComponent) => {
  @connect(mapStateToProps)
  @withRouter
  class LoginWithToken extends Component {
    static propTypes = {
      auth: PropTypes.object,
      dispatch: PropTypes.func,
      history: PropTypes.object.isRequired
    };

    componentWillMount() {
      handleAuthChange(this.props);
    }
    componentWillReceiveProps(nextProps) {
      const {auth: {obj: {sub: prevSub}}} = this.props;
      const {auth: {obj: {sub: nextSub}}} = nextProps;
      if (prevSub !== nextSub) {
        handleAuthChange(nextProps);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return LoginWithToken;
};
