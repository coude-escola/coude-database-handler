const DB_handler = {
  connection_info:{
    host: "",
    user: "",
    password: "",
    database: ""
  },

  /**
   * 
   * @param {String} host The host to connect to MySQL
   * @param {String} user The username to connect to MySQL
   * @param {String} password The password to connect to MySQL
   * @param {String} database The database name to connect to MySQL
   */
  config(host, user, password, database){
    this.connection_info.host = host;
    this.connection_info.user = user;
    this.connection_info.password = password;
    this.connection_info.database = database;
  },

  /**
   * 
   * @returns this function returns the MySQL connection
   */
  async connect () {
    if(globalThis.connection && globalThis.connection.state != 'disconnected')
      return global.connection;
  
    try {
      const mysql = require('mysql2/promise');
      const connection = await mysql.createConnection({
        host: this.connection_info.host,
        user: this.connection_info.user,
        password: this.connection_info.password,
        database: this.connection_info.database
      });
  
      global.connection = connection;
      return connection;
    } catch (e) {
      return {
        error: true,
        error_info: e
      };
    }
  
  },

  /**
   * 
   * @param {(String | Array)} SQL This parameter can be a String, only with SQL, or an Array, where Array[0] is the SQL and Array[1] is the array of values to be applied in the SQL
   * @returns This function returns the result of the executed SQL if successful. If the SQL fails, the function returns the error. The function always returns the executed SQL
   */
  async SQLExec(SQL){
    try{
      const conn = await this.connect();
      
      var response;
      if(Array.isArray(SQL))
        response = await conn.query(SQL[0], SQL[1]);
      else
        response =  await conn.query(SQL);
  
      return {
        response,
        SQL
      };
    } catch (e) {
      return {error_info:e, SQL};
    }
  }
};

module.exports = DB_handler;