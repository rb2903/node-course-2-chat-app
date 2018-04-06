const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
   it('should generate correct message object', () => {
      var from = 'Rob';
      var latitude = 51.41233;
      var longitude = -0.300689;
      var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      var message = generateLocationMessage(from, latitude, longitude);
      expect(message).toInclude({from, url});
      expect(typeof message.createdAt).toBe('number');
   });
});
