/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
            },
            {
              protocol: 'https',
              hostname: 'api.qrserver.com',
              port: '',
            },
            {
              protocol: 'https',
              hostname: 'robohash.org',
              port: '',
            }
          ],
    }
}

module.exports = nextConfig
