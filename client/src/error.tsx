import Link from "next/link";
import Noty from "noty";
import React, { Component } from "react";

export default class ErrorHandler extends Component {
    componentDidCatch(error, info) {
        console.log(error);
        console.log(info)
        new Noty({
            type: "error",
            theme: 'mint',
            text: 'Some notification text'
        }).show();
    }

    static getDerivedStateFromError(error) {
        console.log(error)
    }

    render() {
        return (
            <>{ this.props.children }</>
        );
    }
}
