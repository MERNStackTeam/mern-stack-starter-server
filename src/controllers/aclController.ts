//import acl from 'acl';
//import mongoose from 'mongoose';

// Connect to your MongoDB
//mongoose.connect('mongodb://localhost:27017/todoapp')

// Use the MongoDB backend for ACL
//let aclInstance = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));

// Define roles and permissions
//aclInstance.allow([
//  {
//    roles: ['admin'],
//    allows: [
//      { resources: '/admin', permissions: '*' },
//      { resources: '/user', permissions: ['get', 'put', 'delete'] },
//    ],
//  },
//  {
//    roles: ['user'],
//    allows: [
//      { resources: '/user', permissions: ['get', 'put'] },
//    ],
//  },
//]);

//export default aclInstance;
