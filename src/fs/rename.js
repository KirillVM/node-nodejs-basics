import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToDir = (dirName) => {
  return path.join(__dirname, 'files', dirName);
};

const rename = async () => {
  try {
    await fs.access(pathToDir('wrongFilename.txt'));

    try {
      await fs.access(pathToDir('properFilename.md'));
      throw Error('FS operation failed');
    } catch (error) {
      if(error.code === 'ENOENT') {
        try {
          await fs.rename(pathToDir('wrongFilename.txt'), pathToDir('properFilename.md'))
        } catch (error) {
          throw error;
        }
      } else {
        throw error;
      }
      
    } 
  } catch (error) {
    if(error.code === 'ENOENT') {
      throw Error('FS operation failed');
    }
  }
};

await rename();