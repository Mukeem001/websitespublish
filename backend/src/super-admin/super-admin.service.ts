import User from "../models/User";
import Website from "../models/Website";
import Template from "../models/Template";

export const getDashboard = async () => {
  const [
    totalUsers,
    totalWebsites,
    publishedWebsites,
    draftWebsites,
    totalTemplates,
    recentUsers,
    recentWebsites,
  ] = await Promise.all([
    User.countDocuments(),

    Website.countDocuments(),

    Website.countDocuments({
      status: "published",
    }),

    Website.countDocuments({
      status: "draft",
    }),

    Template.countDocuments(),

    User.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Website.find()
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  return {
    totalUsers,
    totalWebsites,
    publishedWebsites,
    draftWebsites,
    totalTemplates,
    recentUsers,
    recentWebsites,
  };
};