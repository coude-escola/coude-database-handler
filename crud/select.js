const SELECT = {
  /**
   * 
   * @param {(String | Array)} table The name of the table where you want to select records. If you want to select more than one table, this parameter can be an array and you can add the table names as values in this array
   * @param {(String | Array)} columns you can enter a string, or you can enter an array, where the values are the column names. If you are using more than one table, remember to enter the columns along with the name of the table to which they belong, such as: table.column
   * @param {Array} on The ON condition is used when you select more than one table and its value is an array, where the values can be an array or a string. If the value is a string, nothing is changed, but if it is an array, the format applied is Array[0] = Array[1]. If you select only one table, this parameter is understood as the conditions parameter and is applied in the WHERE clause
   * @param {(Array | String)} conditions its value is an array, where the values can be an array or a string. If the value is a string, nothing is changed, but if it is an array, the format applied is Array[0] = Array[1]. If you select only one table, this parameter must be a String and is understood as a complement parameter being applied after the WHERE clause
   * @param {String} complement  this parameter is applied after the WHERE clause. If you select only one table, this parameter will be disregarded
   * @returns the result of the SQLExec function.
   */
  async SELECT(table, columns, on, conditions, complement) {

    let table_txt = '';
    let columns_txt = '';
    let conditions_txt = '';
    let complement_txt = '';

    let values_arr = [];

    if (columns) {
      if (Array.isArray(columns)) {
        columns_txt = columns.map(column => { return this.makeStructureName(column) }).join(', ');
      } else {
        columns_txt = columns;
      }
    } else {
      columns_txt = ' * '
    }

    if (Array.isArray(table)) {
      const [count_table, count_on] = [
        table ? table.length : 0,
        on ? on.length : 0
      ];

      if (count_on == count_table - 1 && count_table > 0 && count_on > 0) {
        table.forEach(one_table => {
          const i = table.indexOf(one_table);

          if (i > 1) {
            table_txt += " INNER JOIN ";
          }
          if (i > 0) {
            table_txt += this.makeStructureName(table[i - 1]) + " INNER JOIN " + this.makeStructureName(table[i]) + " ON " + this.returnOnCondition(on[i - 1]);
          }
        });


        if (conditions) {
          const { where_txt, values_where } = this.returnWhere(conditions);
          conditions_txt = where_txt;

          values_arr.push(...values_where);
        }

        complement_txt = complement ? complement : '';

      } else {
        return {
          status: false,
          message: "element count (table names and ON clauses) do not match or are set to zero"
        };
      }
    } else {
      table_txt = this.makeStructureName(table);

      if (on) {
        const { where_txt, values_where } = this.returnWhere(on);
        conditions_txt = where_txt;

        values_arr.push(...values_where);
      }

      complement_txt = conditions ? conditions : '';
    }

    let SQL = "SELECT " + columns_txt + " FROM " + table_txt;

    if (conditions_txt)
      SQL += " WHERE " + conditions_txt;

    SQL + complement_txt;

    console.log(SQL);


    return await this.SQLExec([SQL, values_arr]);
  }
};

module.exports = SELECT;