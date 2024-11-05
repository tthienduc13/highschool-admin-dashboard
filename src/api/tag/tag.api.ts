
import axiosServices from '@/lib/axios';
import { Metadata, Pagination } from '../common/type';
import { Tag } from './tag.type';
import { endPointTag } from '@/helpers/endpoint';

export const GetAllTag = async ({
  pageSize,
  pageNumber,
  search
}: {
  pageSize: number;
  pageNumber: number;
  search?: string;
}): Promise<Pagination<Tag>> => {
  try {
    const response = await axiosServices.get(endPointTag.GET_ALL_TAG, {
      params: { pageSize, pageNumber, search }
    });

    const paginationHeader = response.headers['x-pagination'];
    const metadata: Metadata = JSON.parse(paginationHeader || '{}');

    return {
      data: response.data,
      currentPage: metadata.CurrentPage,
      pageSize: metadata.PageSize,
      totalCount: metadata.TotalCount,
      totalPages: metadata.TotalPages
    };
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export const CreateTag = async ({ newTagName }: { newTagName: string }) => {
  try {
    const response = await axiosServices.post(endPointTag.CREATE_TAG, {
      newTagName
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};
