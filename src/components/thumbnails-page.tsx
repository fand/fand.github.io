import { WSAENOMORE } from 'constants';
import * as React from 'react';
import styled from 'styled-components';
import Thumbnail from './thumbnail';
import ShaderArticle from '../models/shader-article';
import { throttle, range } from 'lodash';

const Thumbnails = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    position: relative;
    margin-top: -5px;
`;
const ThumbnailsHeader = styled.div`
    display: block;
    flex: 100%;
    margin: 1%;
`;
const ThumbnailWrapper = styled.div`
    position: relative;
    flex: 1 0 210px;
    min-width: 150px;
    margin: 1%;
    background: #000;
    &:before {
        position: absolute;
        content: '';
        width: 100%;
        padding-bottom: 100%;
    }
    @media (max-width: 600px) {
        min-width: 93%;
        margin-bottom: 10px;
    }
`;
const Dummy = (ThumbnailWrapper as any).extend`
    background: none;
    &:before {
        padding-bottom: 0;
    }
`;

interface IThumbnailsProps {
    articles: ShaderArticle[];
    category: string;
}

interface IThumbnailsState {
    activeThumbnail: number;
}

export default class App extends React.Component<IThumbnailsProps, IThumbnailsState> {
    private canvas: HTMLCanvasElement;

    constructor(props: IThumbnailsProps) {
        super(props);
        this.state = {
            activeThumbnail: null,
        };
    }

    render() {
        const articles = this.props.articles;

        return (
            <Thumbnails>
                {[this.props.category].filter(x => x).map(c =>
                    <ThumbnailsHeader key={c}><h2>Category: {c} ({articles.length})</h2></ThumbnailsHeader>
                )}
                {articles.map(a =>
                    <ThumbnailWrapper key={a.id}>
                        <Thumbnail
                            article={a}
                            type="works"
                            />
                    </ThumbnailWrapper>
                )}
            </Thumbnails>
        );
    }
}
