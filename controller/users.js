const database = require('../database')
class UserController{
  async create(persona){
    const results = await database.insert('users',persona)
    console.log(results)
    return results
  }
  async readAll(){
    const users = await database.query('SELECT * FROM users')
    
    return users
  }

  async delete(id){
    const user = await database.del('users',id)
    return user
  }

  async read(id){
    const users = await database.query('SELECT * FROM users WHERE id=?',[id])
    return users[0]
  }
  async edit(id,data){
    const user = await database.query('UPDATE users SET ? WHERE id=?',[data,id])
    return user
  }
}

module.exports = UserController