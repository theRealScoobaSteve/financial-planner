import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from 'react';
import { wrapper } from "../redux/base-store.store";
import App, { AppInitialProps, AppContext } from 'next/app';

class MyApp extends App<AppInitialProps> {

    public static getInitialProps = async ({Component, ctx}: AppContext) => {

        ctx.store.dispatch({type: 'TOE', payload: 'was set in _app'});

        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                // Some custom thing for all pages
                pathname: ctx.pathname,
            },
        };

    };

    public render() {
        const {Component, pageProps} = this.props;

        return (
            <Component {...pageProps} />
        );
    }
}

export default wrapper.withRedux(MyApp);
