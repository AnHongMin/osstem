----------------------------------------------------------------------
    CHEditor 5.0
----------------------------------------------------------------------

이미지 전송을 위한 설정:
----------------------------------------------------------------------
1. imageUpload 폴더 안의 config 파일을 열어 저장 경로와 URL을 설정하여 주십시오.
주의: 저장 경로는 서버 상의 전체 경로(pwd)입니다.

2. 저장 경로의 접근 권한을 웹에서 파일을 읽고 쓸 수 있도록 설정하십시오.
----------------------------------------------------------------------

- ASP의 경우 아래 사항을 확인하십시오.

 1. attach 디렉토리는 웹에서 파일을 쓰고, 읽을 수 있도록 퍼미션을 조정하여 주십시오.
 2. 이미지 업로드는 "\program Files\Common Files\System\ado\msado15.dll" 를 이용합니다.
     만약 위 모듈이 레지스트리에 등록되어 있지 않을 경우, regsvr32 명령을 이용하여 등록하여 주십시오.

 보기: regsvr32 "c:\program files\common files\system\ado\msado15.dll"

 ASP의 경우 기본 업로드 크기가 200K로 기본 설정이 되어있습니다.
 아래 과정을 통해 원하는 파일 크기로 재설정할 수 있습니다.

 1. IIS 서비스를 멈춤니다.
 2. 'c:\windows\system32\inetsrv\Metabase.XML' 파일을 간단한 에디터(노트패드와 같은) 열어
     AspMaxRequestEntityAllowed="204800"으로 설정되어 있는 값을 원하는는 크기로 수정합니다.
 3. IIS를 시작합니다.
----------------------------------------------------------------------

구글 지도를 사용하기 위한 설정
----------------------------------------------------------------------
1. http://code.google.com/intl/ko-KR/apis/maps/signup.html 웹 페이지에서
   구글 키를 발급 받습니다. 무료입니다.
2. myeditor.config.useMap = true; // 지도를 사용하기 위한 에디터  설정
3. popup/google_map.html 파일을 열어 1234-ABC로 설정되어 있는 키 값을 발급 받은
   구글 키로 수정합니다.

다음 각 버튼 유무와 옵션 설정입니다.
----------------------------------------------------------------------
설정 예: myeditor.config.option = value;

- 옵션 - 설명 ( 기본값 )

- editorWidth - 에디터 가로 크기 값 ( % | px )
- editorHeight - 에디터 세로 크기 값 ( % | px )
- editorFontSize - 에디터 기본 글꼴 크기 ( 9pt )
- editorFontName - 에디터 기본 글꼴 이름 ( 굴림 )
- editorFontColor - 에디터 기본 글꼴 색 ( #000 )
- editorBgColor - 에디터 기본 배경 색 ( #fff )
- lineHeight - 에디터 기본 문단 간격 ( 1.5 )
- editAreaMargin - 에디터 입력 영력의 마진 값 ( 5px 10px )
- tabIndex - 에디터 입력 영역의 탭 인덱스 값 ( 0 )
- editorPath - 에디터 경로 ( null )
- fullHTMLSource - 완전한 HTML 문서 형태로 소스 편집 ( false )
- linkTarget - 문서에 연결된 외부 link의 target ( _blank )
- showTagPath - 에디터 하단에 현재 선택된 태그의 경로를 표시 ( false )
- imgMaxWidth - 업로드한 이미지의 크기가 이 값 보다 크면 이 크기로 설정 ( 640 )
- imgReSize - 업로드한 이미지의 크기를 재 조정(imgMaxWidth)할 지 결정 ( true )
- includeHostname - 이미지 경로에 호스트 이름을 넣을 지 결정 ( true )
- ieEnterMode - IE의 엔터시 생성되는 줄 바꿈 태그 ( div )
- allowedScript - 내용에 SCRIPT 태그 허용 ( false )
- allowedMaxImgSize - 이미지 전송 크기 제한 ( 0 Bytes ), 0이면 제한 없음

버튼 사용 유무
- useSource - 소스 보기 (true)
- usePreview - 미리 보기 (true)
- usePrint - 인쇄 (true)
- useNewDocument - 새 문서 (true)
- useUndo - 되돌리기 (true)
- useRedo - 실행취소 (true)
- useCopy - 복사 (true)
- useCut - 잘라내기 (true)
- usePaste - 붙이기 (true)
- usePasteFromWord - MS 워드 붙이기 (true)
- useSelectAll - 전체 선택 (true)
- useBold - 굵게 (true)
- useUnderline - 밑줄 (true)
- useStrikethrough - 취소선 (true)
- useItalic - 기울임 (true)
- useSuperscript - 윗 첨자 (false)
- useSubscript - 아래 첨자 (false)
- useJustifyLeft - 왼쪽 정렬 (true)
- useJustifyCenter - 가운데 정렬 (true)
- useJustifyRight - 오른쪽 정렬 (true)
- useJustifyFull - 양쪽 정렬 (true)
- useOrderedList - 문단 번호 (true)
- useUnOrderedList - 글 머리표 (true)
- useOutdent - 왼쪽 여백 줄이기 (true)
- useIndent - 왼쪽 여백 늘이기 (true)
- useFontName - 글꼴 (true)
- useParagraph - 스타일 (true)
- useFontSize - 글꼴 크기 (true)
- useBackColor - 하일라이트 (true)
- useForeColor - 글꼴 색 (true)
- useRemoveFormat - 서식 지우기 (true)
- useClearTag - HTML 태그 지우기 (true)
- useSymbol - 심볼 문자 (true)
- useLink - 하이퍼링크 (true)
- useUnLink - 링크 취소 (true)
- useFlash - 플래쉬 (true)
- useMedia - 미디어 (true)
- useImage - 이미지 넣기 (true)
- useImageUrl - 웹 이미지 넣기 (true)
- useSmileyIcon - 이모션 아이콘 (true)
- useHR - 가로선 (true)
- useTable - 테이블 (true)
- useModifyTable - 테이블 수정 (true)
- useMap - 구글 지도 (false)
- useFullScreen - 전체 화면 (true)
- usePageBreak - 인쇄 나눔 선 (false)

감사합니다.
