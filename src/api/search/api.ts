import axiosServices from "@/lib/axios";
import { Course } from "../course/type";
import { Flashcard, SearchType } from "./type";
import { endpointSearch } from "@/helpers/endpoint";
import { Document } from "../document/type";

type HighlightedFlashcard = {
    flashcardName: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
    };
    flashcardDescription: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
    };
};

type HighlightedSubject = {
    subjectName: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
    };
    subjectDescription: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
    };
};

type HighlightedDocument = {
    documentName: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
    };
    documentDescription: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
    };
};

export type SubjectSearchResponse = (Course & {
    highlightResult: HighlightedSubject;
})[];

export type FlashcardSearchResponse = (Flashcard & {
    highlightResult: HighlightedFlashcard;
})[];

export type DocumentSearchResponse = (Document & {
    highlightResult: HighlightedDocument;
})[];

type GeneralSearchResponse = {
    subjects: (Course & { highlightResult: HighlightedSubject })[];
    flashcards: (Flashcard & { highlightResult: HighlightedFlashcard })[];
    documents: (Document & { highlightResult: HighlightedDocument })[];
};

export const search = async ({
    value,
    type,
}: {
    value: string;
    type?: SearchType;
}): Promise<GeneralSearchResponse> => {
    try {
        const { data } = await axiosServices.get(endpointSearch.SEARCH, {
            params: {
                type: type,
                value: value,
            },
        });

        const result: GeneralSearchResponse = {
            subjects: [],
            flashcards: [],
            documents: [],
        };

        if (type === SearchType.Subject) {
            result.subjects = data;
        } else if (type === SearchType.Flashcard) {
            result.flashcards = data;
        } else if (type === SearchType.Document) {
            result.documents = data;
        } else {
            result.subjects = data.subjects;
            result.flashcards = data.flashcards;
            result.documents = data.documents;
        }

        return result;
    } catch (error) {
        console.error("Error when searching:", error);
        throw error;
    }
};
