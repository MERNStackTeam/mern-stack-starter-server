const { UserRoles } = require('../database/schemas');

function creatUserRoles(req, res) {
  UserRoles.findOne({ user: req.body.user, role: req.body.role })
    .then(userRoles => {
      if (userRoles) {
        res.send({ message: 'Already Assigned this role', userRoles }); }
      else {
        const newUserRoles = UserRoles(req.body);
        newUserRoles.save()
          .then(userroles => {
            res.send({ message: 'Successfully added user roles', userroles });
          })
          .catch(err => {
            res.send({ message: 'Something went wrong', err });
          });
      }
    });

}

function getUserRoles(req, res) {

  UserRoles.find({ user: req.query.user })
    .then(roles => {
      if (roles) {
        res.send({ message: 'Role Already Exist', roles }); }
    })
    .catch(err => {
      res.status(400).send({ message: 'Get users failed', err });
    });
}

module.exports = {
  creatUserRoles,
  getUserRoles,
};
