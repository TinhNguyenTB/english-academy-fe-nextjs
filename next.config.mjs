import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
