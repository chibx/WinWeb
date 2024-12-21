import { uid } from "uid";

// export const defaultBgs = [
//       '/backgrounds/bg_1.webp',
//       '/backgrounds/background_2.webp',
//       '/backgrounds/background_3.webp',
//       '/backgrounds/background_4.webp',
//       '/backgrounds/background_5.webp',
//       '/backgrounds/background_6.webp',
//       '/backgrounds/windows_11_logo.webp',
// ]

export const defaultBgs = Array.from({length: 12}).map((_, i)=> `/backgrounds/bg_${i+1}.webp`)

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

export const getSystemBackgrounds = async (count?: number) => {
      const bgTx = await transaction('backgrounds');
      let cursor = await bgTx.objectStore('backgrounds').openCursor();
      const backgrounds: Background[] = [];
      while (cursor) {
            if (cursor.value && cursor.value.userId == 'system') {
                  backgrounds.push(cursor.value)
            }
            cursor = await cursor.continue()
      }

      return backgrounds.slice(0, count)
}

export const getAllBackgrounds = async (count?: number) => {
      return (await idb).getAll('backgrounds',null, count)
}

export const deleteBackground = async (id: string) => {
      return (await idb).delete('backgrounds', id)
}

export const addBackground = async (background: Omit<Background, 'uid'>) => {
      return (await idb).add('backgrounds', {
            uid: uid(),
            ...background
      })
}


export async function preloadBackgrounds() {
      const promises: Promise<unknown>[] = []
      defaultBgs.forEach((url) => {
            promises.push(
                  fetch(url).then(async (res) => {
                        const blob = await res.blob();
                        return await addBackground({
                              userId: 'system',
                              data: blob
                        });
                  })
            )
      })

      return Promise.allSettled(promises)
}