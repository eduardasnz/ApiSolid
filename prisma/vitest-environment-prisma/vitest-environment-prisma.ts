import type { Environment } from "vitest";

const customPrismaEnv: Environment = {
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    console.log("Ambiente Prisma carregado");

    return {
      async teardown() {
        console.log("Teardown Prisma");
      },
    };
  },
};

export default customPrismaEnv;
