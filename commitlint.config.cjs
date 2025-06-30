// commitlint.config.cjs
// 이 설정은 팀 커밋 메시지 컨벤션을 강제합니다.
// - 타입은 대문자(PascalCase)만 허용
// - 제목 첫 글자는 대문자 또는 한글만 허용
// - 제목 끝에 마침표 금지
// - 제목(헤더) 최대 100자까지 허용
// - 타입/제목 필수, 예시: Feat: 로그인 기능 추가

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 타입(Feat, Fix 등)은 PascalCase(대문자 시작)만 허용
    'type-case': [2, 'always', 'pascal-case'],
    // 허용하는 타입 목록 (대문자, ! 포함)
    'type-enum': [
      2,
      'always',
      [
        'Feat',
        'Fix',
        'Docs',
        'Style',
        'Refactor',
        'Test',
        'Chore',
        'Design',
        'Comment',
        'Rename',
        'Remove',
        '!BREAKING CHANGE',
        '!HOTFIX',
      ],
    ],
    // 제목(Subject)은 대소문자/한글 등 자유롭게 허용
    'subject-case': [0],
    // 제목 끝에 마침표(.) 금지
    'subject-full-stop': [2, 'never', '.'],
    // 기본 max-length 룰 비활성화
    'header-max-length': [0],
    // function-rules 플러그인으로 헤더 길이 체크 (한글/영어/이모지 100자 기준, 한글 메시지)
    'function-rules/header-max-length': [
      2,
      'always',
      (parsed) => {
        if ([...(parsed.header || '')].length <= 100) {
          return [true];
        }
        return [
          false,
          '커밋 제목(헤더)이 너무 깁니다. 100자 이내로 작성해 주세요.',
        ];
      },
    ],
    // 커스텀 룰 활성화
    'header-match-team-pattern': [2, 'always'],
    'subject-first-char-case': [2, 'always'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\(([^)]+)\))?:\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        // 타입/제목 필수, 없으면 에러 메시지 출력
        'header-match-team-pattern': (parsed) => {
          const { type, subject } = parsed;
          if (type && subject) {
            return [true];
          }
          return [
            false,
            '커밋 메시지가 올바른 형식이 아닙니다. 예: Feat: 로그인 기능 추가',
          ];
        },
        // 제목 첫 글자는 대문자 또는 한글만 허용
        'subject-first-char-case': (parsed) => {
          const { subject } = parsed;
          if (!subject) return [true];
          const firstChar = subject.trim().charAt(0);
          if (
            (firstChar >= 'A' && firstChar <= 'Z') ||
            /[가-힣]/.test(firstChar)
          ) {
            return [true];
          }
          return [false, '제목의 첫 글자는 대문자 또는 한글이어야 합니다.'];
        },
      },
    },
    // function-rules 플러그인 등록
    'commitlint-plugin-function-rules',
  ],
};
