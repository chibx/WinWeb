import type { InjectionKey, ShallowReactive } from "vue";
import type { ApplicationProps } from "~/applications/types";
import type { FileExplorerTabProp, PinnedPath } from "./types";

// KEYZ
export const PATH: InjectionKey<Ref<string>> = Symbol()
export const TABS: InjectionKey<ShallowReactive<FileExplorerTabProp[]>> = Symbol()
export const TAB_KEY: InjectionKey<Ref<string>> = Symbol()

//

export const USERS_PATH = 'C:\\Users\\'

export function getDataFromProps(props: ApplicationProps) {
    const { opener } = props
    if (opener?.type === 'file' && opener.path && opener.path.startsWith('C:\\')) {
        return opener.path
    }
    return 'Home'
}

export function getEndName(str: string) {
    return (str === 'Home' || str === 'C:\\') ? str : str.split('\\').at(-1)
}

export function inferFolderIcon({ path, pinned }: PinnedPath) {
    path = exTrail(path)
    const endName = getEndName(path)

    if (pinned) {
        return getPinnedIcons(path)
    }

    switch (endName) {
        case 'Home':
            return '/icons/home.svg'
        case 'Videos':
            return '/icons/videos_folder.svg'
        case 'Pictures':
            return '/icons/pictures_folder.svg'
        case 'Documents':
            return '/icons/documents_folder.svg'
        case 'Music':
            return '/icons/music_folder.svg'
        case 'Downloads':
            return '/icons/downloads_folder.svg'
        default:
            return '/icons/folder.svg'
    }
}

function getPinnedIcons(path: string): string {
    // path = exTrail(path)
    // const baseStr = path.slice(USERS_PATH.length)
    // const isValid = baseStr !== '' && baseStr.split('\\').length === 1
    // const endName = getEndName(path)
    const endName = path

    switch (endName) {
        case 'Videos':
            return '/icons/videos_library.webp'
        case 'Pictures':
            return '/icons/photos.svg'
        case 'Documents':
            return '/icons/documents_library.webp'
        case 'Music':
            return '/icons/music_library.webp'
        case 'Downloads':
            return '/icons/downloads_folder.svg'
        default:
            return '/icons/folder.svg'
    }
}

function exTrail(path: string) {
    return path.endsWith('\\') && path !== 'C:\\' ? path.slice(0, path.length - 1) : path
}