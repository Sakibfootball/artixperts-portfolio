import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "9eztqr4e",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});