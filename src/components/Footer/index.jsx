import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Container } from './styles';

export default function Footer() {
  const sponsors = [
    { image: require('@/images/footer-ufrj.svg'), url: '/' },
    { image: require('@/images/footer-emufrj.svg'), url: '/' },
    { image: require('@/images/footer-fujb.svg'), url: '/' },
    { image: require('@/images/footer-funarte.svg'), url: '/' },
    { image: require('@/images/footer-secult.svg'), url: '/' },
    { image: require('@/images/footer-brasil.svg'), url: '/' },
  ];

  return (
    <Container>
      <div />
      <div>
        <div>
          <h4>Realização</h4>
          <ul>
            {
              sponsors.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>
                    <a href="/#">
                      <Image
                        src={item.image}
                        width="180px"
                        height="80px"
                      />
                    </a>
                  </Link>
                </li>
              ))
            }
            <li />
          </ul>
        </div>
      </div>
    </Container>
  );
}
