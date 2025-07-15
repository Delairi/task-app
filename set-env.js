import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envRaw = fs.readFileSync(envPath, 'utf8');

const envConfig = {};
envRaw.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, value] = trimmedLine.split('=');
    envConfig[key] = value.replace(/^"|"$/g, '');
  }
});

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
  apiUrl: '${envConfig['API_URL']}'
};
`;

fs.writeFileSync(targetPath, envFileContent);