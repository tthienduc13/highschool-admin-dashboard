import UniversityMajorModule from "@/components/modules/university-major";

type Params = Promise<{ id: string }>;

async function UniversityMajorProps({ params }: { params: Params }) {
    const { id } = await params;
    return <UniversityMajorModule uniCode={id} />;
}

export default UniversityMajorProps;
