import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./Spinner";

interface Props {
    component: any,
    auth: any
}

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading }
}: Props) => {
    if (loading) return <Spinner />;
    if (isAuthenticated) return <Component />;

    return <Navigate to={'/auth/signin'} />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
