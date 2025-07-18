import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ErrorCode } from 'shared/types/CustomErrorResponse';
import { Button, InputText, Title } from 'shared/ui';
import { toast } from 'sonner';
import { useCreateCollection } from '../hooks/useCreateCollection';
import {
  CreateCollectionFormValues,
  createCollectionFormSchema,
} from '../validation/collectionFormSchema';
import {
  CollectionFormBody,
  CollectionFormHeader,
  FormWrapper,
  SubmitButtonWrapper,
} from './CollectionForm.style';

export default function CreateCollectionForm() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateCollectionFormValues>({
    resolver: zodResolver(createCollectionFormSchema),
  });

  const { mutate, isPending } = useCreateCollection();
  const navigate = useNavigate();

  const onSubmit = (values: CreateCollectionFormValues) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);

    if (values.thumbnail?.[0]) {
      formData.append('thumbnail', values.thumbnail[0]);
    }

    mutate(formData, {
      onSuccess: (res) => navigate(`/collection/${res.id}`),
      onError: (error) => {
        const res = error.response?.data;

        if (!res || !res.error) {
          toast.error('문제가 발생했어요. 잠시 후 다시 시도해주세요.');
          return;
        }

        switch (res.error) {
          case ErrorCode.USER_NOT_FOUND:
            toast.error('로그인이 필요해요.');
            navigate('/login');
            break;
          case ErrorCode.S3_UPLOAD_FAIL:
            toast.error('이미지 업로드에 실패했어요. 다시 시도해주세요.');
            break;
          default:
            toast.error(res.message || '문제가 발생했어요.');
            break;
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <CollectionFormHeader>
          <Title as="h1" size="large">
            컬렉션 생성
          </Title>
          <p>
            나만의 무드를 담은 컬렉션을 만들어보세요. 컬렉션이 당신만의 감정,
            분위기, 이야기로 채워질 거예요.
          </p>
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
          />

          <SubmitButtonWrapper>
            <Button
              type="submit"
              buttonSize="large"
              fontSize="small"
              scheme="primary"
              borderRadius="medium"
              disabled={isPending}
            >
              컬렉션 만들기
            </Button>
          </SubmitButtonWrapper>
        </CollectionFormBody>
      </FormWrapper>
    </form>
  );
}
