import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: 'http://localhost:8081' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                ],
            },
        ];
    },
};

export default nextConfig;
