import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { throttle } from 'lodash';
import Link from '../components/link';

const ThumbnailLink = styled(Link)`
    display: block;
    position: relative;
    background: #000;

    width: 100%;
    height: 100%;

    img {
        pointer-events: none;
        width: 100%;
    }
    canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
` as any;

interface IThumbnailProps {
    type: string;
    article: any;
}

export default class Thumbnail extends React.Component<IThumbnailProps, {}> {
    static contextTypes = {
        history: PropTypes.any,
    };

    onClick = (e, to) => {
        e.preventDefault();
        e.stopPropagation();
        this.context.history.push(to);
    }

    render() {
    console.log(this.props.article.title)
        return (
            <ThumbnailLink className="thumbnail"
                to={`?${this.props.type}=${this.props.article.title}`}>
                hello
                <img src={this.props.article.thumbnail}/>
            </ThumbnailLink>
        );
    }
}
