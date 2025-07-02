import {
  CreateCollectionRequest,
  GetCollectionDetailResponse,
  ModifyContentsRequest,
  UpdateCollectionRequest,
} from 'entities/collection/types/collection.type';
import { http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

const mockCollections: GetCollectionDetailResponse[] = [
  {
    id: 1,
    title: 'Test Collection',
    description: 'A sample collection',
    thumbnail: null,
    contents: [
      {
        id: 101,
        title: 'Mock Movie 1',
        posterPath: '/images/sample1.jpg',
        contentType: 'movie',
      },
      {
        id: 102,
        title: 'Mock TV Show',
        posterPath: '/images/sample2.jpg',
        contentType: 'tv',
      },
    ],
  },
];

let nextId = 2;

export const collectionHandlers = [
  // 컬렉션 생성
  http.post('/collections', async ({ request }) => {
    const body = (await request.json()) as CreateCollectionRequest;
    const { title, description, thumbnail } = body;

    const newCollection: GetCollectionDetailResponse = {
      id: nextId++,
      title,
      description,
      thumbnail,
      contents: [],
    };

    mockCollections.push(newCollection);

    return createSuccessResponse(
      '컬렉션이 생성되었습니다.',
      { id: newCollection.id },
      201,
    );
  }),

  // 컬렉션 리스트 조회
  http.get('/collections', () => {
    const summaryList = mockCollections.map(
      ({ id, title, description, thumbnail }) => ({
        id,
        title,
        description,
        thumbnail,
      }),
    );

    return createSuccessResponse('컬렉션 목록 조회 성공', {
      collections: summaryList,
      count: summaryList.length,
    });
  }),

  // 컬렉션 상세 조회
  http.get('/collections/:id', ({ params }) => {
    const { id } = params;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }

    return createSuccessResponse('컬렉션 상세 조회 성공', mockCollections[idx]);
  }),

  // 컬렉션 수정
  http.patch('/collections/:id', async ({ params, request }) => {
    const { id } = params;
    const patchData = (await request.json()) as UpdateCollectionRequest;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }

    mockCollections[idx] = { ...mockCollections[idx], ...patchData };

    return createSuccessResponse('컬렉션 수정 완료');
  }),

  // 6. 콘텐츠 추가
  http.post('/collections/:id/contents', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as ModifyContentsRequest;
    const { contents } = body;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }

    const newContents = contents
      .filter(
        (item) => !mockCollections[idx].contents.some((c) => c.id === item.id),
      )
      .map((item) => ({
        ...item,
        title: `Mock Title ${item.id}`,
        posterPath: `/images/content-${item.id}.jpg`,
      }));

    mockCollections[idx].contents.push(...newContents);

    return createSuccessResponse('콘텐츠 추가 완료');
  }),

  // 콘텐츠 제거
  http.post('/collections/:id/contents', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as ModifyContentsRequest;
    const { contents } = body;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }

    const removeIds = new Set(contents.map((c) => c.id));
    mockCollections[idx].contents = mockCollections[idx].contents.filter(
      (item) => !removeIds.has(item.id),
    );

    return createSuccessResponse('콘텐츠 삭제 완료');
  }),

  // 컬렉션 삭제
  http.delete('/collections/:id', ({ params }) => {
    const { id } = params;

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }
    mockCollections.splice(idx, 1);

    return createSuccessResponse('컬렉션 삭제 완료');
  }),
];
