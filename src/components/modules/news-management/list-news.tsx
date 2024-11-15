import { Pagination as PaginationType } from '@/api/common/type'
import { NewsDetail } from '@/api/news/news.type'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ListNewsProps {
    listNews: PaginationType<NewsDetail>;
    page: number;
    setPage: (page: number) => void;
}

export const ListNews = ({ listNews, page, setPage }: ListNewsProps) => {
    const router = useRouter();

    return (
        <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {listNews.data.map((post, index) => (
                    <div
                        key={`${post.id}-${index}`}
                        className="group bg-white rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="aspect-[16/9] relative overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.newName}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                            />
                        </div>

                        <div className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary">
                                {post.newName}
                            </h2>

                            <p className="text-muted-foreground line-clamp-3 h-[12vh]">
                                {post.content}
                            </p>

                            <Button
                                variant="link"
                                className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700"
                                onClick={() =>
                                    router.push(`/news-management/${post.slug}`)
                                }
                            >
                                Read more
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
                        </PaginationItem>
                        <PaginationItem>
                            {Array.from({ length: (listNews.totalPages > 3 ? 3 : listNews.totalPages) }, (_, i) => (
                                <PaginationLink
                                    key={i} href="#"
                                    isActive={page === i + 1}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            ))}
                        </PaginationItem>
                        {
                            (listNews.totalPages > 3) && (
                                <>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            key={listNews.totalPages} href="#"
                                            isActive={page === listNews.totalPages}
                                            onClick={() => setPage(listNews.totalPages)}
                                        >
                                            {listNews.totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )
                        }

                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => setPage(page + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}

export default ListNews