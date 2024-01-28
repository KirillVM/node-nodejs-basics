import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToDir = (fileName) => {
  return path.join(__dirname, 'files', fileName);
};

const read = async () => {
    try {
      let fileData = await fs.readFile(pathToDir('fileToRead.txt'), { encoding: 'utf8' }); 
      console.log(fileData);     
    } catch (error) {
      if(error.code === 'ENOENT') {
        throw Error('FS operation failed');
      }
    }
};

await read();