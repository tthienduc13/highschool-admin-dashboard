import LessonDetailModule from "@/components/modules/lesson-detail";

type Params = Promise<{ lessonId: string }>;

async function CourseDetailProps({ params }: { params: Params }) {
    const { lessonId } = await params;
    return <LessonDetailModule lessonId={lessonId} />;
}

export default CourseDetailProps;
