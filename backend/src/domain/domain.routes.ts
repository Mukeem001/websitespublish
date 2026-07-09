import { Router } from "express";
import domainController from "./domain.controller";

const router = Router();

// Connect Domain
router.post(
  "/connect",
  domainController.connectDomain
);

// Get Domain
router.get(
  "/:websiteId",
  domainController.getDomain
);

// Verify Domain
router.post(
  "/verify/:websiteId",
  domainController.verifyDomain
);

// Delete Domain
router.delete(
  "/:websiteId",
  domainController.removeDomain
);

export default router;