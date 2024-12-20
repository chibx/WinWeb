import { uid } from "uid";

export const defaultBgs = [
      '/backgrounds/background_1.webp',
      '/backgrounds/background_2.webp',
      '/backgrounds/background_3.webp',
      '/backgrounds/background_4.webp',
      '/backgrounds/background_5.webp',
      '/backgrounds/background_6.webp',
      '/backgrounds/windows_11_logo.webp',
]

export const getUserBackgrounds = async (userId: string) => {
      const bgTx = await transaction('backgrounds');
      let cursor = await bgTx.objectStore('backgrounds').openCursor();
      const backgrounds: Background[] = [];
      while (cursor) {
            if (cursor.value && cursor.value.userId == userId) {
                  backgrounds.push(cursor.value)
            }
            cursor = await cursor.continue()
      }

      return backgrounds
}

export const getSystemBackgrounds = async () => {
      const bgTx = await transaction('backgrounds');
      let cursor = await bgTx.objectStore('backgrounds').openCursor();
      const backgrounds: Background[] = [];
      while (cursor) {
            if (cursor.value && cursor.value.userId == 'system') {
                  backgrounds.push(cursor.value)
            }
            cursor = await cursor.continue()
      }

      return backgrounds
}

export const getAllBackgrounds = async () => {
      const bgTx = await transaction('backgrounds');
      return bgTx.objectStore('backgrounds').getAll()
}


export const deleteBackground = async (id: string) => {
      const bgTx = await transaction('backgrounds', 'readwrite');
      return bgTx.objectStore('backgrounds').delete(id)
}

export const addBackground = async (background: Omit<Background, 'uid'>) => {
      const bgTx = await transaction('backgrounds', 'readwrite');
      return bgTx.objectStore('backgrounds').add({
            uid: uid(),
            ...background
      })
}


export async function preloadBackgrounds() {
      defaultBgs.forEach(async (url) => {
            const res = await fetch(url).catch(() => void 0);
            if (!res) { return }
            const blob = await res.blob();
            await addBackground({
                  userId: 'system',
                  data: blob
            }).catch()
      })
}