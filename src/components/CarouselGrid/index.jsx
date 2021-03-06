/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import theme from '@/theme';
import {
  Wrapper, Indicator, IndicatorItem, Slide, Item,
} from './styles';

const blockSpin = false;
const mudaPaginaTimer = 7000;
const transicaoTimer = 800;

export default function CarouselGrid({
  autoplay, source, reverse, renderItem,
}) {
  const slideScroll = useRef();
  const [settings, setSettings] = useState({
    autoplay: false, slides: [[]], selected: 0, oldSelected: 0,
  });

  const cortina = ({ altura, topo, piso }) => {
    slideScroll.current.querySelectorAll('.cobertura')
      .forEach((item) => {
        item.style.bottom = piso;
        item.style.height = altura;
        item.style.top = topo;
        item.style.transitionDelay = `${Math.random() / 2}s`;
      });
  };

  const cortinaClose = () => {
    cortina({
      altura: '100%',
      topo: 'auto',
      piso: '0%',
    });
  };

  const cortinaOpen = () => {
    cortina({
      altura: '0px',
      topo: '0px',
      piso: 'auto',
    });
  };

  // monta strutura de dados slides
  useEffect(() => {
    const slides = [];
    const slidesPerPage = (window.innerWidth > theme.sizes.laptop) ? 5 : 1;
    // limita a 5 slides no mobile
    const maxSlides = (window.innerWidth > theme.sizes.laptop) ? source.length / slidesPerPage : 5;
    if (source.length === 0) {
      setSettings({ ...settings, autoplay });
    } else {
      for (let i = 0; i < maxSlides; i += 1) {
        slides.push(source.slice(i * slidesPerPage, (i + 1) * slidesPerPage));
      }
      setSettings({ ...settings, autoplay, slides });
    }
  }, []);

  // executa seleção (rotação) automática
  useEffect(() => {
    if (!settings.autoplay || blockSpin) return null;
    const timer = setInterval(() => {
      let mudando = null;
      cortinaClose();
      mudando = setTimeout(() => {
        const sizeOfSlides = settings.slides.length - 1;
        const pos = settings.selected === sizeOfSlides ? 0 : settings.selected + 1;
        setSettings({ ...settings, oldSelected: settings.selected, selected: pos });
        cortinaOpen();
      }, transicaoTimer);
      return () => clearTimeout(mudando);
    }, mudaPaginaTimer);
    return () => clearInterval(timer);
  });

  // decide voltar se o selecionado não é zero e chegou ao final
  useEffect(() => {
    if (settings.selected !== 0) {
      slideScroll.current.scrollTo(0, 0);
      setSettings({ ...settings, oldSelected: 0, selected: 0 });
    }
  }, [slideScroll.current && slideScroll.current.offsetWidth]);

  // rotação com base no atributo selected do settings
  useEffect(() => {
    const size = slideScroll.current.offsetWidth;
    const scrollX = size * (settings.selected - settings.oldSelected);
    slideScroll.current.scrollBy(scrollX, 0);
  }, [settings.selected]);

  function goPosition(index) {
    cortinaClose();
    let mudando = null;
    mudando = setTimeout(() => {
      if (window.innerWidth > theme.sizes.laptop) {
        setSettings({ ...settings, oldSelected: settings.selected, selected: index });
      } else {
        setSettings({
          ...settings, oldSelected: settings.selected, selected: index, autoplay: true,
        });
      }
      cortinaOpen();
    }, transicaoTimer);
    return () => clearTimeout(mudando);
  }

  return (
    <Wrapper
      onMouseOver={() => setSettings({ ...settings, autoplay: false })}
      onMouseLeave={() => setSettings({ ...settings, autoplay: true })}
    >
      <Indicator reverse={reverse}>
        {
          settings.slides.map((item, index) => (
            <IndicatorItem
              type="button"
              key={index}
              selected={settings.selected === index}
              onClick={() => goPosition(index)}
            />
          ))
        }
      </Indicator>
      <div className="scroll" ref={slideScroll}>
        {
          settings.slides[0].length > 0 && settings.slides.map((slide, index) => (
            <Slide key={index} reverse={reverse}>
              {
                slide.map((item, area) => (
                  <Item key={area} area={`a${area + 1}`}>
                    { renderItem(item) }
                    <div className="cobertura" />
                  </Item>
                ))
              }
            </Slide>
          ))
        }
        {
          settings.slides[0].length === 0 && settings.slides[0].map((item, index) => (
            <Slide key={index} mobile>
              <Item area="a1">
                { renderItem(item) }
                <div className="cobertura" />
              </Item>
            </Slide>
          ))
        }
      </div>
    </Wrapper>
  );
}

CarouselGrid.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape()),
  renderItem: PropTypes.func,
  reverse: PropTypes.bool,
  autoplay: PropTypes.bool,
  // h: PropTypes.number,
};

CarouselGrid.defaultProps = {
  source: [],
  renderItem: null,
  reverse: false,
  autoplay: true,
  // h: 412,
};
