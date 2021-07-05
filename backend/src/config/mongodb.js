const mongoose = require('mongoose');
const { SERVER_DB_URI } = require('../../settings');

class Mongoose {
  #options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false };

  constructor() {
    this.client = mongoose;
    this.url = SERVER_DB_URI;
  }

  /**
   * @returns
   */
  async connect() {
    try {
      return await this.client.connect(this.url, this.#options);
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * run database first before running the server.
   *
   * @param {server} server
   * @param {PORT} port
   * @returns
   */
  async run(server, PORT) {
    try {
      let connect = await this.connect();
      if (!connect) return console.log('Database MongoDB connection failed.');

      console.log('Database MongoDB is connected.');

      server.listen(PORT, () => console.log(`Server running on port: ${PORT}.`));
    } catch (error) {
      return console.error(error);
    }
  }
}

module.exports = Mongoose;
