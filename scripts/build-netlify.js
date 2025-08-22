#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("Building Next.js static export...")
execSync("npm run build", { stdio: "inherit" })

console.log("Generating PayloadCMS types...")
try {
  execSync("npm run generate:types", { stdio: "inherit" })
} catch (error) {
  console.warn("Warning: Could not generate PayloadCMS types. This is normal for first build.")
}

console.log("Build complete!")
