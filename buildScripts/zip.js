import { zip } from 'zip-a-folder';

async function zipBuild() {
  try {
    await zip('./dist', './build.zip');
    console.log('Build folder zipped successfully');
  } catch (err) {
    console.error('Failed to zip build folder:', err);
  }
}

zipBuild();