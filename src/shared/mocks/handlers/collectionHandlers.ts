import {
  CreateCollectionRequest,
  GetCollectionDetailResponse,
  UpdateCollectionRequest,
} from 'entities/collection/types/collection.type';
import { http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

const mockCollections: GetCollectionDetailResponse[] = [
  {
    id: 1,
    title: 'Test Collection',
    description: 'A sample collection',
    thumbnail:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    contents: [
      {
        id: 101,
        title: 'Mock Movie 1',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'movie',
      },
      {
        id: 102,
        title: 'Mock TV Show',
        posterPath: '/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg',
        contentType: 'tv',
      },
      {
        id: 103,
        title: 'Mock TV Show',
        posterPath: null,
        contentType: 'tv',
      },
      {
        id: 104,
        title: 'Mock Movie 1',
        posterPath: '/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg',
        contentType: 'movie',
      },
      {
        id: 105,
        title: 'Mock TV Show',
        posterPath: '/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg',
        contentType: 'tv',
      },
      {
        id: 106,
        title: 'Mock Movie 1',
        posterPath: '/2vHQBX5L4yoExTa55KmGIg2Q5s3.jpg',
        contentType: 'movie',
      },
      {
        id: 107,
        title: 'Mock TV Show',
        posterPath: '/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
        contentType: 'tv',
      },
      {
        id: 108,
        title: 'Mock Movie 1',
        posterPath: '/q0fGCmjLu42MPlSO9OYWpI5w86I.jpg',
        contentType: 'movie',
      },
      {
        id: 109,
        title: 'Mock TV Show',
        posterPath: '/AEgggzRr1vZCLY86MAp93li43z.jpg',
        contentType: 'tv',
      },
      {
        id: 110,
        title: 'Mock Movie 1',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'movie',
      },
      {
        id: 111,
        title: 'Mock TV Show',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'tv',
      },
      {
        id: 112,
        title: 'Mock Movie 1',
        posterPath: '/tObSf1VzzHt9xB0csanFtb3DRjf.jpg',
        contentType: 'movie',
      },
      {
        id: 113,
        title: 'Mock TV Show',
        posterPath: '/7c5VBuCbjZOk7lSfj9sMpmDIaKX.jpg',
        contentType: 'tv',
      },
      {
        id: 114,
        title: 'Mock Movie 1',
        posterPath: '/43c1efKzA1kigNzY0HBzeoXp8LR.jpg',
        contentType: 'movie',
      },
      {
        id: 115,
        title: 'Dora and the Search for Sol Dorado',
        posterPath: '/r3d6u2n7iPoWNsSWwlJJWrDblOH.jpg',
        contentType: 'tv',
      },
      {
        id: 116,
        title: 'Mock Movie 1',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'movie',
      },
      {
        id: 117,
        title: '室町無頼',
        posterPath: '/6U0i0HsSCvhRW4IpGzdead6QRo3.jpg',
        contentType: 'tv',
      },
      {
        id: 118,
        title: 'The Ritual',
        posterPath: '/ktqPs5QyuF8SpKnipvVHb3fwD8d.jpg',
        contentType: 'movie',
      },
      {
        id: 119,
        title: 'Mock TV Show',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'tv',
      },
      {
        id: 120,
        title: 'Mock Movie 1',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'movie',
      },
      {
        id: 121,
        title: 'Mock TV Show',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'tv',
      },
      {
        id: 122,
        title: 'Mock Movie 1',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'movie',
      },
      {
        id: 123,
        title: 'Mock TV Show',
        posterPath: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
        contentType: 'tv',
      },
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
  // 컬렉션 생성
  http.post('/collections', async ({ request }) => {
    const body = (await request.json()) as CreateCollectionRequest;

    const newCollection: GetCollectionDetailResponse = {
      id: nextId++,
      ...body,
      contents: [],
    };

    mockCollections.push(newCollection);

    return createSuccessResponse(undefined, { id: newCollection.id });
  }),

  // 컬렉션 리스트 조회
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

    return createSuccessResponse(undefined, mockCollections[idx]);
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
    const url = new URL(request.url);
    const contentIds = url.searchParams.getAll('contentId').map(Number);

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }

    const newContents = contentIds
      .filter((cid) => !mockCollections[idx].contents.some((c) => c.id === cid))
      .map((cid) => ({
        id: cid,
        title: `Mock Content ${cid}`,
        posterPath: null,
        contentType: cid % 2 === 0 ? ('movie' as const) : ('tv' as const),
      }));

    mockCollections[idx].contents.push(...newContents);

    return createSuccessResponse('콘텐츠 추가 완료');
  }),

  // 콘텐츠 제거
  http.delete('/collections/:id/contents', async ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const contentIds = url.searchParams.getAll('contentId').map(Number);

    const idx = mockCollections.findIndex((c) => c.id === Number(id));
    if (idx === -1) {
      return createErrorResponse(
        404,
        '컬렉션을 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }

    mockCollections[idx].contents = mockCollections[idx].contents.filter(
      (c) => !contentIds.includes(c.id),
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
