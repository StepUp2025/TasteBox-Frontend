import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateCollectionRequest } from 'entities/collection';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, InputText, Title } from 'shared/ui';
import Loading from 'shared/ui/Loading/Loading';
import { toast } from 'sonner';
import { useDeleteCollection } from '../hooks/useDeleteCollection';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';
import { useUpdateCollection } from '../hooks/useUpdateCollection';
import {
  EditCollectionFormValues,
  editCollectionFormSchema,
} from '../validation/collectionFormSchema';
import {
  CollectionFormBody,
  CollectionFormHeader,
  FormWrapper,
  SubmitButtonWrapper,
} from './CollectionForm.style';

export default function EditCollectionForm() {
  const { id } = useParams();
  const collectionId = Number(id);
  const { data } = useGetCollectionDetail(collectionId);
  const { mutate: update, isPending } = useUpdateCollection(collectionId);
  const { mutate: deleteMutate } = useDeleteCollection();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<EditCollectionFormValues>({
    resolver: zodResolver(editCollectionFormSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
      });
    }
  }, [data, reset]);

  const watchedTitle = watch('title');
  const watchedDescription = watch('description');
  const watchedThumbnail = watch('thumbnail');

  if (!data) return <Loading />;

  const onSubmit = (values: EditCollectionFormValues) => {
    const isTitleChanged = watchedTitle !== data.title;
    const isDescChanged = watchedDescription !== data.description;
    const isThumbnailChanged = !!watchedThumbnail?.[0];

    if (!isTitleChanged && !isDescChanged && !isThumbnailChanged) {
      toast.message('변경된 내용이 없습니다.');
      return;
    }

    const body: Partial<UpdateCollectionRequest> = {};
    if (values.title !== data.title) body.title = values.title;
    if (values.description !== data.description)
      body.description = values.description;
    if (values.thumbnail?.[0]) body.thumbnail = values.thumbnail[0];

    console.log(body);
    update(body, {
      onSuccess: () => navigate(`/collection/${collectionId}`),
    });
  };

  const onDelete = () => {
    deleteMutate(collectionId, {
      onSuccess: () => {
        toast.success('컬렉션이 삭제되었습니다.');
        navigate('/collection');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <CollectionFormHeader>
          <Title as="h1" size="large">
            컬렉션 수정
          </Title>
        </CollectionFormHeader>

        <CollectionFormBody>
          <InputText
            label="제목"
            type="text"
            required
            placeholder="제목을 입력해주세요"
            {...register('title')}
            error={errors.title?.message}
          />

          <InputText
            label="설명"
            type="textarea"
            required
            placeholder="설명을 입력해주세요"
            {...register('description')}
            error={errors.description?.message}
          />

          <InputText
            label="컬렉션 썸네일"
            type="file"
            name="thumbnail"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setValue('thumbnail', files);
                trigger('thumbnail');
              }
            }}
            error={errors.thumbnail?.message as string | undefined}
            previewImageUrl={data.thumbnail ?? ''}
          />

          <SubmitButtonWrapper>
            <Button
              type="button"
              buttonSize="large"
              fontSize="small"
              scheme="secondary"
              borderRadius="medium"
              onClick={onDelete}
            >
              삭제하기
            </Button>

            <Button
              type="submit"
              buttonSize="large"
              fontSize="small"
              scheme="primary"
              borderRadius="medium"
              disabled={isPending || !isDirty}
            >
              컬렉션 수정하기
            </Button>
          </SubmitButtonWrapper>
        </CollectionFormBody>
      </FormWrapper>
    </form>
  );
}
