import express from 'express';
import { moduleRoutes } from './module_routes';

const router = express.Router();

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
