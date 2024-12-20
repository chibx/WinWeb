import { defineStore, acceptHMRUpdate } from "pinia";

export const useDesktop = defineStore("desktop", () => {
    
});

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDesktop, import.meta.hot));
}

