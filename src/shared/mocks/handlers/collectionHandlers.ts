import { GetCollectionDetailResponse } from 'entities/collection/types/collection.type';
import { http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';
import { mockContents } from './contentsHandlers';

const mockCollections: GetCollectionDetailResponse[] = [
  {
    id: 1,
    title: 'Test Collection',
    description: 'A sample collection',
    thumbnail:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    contents: [
      mockContents[0],
      mockContents[1],
      mockContents[2],
      mockContents[3],
      mockContents[4],
      mockContents[5],
      mockContents[6],
    ],
  },
  {
    id: 2,
    title: 'Test Collection',
    description: 'A sample collection',
    thumbnail:
      'https://images.unsplash.com/photo-1742679697291-affd3365ebe4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    contents: [],
  },
];

let nextId = 3;

export const collectionHandlers = [
  http.post('/collections', async ({ request }) => {
    const formData = await request.formData();
    const body = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      thumbnail: formData.get('thumbnail') as string,
    };

    const newCollection: GetCollectionDetailResponse = {
      id: nextId++,
      ...body,
      contents: [],
    };

    mockCollections.push(newCollection);

    return createSuccessResponse(undefined, { id: newCollection.id });
  }),

  http.get('/collections', () => {
    const summaryList = mockCollections.map(
      ({ id, title, description, thumbnail, contents }) => ({
        id,
        title,
        description,
        thumbnail,
        contents: contents.map((content) => content.id),
      }),
    );

    return createSuccessResponse(undefined, {
      collections: summaryList,
      count: summaryList.length,
    });
  }),

  http.get('/collections/:id', ({ params }) => {
    const { id } = params;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'COLLECTION_NOT_FOUND',
      );
    }

    return createSuccessResponse(undefined, mockCollections[idx]);
  }),

  http.patch('/collections/:id', async ({ params, request }) => {
    const { id } = params;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'COLLECTION_NOT_FOUND',
      );
    }
    const formData = await request.formData();
    const patchData: Partial<GetCollectionDetailResponse> = {};

    if (formData.get('title') !== null) {
      patchData.title = formData.get('title') as string;
    }
    if (formData.get('description') !== null) {
      patchData.description = formData.get('description') as string;
    }
    if (formData.get('thumbnail') !== null) {
      patchData.thumbnail = formData.get('thumbnail') as string;
    }

    mockCollections[idx] = {
      ...mockCollections[idx],
      ...patchData,
    };

    return createSuccessResponse('컬렉션 수정 완료');
  }),

  http.post('/collections/:collectionId/contents/:contentId', async (req) => {
    const { collectionId, contentId } = req.params;

    const target = mockCollections.find((c) => c.id === Number(collectionId));
    if (!target) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'COLLECTION_NOT_FOUND',
      );
    }

    const content = mockContents.find((c) => c.id === Number(contentId));
    if (!content) {
      return createErrorResponse(
        404,
        '콘텐츠를 찾을 수 없습니다.',
        'CONTENT_NOT_FOUND',
      );
    }

    const alreadyExists = target.contents.some((c) => c.id === content.id);
    if (!alreadyExists) {
      target.contents.push(content);
    }

    return createSuccessResponse('콘텐츠가 컬렉션에 추가되었습니다.');
  }),

  http.delete('/collections/:id/contents', async ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const contentIds = url.searchParams.getAll('contentId').map(Number);

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'COLLECTION_NOT_FOUND',
      );
    }

    mockCollections[idx].contents = mockCollections[idx].contents.filter(
      (c) => !contentIds.includes(c.id),
    );

    return createSuccessResponse('콘텐츠 삭제 완료');
  }),

  http.delete('/collections/:id', ({ params }) => {
    const { id } = params;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'COLLECTION_NOT_FOUND',
      );
    }
    mockCollections.splice(idx, 1);

    return createSuccessResponse('컬렉션 삭제 완료');
  }),
];
