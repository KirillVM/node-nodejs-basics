import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToTargetFile = (filename) => {
  return path.join(__dirname,'files', filename);
};

const content = 'I am fresh and young';

const create = async () => {
  try {
    await fs.writeFile(pathToTargetFile('fresh.txt'), content , { flag: 'wx'})
  } catch {
    throw new Error('FS operation failed')
  };
};

await create();