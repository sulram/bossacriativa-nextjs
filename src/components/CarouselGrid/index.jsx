/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import theme from '@/theme';
import {
  Wrapper, Indicator, Slide, Item,
} from './styles';

export default function CarouselGrid({
  autoplay, source, reverse, h,
}) {
  const slideScroll = useRef();
  const [settings, setSettings] = useState({
    autoplay: false, slides: [[]], selected: 0, oldSelected: 0,
  });

  useEffect(() => {
    const slides = [];
    for (let i = 0; i < source.length / 5; i += 1) slides.push(source.slice(i * 5, (i + 1) * 5));
    setSettings({ ...settings, autoplay, slides });
  }, []);

  useEffect(() => {
    if (!settings.autoplay) return () => null;
    const timer = setInterval(() => {
      const sizeOfSlides = window.innerWidth > theme.sizes.tablet
        ? settings.slides.length - 1 : settings.slides[0].length - 1;
      const pos = settings.selected === sizeOfSlides ? 0 : settings.selected + 1;
      setSettings({ ...settings, oldSelected: settings.selected, selected: pos });
    }, 7000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (settings.selected !== 0) {
      slideScroll.current.scrollTo(0, 0);
      setSettings({ ...settings, oldSelected: 0, selected: 0 });
    }
  }, [slideScroll.current && slideScroll.current.offsetWidth]);

  useEffect(() => {
    const size = slideScroll.current.offsetWidth;
    const scrollX = size * (settings.selected - settings.oldSelected);
    slideScroll.current.scrollBy(scrollX, 0);
  }, [settings.selected]);

  function goPosition(index) {
    setSettings({ ...settings, oldSelected: settings.selected, selected: index });
  }

  function navigate(link) {
    window.location.replace(link);
  }

  return (
    <Wrapper
      h={h}
      onMouseOver={() => setSettings({ ...settings, autoplay: false })}
      onMouseLeave={() => setSettings({ ...settings, autoplay: true })}
    >
      <div className="indicators">
        {
          settings.slides.map((item, index) => (
            <Indicator
              type="button"
              key={index}
              selected={settings.selected === index}
              onClick={() => goPosition(index)}
            />
          ))
        }
        {
          settings.slides[0].map((item, index) => (
            <Indicator
              type="button"
              key={index}
              mobile
              selected={settings.selected === index}
              onClick={() => goPosition(index)}
            />
          ))
        }
      </div>
      <div className="scroll" ref={slideScroll}>
        {
          settings.slides.map((slide, index) => (
            <Slide key={index} reverse={reverse}>
              {
                slide.map((item, area) => (
                  <Item
                    key={area}
                    area={`a${area + 1}`}
                    photo={item.photo}
                    onClick={() => navigate(item.link)}
                  >
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                  </Item>
                ))
              }
            </Slide>
          ))
        }
        {
          settings.slides[0].map((item, index) => (
            <Slide key={index} mobile>
              <Item
                area="a1"
                photo={item.photo}
                onClick={() => navigate(item.link)}
              >
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </Item>
            </Slide>
          ))
        }
      </div>
    </Wrapper>
  );
}

CarouselGrid.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
  })),
  reverse: PropTypes.bool,
  autoplay: PropTypes.bool,
  h: PropTypes.number,
};

CarouselGrid.defaultProps = {
  source: [],
  reverse: false,
  autoplay: true,
  h: 412,
};
