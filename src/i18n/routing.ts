import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['vi', 'en'],
    // Used when no locale matches
    defaultLocale: 'vi',
    // Used when the locale is not specified in the URL
    localePrefix: 'as-needed',
});