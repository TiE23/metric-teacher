const other = {
  /**
   * Simple query that returns a string containing the date to show the server is alive.
   * @param parent
   * @param args
   * @param ctx
   * @returns String!
   */
  async ping(parent, args, ctx) {
    const now = new Date(Date.now());
    return `Hello! Server time is: ${now.toString()}`;
  },
};

module.exports = { other };
