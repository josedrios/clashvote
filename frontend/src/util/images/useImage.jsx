import { useState, useEffect } from 'react';
import findImageType from './findImageType';

const imageGlobs = {
  builderhalls: import.meta.glob('/src/assets/images/builderhalls/*.png'),
  builderleagues: import.meta.glob('/src/assets/images/builderleagues/*.png'),
  clanwarleagues: import.meta.glob('/src/assets/images/clanwarleagues/*.png'),
  heroequipment: import.meta.glob('/src/assets/images/heroequipment/*.png'),
  heroes: import.meta.glob('/src/assets/images/heroes/*.png'),
  misc: import.meta.glob('/src/assets/images/misc/*.png'),
  pets: import.meta.glob('/src/assets/images/pets/*.png'),
  sieges: import.meta.glob('/src/assets/images/sieges/*.png'),
  spells: import.meta.glob('/src/assets/images/spells/*.png'),
  supers: import.meta.glob('/src/assets/images/supers/*.png'), // Super Troops
  townhalls: import.meta.glob('/src/assets/images/townhalls/*.png'),
  troops: import.meta.glob('/src/assets/images/troops/*.png'),
};

function useImage(name) {
  const [src, setSrc] = useState('');

  if (typeof name === "undefined" || name === null || name === '') {
    console.log("String is undefined or null");
    return;
  }

  useEffect(() => {
    async function loadImage() {
      const formattedName = name.replace(/[ ]/g, '_');
      const type = findImageType(formattedName);
      if (!type || !imageGlobs[type]) {
        console.warn('No image type was found for:', formattedName);
        return;
      }
      const path = `/src/assets/images/${type}/${formattedName}.png`;

      if (imageGlobs[type][path]) {
        const module = await imageGlobs[type][path]();
        setSrc(module.default);
      } else {
        console.warn(`Image not found: ${path}`);
        return;
      }
    }

    loadImage();
  }, [name]);

  return src;
}

export default useImage;
