import * as React from 'react';
import styled from 'styled-components';
import * as Markdown from 'react-markdown';
import ShaderArticle from '../models/shader-article';
import { isMobile } from '../is-mobile';

const Wrapper = styled.article`
    width: 100%;
    max-width: 720px;

    h2 {
        margin: 0 0 20px;
    }
    .canvas {
        position: relative;
        width: 100%;
        &:before {
            display: block;
            content: '';
            width: 100%;
            padding-bottom: 56.75%;
            @media (max-width: 600px) {
                padding-bottom: 100%;
            }
        }
        canvas, img {
            position: absolute;
            top:0;
            width: 100%;
            height: 100%;
        }
    }

    p {
        line-height: 1.8em;
    }
`;

interface IArticleProps {
    article: ShaderArticle;
}

export default class Article extends React.Component<IArticleProps, {}> {
    private analyser: AnalyserNode;
    private source: AudioBufferSourceNode;

    render() {
        const { article } = this.props;
        return (
            <Wrapper>
                <h2>{article.title}</h2>
                <Markdown source={this.props.article.body}/>
            </Wrapper>
        );
    }
}
