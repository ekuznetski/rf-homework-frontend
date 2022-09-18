import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useEditModal() {
  const key = ['useEditModal'];
  const client = useQueryClient();
  const { data } = useQuery(key, () => false, {
    enabled: false,
    initialData: false,
    staleTime: Infinity,
  });

  const openModal = (data) => {
    client.setQueryData(['useEditModal'], data);
  };
  const closeModal = () => {
    client.setQueryData(['useEditModal'], null);
  };
  return { data, openModal, closeModal };
}
