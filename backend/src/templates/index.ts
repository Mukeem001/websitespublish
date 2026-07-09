interface TemplatePage {
  title: string;
  slug: string;
  isHomePage: boolean;
  sections: any[];
}

interface BackendTemplate {
  id: string;
  version: string;
  pages: TemplatePage[];
}

const templates: BackendTemplate[] = [
  {
    id: "ecommerce",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Products",
        slug: "products",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "restaurant",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Menu",
        slug: "menu",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "portfolio",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Projects",
        slug: "projects",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "hospital",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Services",
        slug: "services",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "school",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Academics",
        slug: "academics",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "gym",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Classes",
        slug: "classes",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "agency",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Services",
        slug: "services",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "blog",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Posts",
        slug: "posts",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "lawyer",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Practice",
        slug: "practice",
        isHomePage: false,
        sections: [],
      },
    ],
  },
  {
    id: "real-estate",
    version: "1.0.0",
    pages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        sections: [],
      },
      {
        title: "Listings",
        slug: "listings",
        isHomePage: false,
        sections: [],
      },
    ],
  },
];

export const getTemplateById = (id: string) => {
  return templates.find((template) => template.id === id);
};

export default templates;
