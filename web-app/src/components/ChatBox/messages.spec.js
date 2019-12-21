// jest.mock('../../data/services/api', () => ({
//   fetchMessages: jest.fn(),
// }));

// Est-ce que le composant reçoit bien la liste des messages et l'affiche? oui
// test si la valeur par défaut du state messages est correcte, si messages est vide [] avant le fetch et que rien ne s'affiche dans le composant oui
// test si messages est rempli après le fetch et que le composant affiche bien un résultat oui

// test le cas si le composant est rendu sans crash
// test si quand je clique sur le bouton envoyer il y a bien mon nouveau message qui s'ajoute à la liste
// test si mon contentValue a bien la bonne valeur par défault
// test si je saisi un caractère la valeur du state contentValue change bien
// Est-ce que l'affichage se fait bien ou non en fonction de isUsernameAndHourNeedToBeDisplayeds ?

import React from 'react';
import * as apiServices from '../../data/services/api';
// import { fetchMessages } from '../../data/services/api';
import Messages from './Messages';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

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

const addMessageToList = [
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
  {
    id: 3,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:17:09.881995',
    username: 'Prudence',
  },
];

apiServices.fetchMessages = jest.fn();

describe('Messages', () => {
  // apiServices.fetchMessages = jest.fn();
  // apiServices.fetchMessages = jest
  //   .fn()
  //   .mockImplementation(() => Promise.resolve(messagesList))
  //   .mockImplementation(() => Promise.resolve(addMessageToList));

  // apiServices.fetchMessages = jest
  //   .fn()
  //   .mockReturnValueOnce(Promise.resolve(messagesList));

  // const myMockFn = jest
  //   .fn()
  //   .mockImplementationOnce(() => Promise.resolve(messagesList))
  //   .mockImplementationOnce(() => 'second call');

  describe('before messages are fetched', () => {
    let wrapper = shallow(<Messages match={{ params: { id: 1 } }} />);
    it('renders empty messages list', () => {
      expect(wrapper.find('.container__message')).toHaveLength(0);
    });
  });

  describe('after messages are fetched', () => {
    // beforeEach(() => {
    //   apiServices.fetchMessages = jest.fn(() => {
    //     Promise.resolve(messagesList);
    //   });
    // });
    // apiServices.fetchMessages;
    apiServices.fetchMessages.mockImplementationOnce(() =>
      Promise.resolve(messagesList)
    );
    // .mockImplementationOnce(() => Promise.resolve(messagesList));

    it('renders messages list', () => {
      act(() => {
        let wrapper = mount(<Messages match={{ params: { id: 1 } }} />);
        setImmediate(() => {
          wrapper.update();
          expect(apiServices.fetchMessages).toHaveBeenCalled();
          expect(wrapper.find('.container__message')).toHaveLength(
            messagesList.length
          );
        });
      });
    });
  });

  describe('when user send a message by clicking on submit button', () => {
    // beforeEach(() => {
    //   apiServices.fetchMessages = jest.fn(() => {
    //     Promise.resolve(addMessageToList);
    //   });
    // });
    // apiServices.fetchMessages = jest.fn(() =>
    //   Promise.resolve(addMessageToList)
    // );
    // apiServices.fetchMessages = second;
    // apiServices.fetchMessages;

    apiServices.fetchMessages.mockImplementationOnce(() =>
      Promise.resolve(addMessageToList)
    );

    it('renders a new item in the messages list', () => {
      act(() => {
        let wrapper = mount(<Messages match={{ params: { id: 1 } }} />);
        // const button = wrapper.find('.button__chat__sendbox');
        // await button.simulate('click');
        setImmediate(() => {
          wrapper.update();
          expect(apiServices.fetchMessages).toHaveBeenCalled();

          expect(wrapper.find('.container__message')).toHaveLength(
            messagesList.length + 1
          );
        });
      });
    });
  });
});
