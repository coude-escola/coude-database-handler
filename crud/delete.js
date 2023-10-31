const DELETE = {
  /**
   * 
   * @param {String} table The name of the table where you want to delete records
   * @param {Array} conditions the array with the where conditions. The values of this array parameter can be an array or a string. If it is a string, nothing changes, but if it is an array, its values are understood as Array[0] = Array[1]
   * @returns  the result of the SQLExec function.
   */
  async DELETE(table, conditions) {
    let values_arr = [];

    const { where_txt, values_where } = this.returnWhere(conditions);

    values_arr.push(...values_where);

    const SQL = "DELETE FROM " + this.makeStructureName(table) + " WHERE " + where_txt;

    return await this.SQLExec([SQL, values_arr]);
  }
};

module.exports = DELETE;