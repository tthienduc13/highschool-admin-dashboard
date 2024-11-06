import { LessonDetail as LessonDetailType } from "@/api/lesson/type";
import { Player } from "@/components/core/commons/video-player";
import VideoUploader from "@/components/core/commons/video-uploader";
import { Skeleton } from "@/components/ui/skeleton";

interface LessonDetailProps {
    isLoading: boolean;
    lessonDetail: LessonDetailType;
}

export const LessonDetail = ({
    isLoading,
    lessonDetail,
}: LessonDetailProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-[400px] col-span-2 w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }
    if (!lessonDetail) {
        return;
    }
    return (
        <div className="rounded-xl w-full border p-4 bg-background shadow flex flex-col gap-10">
            <h2 className="text-2xl font-bold">Information</h2>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Lesson video</h2>

                {lessonDetail.videoUrl ? (
                    <Player videoUrl={lessonDetail.videoUrl} />
                ) : (
                    <VideoUploader lessonId={lessonDetail.id} />
                )}
            </div>
        </div>
    );
};
