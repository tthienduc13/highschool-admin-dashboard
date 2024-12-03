import { Major, MajorCategory } from "@/api/major/type";
import { create } from "zustand";

interface MajorState {
    isOpenCreate: boolean;
    isOpenEdit: boolean;
    editMajor: Major | null;
    openCreate: () => void;
    openEdit: (major: Major) => void;
    closeCreate: () => void;
    closeEdit: () => void;
}

const useMajorStore = create<MajorState>((set) => ({
    isOpenCreate: false,
    isOpenEdit: false,
    editMajor: null,
    openCreate: () =>
        set({
            isOpenCreate: true,
            isOpenEdit: false,
            editMajor: null,
        }),
    openEdit: (major) =>
        set({
            isOpenCreate: false,
            isOpenEdit: true,
            editMajor: major,
        }),
    closeCreate: () => set({ isOpenCreate: false }),
    closeEdit: () => set({ isOpenEdit: false, editMajor: null })
}));

interface MajorCategoryState {
    isOpenCreate: boolean;
    isOpenEdit: boolean;
    editMajorCategory: MajorCategory | null;
    openCreate: () => void;
    openEdit: (major: MajorCategory) => void;
    closeCreate: () => void;
    closeEdit: () => void;
}

const useMajorCategoryStore = create<MajorCategoryState>((set) => ({
    isOpenCreate: false,
    isOpenEdit: false,
    editMajorCategory: null,
    openCreate: () =>
        set({
            isOpenCreate: true,
            isOpenEdit: false,
            editMajorCategory: null,
        }),
    openEdit: (majorCategory) =>
        set({
            isOpenCreate: false,
            isOpenEdit: true,
            editMajorCategory: majorCategory,
        }),
    closeCreate: () => set({ isOpenCreate: false }),
    closeEdit: () => set({ isOpenEdit: false, editMajorCategory: null })
}));



export { useMajorStore, useMajorCategoryStore };