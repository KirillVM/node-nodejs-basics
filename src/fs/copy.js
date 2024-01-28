import fs from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToDir = (dirName) => {
  return path.join(__dirname, dirName, '/');
};

const copy = async () => {
  try {
    await fs.access(pathToDir('files'))
    await makeDirectory(pathToDir('files-copy'));
    await copyDirectoryFiles(pathToDir('files'), pathToDir('files-copy'));
  } catch (error) {
    if (error.code === 'ENOENT' || 'EEXIST')
      throw Error('FS operation failed');
  }
};

async function copyDirectoryFiles(fromDir, toDir) {
  try {
    let readDirectory = await fs.readdir(path.join(fromDir), {withFileTypes : true, recursive: false});
    readDirectory.forEach(async (item) => {
      if (!item.isDirectory()) {
        await copyFileFromTo(fromDir, toDir, item.name)
      }
    });
  } catch (error) {
      throw error;
  }
}

async function makeDirectory(path) {
  try {
    await fs.mkdir(path, {recursive: false});
  } catch (error) {
      throw error;
  }
}

async function copyFileFromTo(fromDir, toDir, fileName) {
  try {
    await fs.copyFile(fromDir + fileName, toDir + fileName, constants.COPYFILE_EXCL);
  } catch(error) {
      throw error;
  }
  
}
  


await copy();
