const { Roles } = require('../database/schemas');

function rolechecking(req, res) {
  const { role } = req.query;
  Roles.findOne({ role })
    .then(roles => {
      if (roles) {
        res.send({ message: 'Role Already Exist', roles }); }
      else { res.send({ message: 'Role Not Exist', roles }); }
    })
    .catch(err => {
      res.status(400).send({ message: 'Get users failed', err });
    });
}
function getallroles(req, res) {
  Roles.find({})
    .then(roles => {
      res.send({ roles });
    })
    .catch(err => {
      res.send({ message: 'Error ', err });
    });
}

function creatroles(req, res) {
  const newRoles = Roles(req.body);
  newRoles.save()
    .then(savedRoles => {
      res.send({ message: 'Role saved successfully', role: savedRoles });
    })
    .catch(err => {
      res.status(400).send({ message: 'Created Role failed', err });
    });
}

module.exports = {
  rolechecking,
  creatroles,
  getallroles,
};
