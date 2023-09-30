const db = require("../helpers/db.helper");

exports.findOne = async function(username){
    const query = `
  SELECT * FROM "users"
  WHERE username=$1
  `;
    const values = [username];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.insert = async function(data){
    const query = `
  INSERT INTO "users" ("username", "password") 
  VALUES ($1, $2) RETURNING *
  `;  
    const values = [data.username, data.password];   
    const {rows} = await db.query(query, values);
    return rows[0];
};
