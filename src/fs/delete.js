import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToDir = (dirName) => {
  return path.join(__dirname, 'files', dirName);
};
const remove = async () => {
  try {
    await fs.unlink(pathToDir('fileToRemove.txt'));
  } catch (error) {
    if(error.code === 'ENOENT') {
      throw Error('FS operation failed');
    }
  }
};

await remove();