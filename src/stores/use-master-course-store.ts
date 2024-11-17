import { create } from "zustand";

interface MasterCourseState {
    isOpenCreate: boolean;
    isOpenEdit: boolean;
    isOpenDetail: boolean;
    editCourseId: string | null;
    detailCourseId: string | null;
    openCreate: () => void;
    openEdit: (id: string) => void;
    openDetail: (id: string) => void;
    closeCreate: () => void;
    closeEdit: () => void;
    closeDetail: () => void;
}

const useMasterCourseStore = create<MasterCourseState>((set) => ({
    isOpenCreate: false,
    isOpenEdit: false,
    isOpenDetail: false,
    editCourseId: null,
    detailCourseId: null,
    openCreate: () =>
        set({
            isOpenCreate: true,
            isOpenEdit: false,
            isOpenDetail: false,
            editCourseId: null,
            detailCourseId: null,
        }),
    openEdit: (id) =>
        set({
            isOpenCreate: false,
            isOpenEdit: true,
            isOpenDetail: false,
            editCourseId: id,
            detailCourseId: null,
        }),
    openDetail: (id) =>
        set({
            isOpenCreate: false,
            isOpenEdit: false,
            isOpenDetail: true,
            editCourseId: null,
            detailCourseId: id,
        }),
    closeCreate: () => set({ isOpenCreate: false }),
    closeEdit: () => set({ isOpenEdit: false, editCourseId: null }),
    closeDetail: () => set({ isOpenDetail: false, detailCourseId: null }),
}));

export default useMasterCourseStore;
