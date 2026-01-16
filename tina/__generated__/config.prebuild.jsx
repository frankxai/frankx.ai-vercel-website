// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "";
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description (SEO)",
            description: "Max 160 characters for SEO meta description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            options: ["FrankX", "Frank", "FrankX.ai Agent Team"]
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "Creator Systems",
              "Vibe Sessions",
              "Intelligence Dispatches",
              "Consciousness",
              "Flagship"
            ]
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: "Add 3-5 relevant tags"
          },
          {
            type: "image",
            name: "image",
            label: "Hero Image"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post"
          },
          {
            type: "string",
            name: "readingGoal",
            label: "Reading Goal",
            description: "What will the reader learn? (optional)",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "keywords",
            label: "SEO Keywords",
            list: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout Box",
                fields: [
                  {
                    type: "string",
                    name: "type",
                    label: "Type",
                    options: ["tip", "warning", "info", "note"]
                  },
                  {
                    type: "rich-text",
                    name: "children",
                    label: "Content"
                  }
                ]
              },
              {
                name: "AffiliateLink",
                label: "Affiliate Link",
                fields: [
                  {
                    type: "string",
                    name: "product",
                    label: "Product Name",
                    required: true
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link URL",
                    required: true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
