import { Request, Response } from "express";
import * as PublishService from "./publish.service";

interface PublishParams {
  websiteId: string;
}

/* ==========================
   Publish Website
========================== */

export const publishWebsite = async (
  req: Request<PublishParams>,
  res: Response
) => {
  try {
    const { websiteId } = req.params;

    const result =
      await PublishService.publishWebsite(
        websiteId
      );

    return res.status(200).json({
      success: true,
      message: "Website published successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Publish failed",
    });
  }
};