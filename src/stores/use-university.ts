import { University } from "@/api/university/type";
import { create } from "zustand";

interface UniversityState {
    isOpenCreate: boolean;
    isOpenEdit: boolean;
    editUniversity: University | null;
    openCreate: () => void;
    openEdit: (university: University) => void;
    closeCreate: () => void;
    closeEdit: () => void;
}

const useUniversityStore = create<UniversityState>((set) => ({
    isOpenCreate: false,
    isOpenEdit: false,
    editUniversity: null,
    openCreate: () =>
        set({
            isOpenCreate: true,
            isOpenEdit: false,
            editUniversity: null,
        }),
    openEdit: (university) =>
        set({
            isOpenCreate: false,
            isOpenEdit: true,
            editUniversity: university,
        }),
    closeCreate: () => set({ isOpenCreate: false }),
    closeEdit: () => set({ isOpenEdit: false, editUniversity: null })
}));

export default useUniversityStore;
