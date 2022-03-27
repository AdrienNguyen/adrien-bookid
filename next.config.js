/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DB_LOCAL_URI: "mongodb://localhost:27017/bookit",
        DB_URI: "mongodb+srv://MyMongDBUser:pjtjamj@firstmongodb.ar4n4.mongodb.net/bookIt?retryWrites=true&w=majority",
        STRIPE_API_KEY:
            "pk_test_51KhEGlAq19Le49dWmHDYoB11akqPnPhoB30LC8oti0PGtcSBFBlkh1syVWo3eLCIixpCT6Qw89SSe6Y7F7xhvm9s00hyOq82XX",
        STRIPE_SECRET_KEY:
            "sk_test_51KhEGlAq19Le49dWhynqby0vh1oOSyHzBsX21JuKbm2CxBSXIzbwBGxRCB7cShyl6X2e3sKL2PH1zAMInHj4GbhK00QrrW8fYg",
        STRIPE_WEBHOOK_SECRET: "whsec_bBElpaB22EHRuAH0cGk1bIT6p6XtuEfi",

        CLOUDINARY_CLOUD_NAME: "vnist-viet-nam",
        CLOUDINARY_API_KEY: "563792185911394",
        CLOUDINARY_API_SECRET: "2FHBkKIbHfzeRqe-nyHFHel7EAw",

        SMTP_HOST: "smtp.mailtrap.io",
        SMTP_PORT: "2525",
        SMTP_USER: "d96637af857b82",
        SMTP_PASSWORD: "032350aef9dcec",

        SMTP_FROM_NAME: "AdrienNguyen",
        SMTP_FROM_EMAIL: "phuong.na163228@gmail.com",
        NEXTAUTH_URL: "https://adrien-bookit.vercel.app",
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
}

module.exports = nextConfig
