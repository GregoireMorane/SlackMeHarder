// Est-ce que le composant reçoit bien la liste des messages et l'affiche?
// test le cas si le composant est rendu sans crash
// test si la valeur par défaut du state messages est correcte, si messages est vide [] avant le fetch et que rien ne s'affiche dans le composant
// test si messages est rempli après le fetch et que le composant affiche bien un résultat
// test si quand je clique sur le bouton envoyer il y a bien mon nouveau message qui s'ajoute à la liste
// test si mon contentValue a bien la bonne valeur par défault
// test si je saisi un caractère la valeur du state contentValue change bien

// Est-ce que l'affichage se fait bien ou non en fonction de isUsernameAndHourNeedToBeDisplayeds ?
import React from 'react';
import Messages from './Messages';
import { shallow } from 'enzyme';
import { useMessages } from './services';

import * as apiServices from '../../data/services/api';

const HookWrapper = (props) => {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook} />;
}

describe('Message', () => {
  // let wrapper = shallow(<HookWrapper hook={() => useMessages(1)} />);
  let wrapper = shallow(
    <Messages match={{params: {id: 1}}}/>
  );


  describe('before messages are fetched', () => {

    it('renders empty messages list', () => {
      expect(wrapper.contains(<div className='container__message'></div>)).toBe(false)
    });
  });

  describe('after messages are fetched', () => {
    const messagesList = [
      {
        id: 0,
        content: 'test message writed by a user at a certain hour',
        updated_at: '2019-12-10 10:10:09.881995',
        username: 'Prudence',
      },
      {
        id: 1,
        content: 'test message writed by a user at a certain hour',
        updated_at: '2019-12-10 10:15:09.881995',
        username: 'Prudence',
      },
      {
        id: 2,
        content: 'test message writed by a user at a certain hour',
        updated_at: '2019-12-10 10:17:09.881995',
        username: 'Prudence',
      },
    ];

    apiServices.fetchMessages = jest.fn(() => Promise.resolve(messagesList));

    it('renders messages list', () => {
      setImmediate(() => {
        expect(wrapper.contains(<div className='container__message'></div>)).toBe(true)
      });
    });
  });
});
