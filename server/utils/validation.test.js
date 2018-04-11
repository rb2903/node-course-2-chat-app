const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
   it('should reject non-string values', () => {
      var message = isRealString(1);
      expect(message).toBeFalsy();
   });
   it('should reject string with only spaces', () => {
      var message = isRealString(' ');
      expect(message).toBeFalsy();
   });
   it('should allow string', () => {
      var message = isRealString('kkk');
      expect(message).toBeTruthy();
   });
});
