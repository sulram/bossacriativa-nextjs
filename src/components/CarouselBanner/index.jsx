/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Wrapper, Slide, Item, Dots,
} from './styles';

export default function CarouselBanner({
  autoplay, source, height, width,
}) {
  const carousel = useRef();
  const [settings, setSettings] = useState({
    autoplay: false, slides: [], selected: 0, prevSelected: 0,
  });
  const [dots, setDots] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setSettings({ ...settings, autoplay, slides: source });
  }, []);

  useEffect(() => {
    if (!settings.autoplay) return () => null;
    const timer = setInterval(() => {
      const prev = settings.selected;
      const pos = settings.selected === settings.slides.length - 1 ? 0 : settings.selected + 1;
      setSettings({ ...settings, selected: pos, prevSelected: prev });
    }, 5000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    const size = carousel.current.offsetWidth;
    if (settings.autoplay) {
      if (settings.selected === 0) carousel.current.scrollBy(-(size * settings.slides.length), 0);
      else carousel.current.scrollBy(size, 0);
    } else if (settings.prevSelected > settings.selected) carousel.current.scrollBy(-(size * (settings.prevSelected - settings.selected)), 0);
    else if (settings.prevSelected === settings.selected) return () => null;
    else carousel.current.scrollBy(size * (settings.selected - settings.prevSelected), 0);
  }, [settings.selected, settings.autoplay]);

  useEffect(() => {
    const dotsList = [];
    for (let x = 0; x <= settings.slides.length - 1; x += 1) {
      dotsList.push(
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          onClick={() => {
            const prev = settings.selected;
            setSettings({
              ...settings, selected: x, prevSelected: prev, autoplay: false,
            });
          }}
          key={x}
          style={
          settings.selected === x ? { backgroundColor: '#E4BE2Bcc' } : { backgroundColor: '#585858' }
        }
        />,
      );
    }
    setDots(dotsList);
  }, [settings.slides, settings.selected]);

  return (
    <>
      <Wrapper
        height={height}
        width={width}
        onMouseOver={() => setSettings({ ...settings, autoplay: false })}
        onMouseLeave={() => setSettings({ ...settings, autoplay: true })}
      >
        <div className="scroll" ref={carousel}>
          {
            settings.slides.map((slide, index) => (
              <Slide key={index}>
                <Item
                  key={slide.id}
                  photo={slide.featuredImage?.node?.mediaItemUrl}
                  photoMobile={slide.acf_chamada_slider.imegemMobile?.mediaItemUrl}
                  isClicked={!!slide.acf_chamada_slider.urlbanner}
                  onClick={() => slide.acf_chamada_slider.urlbanner && router.push(slide.acf_chamada_slider.urlbanner)}
                >
                  {(!slide.acf_chamada_slider.ocultarCamposDeTexto // condiciona exibição dos campos de texto
                    ? (
                      <div className="text-container">
                        <h1>{slide.title}</h1>
                        {(slide.excerpt // condiciona exibição do campo descrição
                          ? <p>{slide.excerpt && slide.excerpt.replace(/<\/?[^>]+(>|$)/g, '')}</p>
                          : '')}
                      </div>
                    )
                    : '')}
                </Item>
              </Slide>
            ))
          }
        </div>
        <Dots>{dots}</Dots>
      </Wrapper>
    </>

  );
}

CarouselBanner.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    featuredImage: PropTypes.shape({
      node: PropTypes.shape({
        mediaItemUrl: PropTypes.string,
      }),
    }),
    title: PropTypes.string,
    excerpt: PropTypes.string,
  })),
  autoplay: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.string,
};

CarouselBanner.defaultProps = {
  source: [{
    id: '1', featuredImage: null, title: 'banner 1', excerpt: 'absfkbjdkfb adfasdfisadfi adifiasndf asdfi',
  }, {
    id: '2', featuredImage: null, title: 'banner 2', excerpt: 'absfkbjdkfb adfasdfisadfi adifiasndf asdfi',
  }, {
    id: '3', featuredImage: null, title: 'banner 3', excerpt: 'absfkbjdkfb adfasdfisadfi adifiasndf asdfi',
  }],
  autoplay: true,
  height: 412,
  width: '100%',
};
