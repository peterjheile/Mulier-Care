import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',

    access: {
        read: anyone,
        update: isAdminOrEditor,
    },

    fields: [
        {
            name: 'siteName',
            type: 'text',
            required: true,
            defaultValue: 'Mulier Care',
            admin: {
                description: 'The organization name displayed across the website.',
            },
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'The shared logo used in the header and footer.',
            },
        },
        {
            name: 'contactEmail',
            type: 'email',
            label: 'Contact Email',
            admin: {
                description: 'The public contact email displayed on the website.',
            },
        },
        {
            name: 'contactPhone',
            type: 'text',
            label: 'Contact Phone',
            admin: {
                description:
                'The public phone number. Include the formatting you want displayed.',
            },
        },
        {
            name: 'socialLinks',
            type: 'array',
            label: 'Social Links',
            labels: {
                singular: 'Social Link',
                plural: 'Social Links',
            },
            admin: {
                description: 'Add and reorder the social profiles displayed on the site.',
            },
            fields: [
                {
                name: 'platform',
                type: 'select',
                required: true,
                options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'X', value: 'x' },
                    { label: 'Other', value: 'other' },
                ],
                },
                {
                name: 'label',
                type: 'text',
                required: true,
                admin: {
                    description:
                    'A readable name, such as “Mulier Care on Instagram”. Also used for accessibility when displaying an icon.',
                },
                },
                {
                name: 'url',
                type: 'text',
                label: 'Profile URL',
                required: true,
                validate: (value: string | null | undefined) => {
                    if (!value) return 'Enter a social profile URL.'

                    try {
                    const url = new URL(value)

                    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
                        return 'Use a full URL beginning with https:// or http://.'
                    }

                    return true
                    } catch {
                    return 'Enter a valid URL, such as https://instagram.com/example.'
                    }
                },
                },
            ],
        },
    ],

    hooks: {
        afterChange: [revalidateSiteSettings],
    },
}