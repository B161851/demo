import * as path from 'path';

const fs = require('fs');
// Define the path to the environment.prod.ts file
const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

// Check if the file exists
if (fs.existsSync(envFilePath)) {
  // Read the content of environment.prod.ts
  let envFileContent = fs.readFileSync(envFilePath, 'utf8');

  // Replace the placeholder with the actual public key from the environment variable
  const publicKey = process.env['PUBLIC_KEY']; // Use bracket notation
  if (publicKey) {
    envFileContent = envFileContent.replace('publicKey: ""', `publicKey: "${publicKey}"`);
  } else {
    console.error('PUBLIC_KEY environment variable is not set!');
    process.exit(1); // Exit with an error code if PUBLIC_KEY is missing
  }

  // Write the updated content back to the file
  fs.writeFileSync(envFilePath, envFileContent, 'utf8');

  console.log('Environment variables have been replaced successfully.');
} else {
  console.error('environment.prod.ts file not found!');
  process.exit(1); // Exit with an error code if the file does not exist
}
