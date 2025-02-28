// replace-env-vars.ts
import * as fs from 'fs';
import * as path from 'path';

const environmentPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

// Retrieve the PUBLIC_KEY from the environment variables (set by GitHub Secrets)
const publicKey = process.env.PUBLIC_KEY;

if (!publicKey) {
  console.error('PUBLIC_KEY environment variable is not set!');
  process.exit(1); // Exit the script if the key is not set
}

// Read the environment file content
let content = fs.readFileSync(environmentPath, 'utf8');

// Replace the placeholder with the actual value of the PUBLIC_KEY
content = content.replace('REPLACE_PUBLIC_KEY', publicKey);

// Write the modified content back to the environment file
fs.writeFileSync(environmentPath, content, 'utf8');

console.log('PUBLIC_KEY injected into environment.prod.ts');
