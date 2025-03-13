import { useState, useEffect } from 'react';
import image from '../assets/images/troops/Archer.png'

function useImage(name) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    async function loadImage() {
      const images = import.meta.glob('/src/assets/images/troops/*.png');
      const path = `/src/assets/images/troops/${name.replace(/[ .]/g, '_')}.png`;

      if (images[path]) {
        setSrc((await images[path]()).default);
      } else {
        console.warn(`Image not found: ${path}`);
      }
    }

    loadImage();
  }, [name]);

  return src;
}

export default useImage;
