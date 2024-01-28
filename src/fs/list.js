import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToDir = (dirName) => {
  return path.join(__dirname, dirName, '/');
};
const list = async () => {
  const fileNameArray = [];
  try {
    let readDirectory = await fs.readdir(pathToDir('files'), {withFileTypes : true});
    readDirectory.forEach((item) => {
      if (!item.isDirectory()) {
        fileNameArray.push(`${item.name.split('.')[0]} - ${path.extname(item.name).slice(1)}`);
      }
    });
    
  } catch (error) {
    if(error.code === 'ENOENT') {
      throw Error('FS operation failed');
    }
  } finally {
    console.log(fileNameArray);
  }
}

await list();
