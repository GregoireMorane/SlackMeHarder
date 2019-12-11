import {
  isUsernameAndHourNeedToBeDisplayed,
  formatHour,
} from './displayUsernameAndHour';

describe('displayUsernameAndHour', () => {
  describe('isUsernameAndHourNeedToBeDisplayed', () => {
    const currentMessage = {
      id: 3,
      content:
        'test message writed by the same user that the previous messsage and posted in the same minute',
      updated_at: '2019-12-10 10:17:20.881995',
      username: 'Prudence',
    };
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

    describe('WHEN index is superior or equal to zero AND WHEN username propertie of the current message is equal to the username propertie of the previous message AND WHEN the posted hour of the current message is equal to the posted hour of the previous message', () => {
      const index = 2;

      it('should return false', () => {
        expect(
          isUsernameAndHourNeedToBeDisplayed(
            index,
            currentMessage,
            messagesList
          )
        ).toEqual(false);
      });
    });
    describe("WHEN index isn't superior or equal to zero OR WHEN username propertie of current message isn't equal to username propertie of previous message OR WHEN current message posted hour isn't equal to previous message posted hour", () => {
      const index = 1;
      it('should return true', () => {
        expect(
          isUsernameAndHourNeedToBeDisplayed(
            index,
            currentMessage,
            messagesList
          )
        ).toEqual(true);
      });
    });
    describe('when index < 0', () => {
      const index = -1;
      it('should return true', () => {
        expect(
          isUsernameAndHourNeedToBeDisplayed(
            index,
            currentMessage,
            messagesList
          )
        ).toEqual(true);
      });
    });
  });
  describe('formatHour', () => {
    const date = '2019-12-10 10:30:20.881995';
    it('renders a string formatted equal to 10:30', () => {
      expect(formatHour(date)).toEqual('10:30');
    });
  });
});
