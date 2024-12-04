"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePrisma = initializePrisma;
const client_1 = require("@prisma/client");
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;
async function initializePrisma() {
    const prisma = new client_1.PrismaClient({
        log: ['error', 'warn'],
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