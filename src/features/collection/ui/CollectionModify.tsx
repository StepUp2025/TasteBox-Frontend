import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, InputText, Modal, Title } from 'shared/ui';
import Loading from 'shared/ui/Loading/Loading';
import { toast } from 'sonner';
import { useDeleteCollection } from '../hooks/useDeleteCollection';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';
import { useUpdateCollection } from '../hooks/useUpdateCollection';
import {
  EditCollectionFormValues,
  editCollectionFormSchema,
} from '../validation/collectionFormSchema';
import { ModalText } from './CollectionContentsEditor.style';
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

  const [modalOpen, setModalOpen] = useState(false);
  const handleToggle = () => setModalOpen((prev) => !prev);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditCollectionFormValues>({
    resolver: zodResolver(editCollectionFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
      });
    }
  }, [data, reset]);

  if (!data) return <Loading />;

  const watchedTitle = watch('title');
  const watchedDescription = watch('description');
  const watchedThumbnail = watch('thumbnail');

  const isTitleChanged = watchedTitle !== data.title;
  const isDescChanged = watchedDescription !== data.description;
  const isThumbnailChanged = !!watchedThumbnail?.[0];
  const isAnythingChanged =
    isTitleChanged || isDescChanged || isThumbnailChanged;

  const onSubmit = (values: EditCollectionFormValues) => {
    if (!isAnythingChanged) {
      toast.message('변경된 내용이 없습니다.');
      return;
    }

    const formData = new FormData();

    if (isTitleChanged && values.title) {
      formData.append('title', values.title);
    }

    if (isDescChanged && values.description !== undefined) {
      formData.append('description', values.description ?? '');
    }

    if (isThumbnailChanged && values.thumbnail?.[0]) {
      formData.append('thumbnail', values.thumbnail[0]);
    }

    console.log(formData);
    update(formData, {
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

          <Modal
            open={modalOpen}
            title="컬렉션 삭제"
            onClose={handleToggle}
            confirmText="삭제"
            onConfirm={onDelete}
          >
            <ModalText>컬렉션을 정말 삭제하시겠어요?</ModalText>
          </Modal>

          <SubmitButtonWrapper>
            <Button
              type="button"
              buttonSize="large"
              fontSize="small"
              scheme="secondary"
              borderRadius="medium"
              onClick={handleToggle}
            >
              삭제하기
            </Button>

            <Button
              type="submit"
              buttonSize="large"
              fontSize="small"
              scheme="primary"
              borderRadius="medium"
              disabled={isPending || !isAnythingChanged}
            >
              컬렉션 수정하기
            </Button>
          </SubmitButtonWrapper>
        </CollectionFormBody>
      </FormWrapper>
    </form>
  );
}
