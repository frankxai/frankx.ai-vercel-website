#!/bin/bash

# Helper script to create a new course from template

if [ -z "$1" ]; then
  echo "Usage: ./new-course.sh <course-slug>"
  echo "Example: ./new-course.sh advanced-suno-techniques"
  exit 1
fi

SLUG="$1"
FILENAME="content/courses/${SLUG}.mdx"

if [ -f "$FILENAME" ]; then
  echo "❌ Course already exists: $FILENAME"
  exit 1
fi

# Copy template
cp content/courses/.TEMPLATE.mdx "$FILENAME"

echo "✅ Created new course: $FILENAME"
echo ""
echo "Next steps:"
echo "1. Edit the file: code $FILENAME"
echo "2. Update frontmatter (title, slug, description, price)"
echo "3. Add course content"
echo "4. Commit to git: git add $FILENAME && git commit -m 'Add new course: $SLUG'"
echo ""
echo "The course will be live at http://localhost:3000 after saving!"
