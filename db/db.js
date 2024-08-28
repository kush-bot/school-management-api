const connection = require('./dbSetup.js')

const createTable = async ()=>{
    const createQuery=`
    CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(250) NOT NULL,
    address varchar(250) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL);`;

    try {
        const [result] = await connection.promise().query(createQuery);
        console.log("Table created or already exists:", result);
      } catch (err) {
        console.error("Error creating table:", err);
      } 
}

module.exports=createTable;