class Users {
   constructor() {
      this.users = [];
   }
   addUser(id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
   }
   removeUser(id) {
      var user = this.getUser(id);
      if (user) {
         this.users = this.users.filter((user) => user.id !== id);
      }
      return user;
   }
   getUser(id) {
// Need the [0] otherwise an array rather than an object is returned
      var user = this.users.filter((user) => user.id === id)[0];
      return user;
   }
   getUserList(room) {
   // var users = this.users.filter((user) => {
   //    return user.room === room;// returns true or false
   // });
   // Shorter version using ES6 syntax
      var users = this.users.filter((user) => user.room === room);
      var namesArray = users.map((user) => user.name);// ie just want the name
      return namesArray;
   }
}

module.exports = {Users};
