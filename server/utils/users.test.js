const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
   var users;
   beforeEach(() => {
      users = new Users;
      users.users = [{
         id: 1,
         name: 'Fred',
         room: 'Node Room'
      }, {
         id: 2,
         name: 'John',
         room: 'React Room'
      }, {
         id: 3,
         name: 'Bill',
         room: 'Node Room'
      }];
   });

   it('should add new user', () => {
      var users = new Users;
      var user = {
         id: 4,
         name: 'Rob',
         room: 'Node Room'
      }
      var newUser = users.addUser(user.id, user.name, user.room);
      expect(users.users).toEqual([user]);
   });

   it('should remove a user', () => {
      id = 1;
      var user = users.removeUser(id);
      expect(user.id).toBe(id);
      expect(users.users.length).toBe(2);
   });

   it('should not remove a user', () => {
      id = 4;
      var user = users.removeUser(id);
      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
   });

   it('should find a user', () => {
      var id = 1;
      var user = users.getUser(id);
      expect(user.id).toBe(id);
   });

   it('should not find a user', () => {
      var id = 4;
      var user = users.getUser(id);
      expect(user).toNotExist();
   });

   it('should return a list of all Node Room names', () => {
      var usersList = users.getUserList('Node Room');
      expect(usersList).toEqual(['Fred','Bill']);
   });
});
