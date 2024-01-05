//import express from 'express';
//import aclInstance from '../controllers/acl-setup';
//import passport from 'passport';

//const router = express.Router();

// Middleware to check menu permissions
//const checkMenuPermissions = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Ensure that req.user is properly populated by Passport.js or your authentication middleware
//  if (!req.user) {
//    return res.status(401).json({ error: 'Unauthorized' });
//  }

//  const userRoles = req.user.roles || []; // Assuming you have a user object with roles

//  aclInstance.areAnyRolesAllowed(userRoles, req.path, req.method.toLowerCase(), (err: any, allowed: boolean) => {
//    if (err) {
//      return res.status(500).json({ error: 'Failed to check permissions' });
//    }

//    if (allowed) {
//      next(); // Continue to the next middleware or route handler
//    } else {
//      return res.status(403).json({ error: 'Insufficient permissions' });
//    }
//  });
//};

// Route with menu permissions check
//router.get('/admin', passport.authenticate('jwt'), checkMenuPermissions, (req: express.Request, res: express.Response) => {
//  res.render('admin-menu');
//});

// Another route without menu permissions check
//router.get('/user', (req: express.Request, res: express.Response) => {
//  res.render('user-menu');
//});

//export default router;
