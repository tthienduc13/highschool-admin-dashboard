import CourseDetailModule from "@/components/modules/course-detail-module";

type Params = Promise<{ id: string }>;

async function CourseDetailProps({ params }: { params: Params }) {
    const { id } = await params;
    return <CourseDetailModule courseCurriculumId={id} />;
}

export default CourseDetailProps;
