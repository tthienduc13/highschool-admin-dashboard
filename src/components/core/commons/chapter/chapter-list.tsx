import { Chapter } from "@/api/chapter/type";
import { cn } from "@/lib/utils";
import { useChapterStore } from "@/stores/use-chapter-store";
import { IconBook, IconHistory } from "@tabler/icons-react";

const MAX_COLUMN_COUNT_OPEN = 3;
const MAX_COLUMN_COUNT_CLOSED = 4;

interface ChapterListProps {
    chapters: Chapter[];
    courseId: string;
}

export const ChapterList = ({ chapters }: ChapterListProps) => {
    const isOpenDetail = useChapterStore((s) => s.isOpenDetail);
    const openDetail = useChapterStore((s) => s.openChapter);
    const MAX_COLUMN = isOpenDetail
        ? MAX_COLUMN_COUNT_OPEN
        : MAX_COLUMN_COUNT_CLOSED;
    const semester1Chapters = chapters.filter(
        (chapter) => chapter.semester === 1
    );
    const semester2Chapters = chapters.filter(
        (chapter) => chapter.semester === 2
    );

    return (
        <div className="space-y-8">
            {/* Section for Semester 1 */}
            <div>
                <h2 className="text-xl font-bold mb-4">Semester 1</h2>
                {semester1Chapters.length > 0 ? (
                    <div
                        className={cn(
                            "grid w-full gap-4",
                            `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(
                                semester1Chapters.length,
                                MAX_COLUMN
                            )}`
                        )}
                    >
                        {semester1Chapters.map((chapter) => (
                            <div
                                key={chapter.id}
                                onClick={() =>
                                    openDetail(chapter.id, chapter.chapterName)
                                }
                                className={cn(
                                    "flex w-full transform cursor-pointer flex-col gap-y-4 rounded-xl border-2 bg-background p-4 hover:border-b-blue hover:shadow-lg"
                                )}
                            >
                                <div className="flex flex-1 flex-col">
                                    <h2 className="truncate font-bold">
                                        {chapter.chapterName}
                                    </h2>
                                    {!isOpenDetail && (
                                        <p className="line-clamp-3 text-sm text-muted-foreground">
                                            {chapter.description}
                                        </p>
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "flex  justify-between",
                                        isOpenDetail ? "flex-col" : "flex-row"
                                    )}
                                >
                                    <div className="flex flex-row items-center gap-x-2">
                                        <IconHistory size={16} />
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                chapter.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <IconBook size={16} />
                                        <p className="text-sm text-muted-foreground">
                                            {chapter.numberLesson} lessons
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No chapters available for Semester 1.
                    </p>
                )}
            </div>

            {/* Section for Semester 2 */}
            <div>
                <h2 className="text-xl font-bold mb-4">Semester 2</h2>
                {semester2Chapters.length > 0 ? (
                    <div
                        className={cn(
                            "grid w-full gap-4",
                            `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(
                                semester2Chapters.length,
                                MAX_COLUMN
                            )}`
                        )}
                    >
                        {semester2Chapters.map((chapter) => (
                            <div
                                key={chapter.id}
                                onClick={() =>
                                    openDetail(chapter.id, chapter.chapterName)
                                }
                                className={cn(
                                    "flex w-full transform cursor-pointer flex-col gap-y-4 rounded-xl border-2 bg-background p-4 hover:border-b-blue hover:shadow-lg"
                                )}
                            >
                                <div className="flex flex-1 flex-col">
                                    <h2 className="truncate font-bold">
                                        {chapter.chapterName}
                                    </h2>
                                    {!isOpenDetail && (
                                        <p className="line-clamp-3 text-sm text-muted-foreground">
                                            {chapter.description}
                                        </p>
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "flex  justify-between",
                                        isOpenDetail ? "flex-col" : "flex-row"
                                    )}
                                >
                                    <div className="flex flex-row items-center gap-x-2">
                                        <IconHistory size={16} />
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                chapter.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <IconBook size={16} />
                                        <p className="text-sm text-muted-foreground">
                                            {chapter.numberLesson} lessons
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No chapters available for Semester 2.
                    </p>
                )}
            </div>
        </div>
    );
};
