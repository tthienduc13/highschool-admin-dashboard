import UnpublishedCourseDetailModule from "@/components/modules/unpublished-course-detail";

type Params = Promise<{ id: string }>;

async function CourseDetailProps({ params }: { params: Params }) {
    const { id } = await params;
    return <UnpublishedCourseDetailModule courseId={id} />;
}

export default CourseDetailProps;
