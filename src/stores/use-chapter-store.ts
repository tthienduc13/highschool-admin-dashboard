import { create } from "zustand";

export type Tab = "lessons" | "flashcard" | "quiz" | "content";

interface ChapterState {
    isOpenDetail: boolean;
    selectedChapterId: string | null;
    selectedChapterName: string | null;
    setSelectedChapterId: (chapterId: string, chapterName: string) => void;
    openChapter: (chapterId: string, chapterName: string) => void;
    closeChapter: () => void;
}

export const useChapterStore = create<ChapterState>((set) => ({
    isOpenDetail: false,
    selectedChapterId: null,
    selectedChapterName: null,

    setSelectedChapterId: (chapterId, chapterName) =>
        set({
            selectedChapterId: chapterId,
            selectedChapterName: chapterName,
        }),

    openChapter: (chapterId, chapterName) =>
        set({
            selectedChapterId: chapterId,
            selectedChapterName: chapterName,
            isOpenDetail: true,
        }),

    closeChapter: () =>
        set({
            selectedChapterId: null,
            selectedChapterName: null,
            isOpenDetail: false,
        }),
}));
