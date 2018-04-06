const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
   it('should generate correct message object', () => {
      var from = 'Rob';
      var text = 'new test message';
      var message = generateMessage(from, text);
      // expect(message.from).toBe(from);
      // expect(message.text).toBe(text);
// Same thing below:
      expect(message).toInclude({from, text});
      expect(typeof message.createdAt).toBe('number');
   });
});
