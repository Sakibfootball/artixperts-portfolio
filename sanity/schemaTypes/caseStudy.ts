import { defineField, defineType } from "sanity";

export default defineType({
    name: "caseStudy",
    title: "Case Studies",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Case Study Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    type: "string",
                    title: "Alternative Text",
                    description: "Describe the image for accessibility",
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H1", value: "h1" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Underline", value: "underline" },
                            { title: "Strike", value: "strike-through" },
                            { title: "Code", value: "code" },
                        ],
                        annotations: [
                            {
                                name: "textColor",
                                type: "object",
                                title: "Text Color",
                                fields: [
                                    {
                                        name: "value",
                                        type: "string",
                                        title: "Color Value",
                                        options: {
                                            list: [
                                                { title: "Red", value: "#ef4444" },
                                                { title: "Blue", value: "#3b82f6" },
                                                { title: "Green", value: "#22c55e" },
                                                { title: "Purple", value: "#a855f7" },
                                                { title: "Orange", value: "#f97316" },
                                                { title: "Teal", value: "#14b8a6" },
                                                { title: "Yellow", value: "#eab308" },
                                                { title: "Pink", value: "#ec4899" },
                                                { title: "Indigo", value: "#6366f1" },
                                                { title: "Gray", value: "#6b7280" },
                                            ],
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alternative Text",
                        },
                        {
                            name: "caption",
                            type: "string",
                            title: "Caption",
                        },
                    ],
                },
                {
                    type: "code",
                    title: "Code Block",
                    options: {
                        withFilename: true,
                    },
                },
                {
                    type: "table",
                    title: "Table",
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "heroImage",
        },
    },
});
