import { create } from "zustand";

export type Tab = "lessons" | "flashcard" | "quiz" | "content";

interface ChapterState {
    tab: Tab;
    selectedChapterId: string | null;
    setTab: (tab: Tab) => void;
    setSelectedChapterId: (chapterId: string) => void;
    openChapter: (chapterId: string) => void;
}

export const useChapterStore = create<ChapterState>((set) => ({
    tab: "lessons",
    selectedChapterId: null,
    setTab: (tab) => set({ tab }),
    setSelectedChapterId: (chapterId) => set({ selectedChapterId: chapterId }),
    openChapter: (chapterId) =>
        set({
            selectedChapterId: chapterId,
            tab: "content",
        }),
}));
