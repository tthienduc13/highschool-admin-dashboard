import { University, UniversityMajor } from "@/api/university/type";
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

interface UniversityMajorState {
    isOpenCreate: boolean;
    isOpenEdit: boolean;
    editUniversityMajor: UniversityMajor | null;
    openCreate: () => void;
    openEdit: (universityMajor: UniversityMajor) => void;
    closeCreate: () => void;
    closeEdit: () => void;
}

const useUniversityMajorStore = create<UniversityMajorState>((set) => ({
    isOpenCreate: false,
    isOpenEdit: false,
    editUniversityMajor: null,
    openCreate: () =>
        set({
            isOpenCreate: true,
            isOpenEdit: false,
            editUniversityMajor: null,
        }),
    openEdit: (universityMajor) =>
        set({
            isOpenCreate: false,
            isOpenEdit: true,
            editUniversityMajor: universityMajor,
        }),
    closeCreate: () => set({ isOpenCreate: false }),
    closeEdit: () => set({ isOpenEdit: false, editUniversityMajor: null })
}));

export { useUniversityStore, useUniversityMajorStore };