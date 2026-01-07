import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'frankx-cms',
  title: 'FrankX CMS',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      {
        name: 'course',
        title: 'Courses',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
          },
          {
            name: 'price',
            title: 'Price ($)',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
          },
          {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                {title: 'AI Music Production', value: 'ai-music'},
                {title: 'Automation & Workflows', value: 'automation'},
                {title: 'Creator Tools', value: 'creator-tools'},
              ],
            },
          },
          {
            name: 'content',
            title: 'Course Content',
            type: 'array',
            of: [{type: 'block'}],
          },
        ],
      },
      {
        name: 'article',
        title: 'Articles',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
            },
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
          },
          {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{type: 'block'}],
          },
        ],
      },
    ],
  },
})
