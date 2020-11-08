const sequelizePaginate = require('sequelize-paginate')
const db = require("../models/model_index");
const DBModel = db.citizen;
sequelizePaginate.paginate(DBModel)

const getNextPage = (page, total) => {
  const a = page < total ? +page + 1 : total;
  return a
};

// Create request
exports.create = (req, res) => {

  // Simple Validation 
  if (!req.body.firstname && !req.body.middlename && !req.body.lastname) {
    res.status(400).send({
      return_code : 2 ,
      message: "Invalid request!"
    });
    return;
  }

  const data = {
    qr_no : req.body.qr_no ,
    firstname : req.body.firstname ,
    middlename : req.body.middlename ,
    lastname : req.body.lastname , 
    mobile_no : req.body.mobile_no ,
    email_address : req.body.email_address ,
    home_address : req.body.home_address ,
    barangay : req.body.barangay ,
    city : req.body.city ,
    age : req.body.age ,
    sex : req.body.sex ,
    status : '0' ,
  };

  DBModel.create(data)
    .then(data => {
      res.status(201).send({
        return_code : 1 ,
        message : "New data added!",
        details : data
      });
    })
    .catch(err => {
      res.status(500).send({
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
    });
};


// Get all request
exports.getAll = (req, res) => {
  const { page, size } = req.query;
  const options = {
    page: +page,
    paginate: +size,
  }
  var before = page > 1 ? +page - 1 : 1;
  
  DBModel.paginate(options)
    .then(data => {
      res.status(200).send({
          return_code : 0 ,
          message : "Valid request" ,
          details : data.docs ,
          pagination :  { "before": before , 
                          "page" : page ,
                          "next": getNextPage( page, data.total ) ,
                          "total" : data.total }
      });
    })
    .catch(err => {
      res.status(500).send({
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
    });
};


// Get one data request
exports.getOne = (req, res) => {
  const { id } = req.params;

  DBModel.findOne({
    where: {
      id : id
    },
  })
    .then(response => {
      res.status(200).send({
          return_code : 0 ,
          message : "Valid request." ,
          details : response
      });
    })
    .catch(err => {
      res.status(500).send({
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
    });
};


// Update request
exports.updateOne = (req, res) => {
  const id = req.params.id;

  DBModel.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          return_code : 0 ,
          message: "Data was updated successfully."
        });
      } else {
        res.status(400).send({
          return_code : 2 ,
          message: "Invalid request!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
    });
};


// Delete request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          return_code : 0 ,
          message: "Data was deleted successfully"
        });
      } else {
        res.status(400).send({
          return_code : 2 ,
          message: "Invalid request!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred."
      });
    });
};