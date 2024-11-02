import { CreateTag, GetAllTag } from './tag.api';
import { useMutation } from '@tanstack/react-query';

export const useTagQuery = ({
  pageSize,
  pageNumber,
  search
}: {
  pageSize: number;
  pageNumber: number;
  search?: string;
}) => {
  const queryKey = ['tags', pageSize, pageNumber, search];
  const queryFn = async () => {
    return GetAllTag({
      pageSize: pageSize ?? 1,
      pageNumber: pageNumber ?? 10,
      search
    });
  };

  return { queryKey, queryFn };
};

export const useTagCreateMutation = () => {
  return useMutation({
    mutationFn: ({ newTagName }: { newTagName: string }) =>
      CreateTag({ newTagName }),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log('error', error);
    }
  });
};
