const INSERT = {
  /**
   * 
   * @param {String} table The name of the table to which a record will be added
   * @param {Object} data The object where the table columns are the properties and the data to be defined are the values of this properties
   * @returns the result of the SQLExec function.
   */
  async INSERT(table, data) {
    let columns_arr = [];
    let values_arr = [];

    let values_place = [];

    for (let column in data) {
      const value = data[column];

      columns_arr.push(column);
      values_arr.push(value);
      values_place.push('?');
    }

    columns_arr = columns_arr.map(column_name => { return this.makeStructureName(column_name) })

    const columns_txt = columns_arr.join(', ');
    const values_txt = values_place.join(", ");

    const SQL = "INSERT INTO " + this.makeStructureName(table) + " (" + columns_txt + ") VALUES (" + values_txt + ")";

    return await this.SQLExec([SQL, values_arr]);
  }
};

module.exports = INSERT;
