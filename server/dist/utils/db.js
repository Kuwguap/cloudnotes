"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePrisma = initializePrisma;
const client_1 = require("@prisma/client");
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;
async function initializePrisma() {
    var _a;
    console.log('Initializing database connection...');
    console.log('Database URL:', (_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.replace(/\/\/.*:.*@/, '//[CREDENTIALS_HIDDEN]@'));
    const prisma = new client_1.PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        },
        log: ['query', 'info', 'warn', 'error'],
    });
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`Attempting database connection (attempt ${attempt}/${MAX_RETRIES})...`);
            await prisma.$connect();
            console.log('Database connection established successfully');
            return prisma;
        }
        catch (error) {
            console.error(`Database connection attempt ${attempt} failed:`, error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            if (attempt === MAX_RETRIES) {
                throw new Error('Failed to connect to database after multiple attempts');
            }
            console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
    return null;
}
//# sourceMappingURL=db.js.map