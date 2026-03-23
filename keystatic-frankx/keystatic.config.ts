import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    courses: collection({
      label: 'Courses',
      slugField: 'title',
      path: 'content/courses/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        price: fields.number({
          label: 'Price ($)',
          validation: { min: 0 },
        }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'AI Music Production', value: 'ai-music' },
            { label: 'Automation & Workflows', value: 'automation' },
            { label: 'Creator Tools', value: 'creator-tools' },
          ],
          defaultValue: 'ai-music',
        }),
        content: fields.document({
          label: 'Course Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/uploads',
            publicPath: '/uploads/',
          },
        }),
      },
    }),
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        body: fields.document({
          label: 'Body',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/uploads',
            publicPath: '/uploads/',
          },
        }),
      },
    }),
  },
});
