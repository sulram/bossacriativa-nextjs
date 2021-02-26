import styled from 'styled-components';

export const Card = styled.article`
  position: relative;
  border-radius: 2px;
  min-height: 200px;
  height: ${({ h }) => (h > 0 ? `${h}px` : '100%')};
  width: ${({ w }) => (w > 0 ? `${w}px` : '100%')};
  cursor: pointer;

  figure {
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 591.44px / 1127.34px * 100%;
  }

  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  h1 {
    font-size: 1.5em;
    background-color: rgba(2, 2, 2, .6);
    color: #fff;
    padding: 5px 10px;
    text-align: center;
    margin: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    z-index: 1;
  }

  div {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 10px;
    transition: opacity .3s linear;
    opacity: 0;
    background-color: rgba(2, 2, 2, .8);
    z-index: 997;
    overflow: hidden;
  }

  :hover > div {
    opacity: 1;
  }

  p {
    color: #fff;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
`;
