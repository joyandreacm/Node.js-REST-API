module.exports = (SequelizeDB, Sequelize) => {
  
    const tablename = "citizen_tbl"
    
    const citizen_tbl = SequelizeDB.define(tablename, {
      qr_no: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      middlename: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      mobile_no: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      home_address: {
        type: Sequelize.STRING
      },
      barangay: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      sex: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    }, { tablename } );
  
    return citizen_tbl;
  };  