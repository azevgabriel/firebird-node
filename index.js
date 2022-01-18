const firebird = require('node-firebird')

const options = {
  host: '127.0.0.1',
  port: 3050,
  database: 'C:/DADOS02.FBD',
  user: 'SYSDBA',
  password: 'masterkey',
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: false,
  role: null,           
  pageSize: 4096    
};

firebird.attach(options, function(err, db) {

  if (err)
      throw err;

  // db = DATABASE
  db.query('SELECT * FROM PONTO', function(err, result) {
      console.log(result);
      // IMPORTANT: close the connection
      db.detach();
  });

});