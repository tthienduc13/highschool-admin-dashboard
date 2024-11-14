import NewsDetailModule from "@/components/modules/news-detail-module";

type Params = Promise<{ id: string }>;

async function NewsDetailProps({ params }: { params: Params }) {
    const { id } = await params;
    return <NewsDetailModule slug={id} />;
}

export default NewsDetailProps;