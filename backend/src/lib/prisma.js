import "dotenv/config";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("@prisma/client");
const PrismaClient = pkg.PrismaClient || pkg.default?.PrismaClient || pkg;
const adapter = {
    provider: "postgres",
    url: process.env.DATABASE_URL,
};
export const prisma = new PrismaClient({ adapter });
export default prisma;
//# sourceMappingURL=prisma.js.map