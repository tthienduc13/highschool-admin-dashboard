export type News = {
    newsTagId: string;
    newName: string;
    content: string;
    contentHtml: string;
    image: File;
    location: string;
};

export type NewsDetail = {
    id: string;
    newName: string;
    content: string;
    contentHtml: string;
    image: string;
    slug: string;
    view: number;
    location: string;
    newsTagId: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    hot: boolean;
    isDeleted: boolean;
    newsTagName: string;
    author?: Author;
}

export type Author = {
    authorId: string;
    authorName: string;
    authorImage: string;
}