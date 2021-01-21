import React from 'react';
import Page from '@/components/Page';
import Breadcrumb from '@/components/Breadcrumb';
import Info from '@/components/Info';
import Section from '@/components/Section';
import Fluid from '@/components/Fluid';
import FlatList from '@/components/FlatList';
import CardText from '@/components/CardText';
import CardIcon from '@/components/CardIcon';
import { BsNewspaper } from 'react-icons/bs';
import CardHorizontal from '@/components/CardHorizontal';

export default function Press({ menus }) {
  const contacts = [
    { title: 'Funarte - Assessoria de Comunicação:', text: 'ascomfunarte@funarte.gov.br' },
    { title: 'Contato de Assessoria de Imprensa:', text: 'imprensa@musica.ufrj.br' },
  ];

  return (
    <Page menus={menus}>
      <Breadcrumb />
      <Info title="Imprensa" />
      <Fluid>
        <Section title="Clipping">
          <FlatList
            cols={3}
            source={[]}
            renderItem={(item) => (
              <CardHorizontal
                image={item.image}
                title={item.title}
                text={item.text}
              />
            )}
          />
        </Section>
        <Section title="Releases">
          <FlatList
            source={[]}
            renderItem={(item) => (
              <CardIcon
                icon={<BsNewspaper />}
                text={item.text}
              />
            )}
          />
        </Section>
        <Section title="Contatos">
          <FlatList
            source={contacts}
            renderItem={(item) => (
              <CardText
                gap="20px"
                title={item.title}
                text={item.text}
              />
            )}
          />
        </Section>
      </Fluid>
    </Page>
  );
}