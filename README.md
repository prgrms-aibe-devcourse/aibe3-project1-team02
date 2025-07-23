# ✈️ T.A.T

> Team2 넥스트코드 |
> 유승인 고영서 김정호 손세환 노현정 홍석환

**넥스트코드의 여행 계획 추천 플랫폼 T.A.T**을 통해, **계획적이고 잊지 못할 여행**을 만들어보세요!🚀
>
 <br>


| 유승인 (팀장)                                  | 고영서                               | 김정호                                 | 손세환                                           | 노현정                                  | 홍석환                                  |
| ---------------------------------------- | ------------------------------------ | -------------------------------------- | ------------------------------------------------ | -------------------------------------- | -------------------------------------- |
| ![profile](https://avatars.githubusercontent.com/u/144124353?v=4) | ![profile](https://avatars.githubusercontent.com/u/208669574?v=4) |![profile](https://avatars.githubusercontent.com/u/82808715?v=4)|![profile](https://avatars.githubusercontent.com/u/64208154?v=4) | ![profile](https://avatars.githubusercontent.com/u/183670866?v=4) | ![profile](https://avatars.githubusercontent.com/u/156057623?v=4) |
| FE, BE                                     |  FE, BE                                  |  FE, BE                                     |  FE, BE                                              |  FE, BE                                |  FE, BE                               |
| [@seung-in-Yoo](https://github.com/seung-in-Yoo) |[@luaerix](https://github.com/luaerix)|[@Unoguna](https://github.com/Unoguna)  | [@sonsehwan](https://github.com/Bsbd0205) |[@Bsbd0205](https://github.com/sonsehwan) |[@SeokHwan13](https://github.com/SeokHwan13) |


## 📱 소개

> T.A.T (사용자를 위한 맞춤형 여행 계획 추천 플랫폼) 

넥스트코드의 여행 계획 추천 플랫폼 T.A.T는
여행자들의 “여행지 탐색 → AI 기반 여행 일정 생성 및 관리 → 생생한 후기와 여행 커뮤니티”의 전 과정을
한 곳에서 경험할 수 있도록 만든, 맞춤형 종합 여행 서비스입니다.

- 여행지 검색/탐색

- AI 추천 여행 일정 생성

- 여행지별 상세 정보(관광명소/패키지/후기 연동)

- AI가 생성한 일정을 직접 수정 및 재추천

- 여행후기/질문/동행 등 커뮤니티

- 내 여행 계획 관리(AI 기반 직접 생성·여행지 페이지 내 패키지 예약 모두 지원)

- 로그인/회원가입(이메일/구글/카카오) 

여행을 처음 준비하는 사용자부터, 경험 많은 여행자까지
누구나 쉽고, 똑똑하게, 그리고 원하는 대로 여행을 설계할 수 있습니다.

### 🙌 T.A.T 배포 URL: [배포 URL 바로가기](https://aibe3-project1-team02-nextcode.vercel.app/)

<br>

## 📆 프로젝트 기간
- 전체 기간: `2025.07.14 - 2025.07.22`
- 개발 기간: `2025.07.16 - 2025.07.22`

<br>

## 🔎 기술 스택

| Category             | Stack                                                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework              | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)                                                           |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                                                                                                                   |
| Styling              | ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                                                                                                               |
| Data Fetching        | ![Fetch API](https://img.shields.io/badge/Fetch_API-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)                                             |                                                                                                                 |
| Package Manager      | ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                          |
| Formatting & Linting | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                                                         |
| Version Control      | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                                                                         |
| Cloud/Deployment     | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                |
| DB/Auth Backend      | ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)                                                                                                                         |

<br>


## 👀 주요 서비스 흐름 & 기능
### 1. 메인페이지 & 여행지 검색
상단 검색창에서 여행지명을 입력하면
해당 여행지의 상세페이지로 빠르게 이동할 수 있습니다.

인기 여행지 리스트/카드 UI가 제공됩니다.
(카드 내 후기수, 평균평점, 주요 테마, 여행가격 등 표시)

개발자 GitHub, Notion 등 외부 사이트로 연결되는 링크도 제공됩니다.

### 2. 여행지 리스트 & 상세 페이지
여행지 페이지는 사용자에게 다양한 여행지 정보를 제공하고, 여행 계획 및 상품 예약의 출발점 역할을 합니다. 검색부터 상세정보 확인, 후기 작성, 패키지 상품 탐색까지 여행과 관련된 전반적인 기능을 담고 있습니다.

**1. 여행지 목록 카드 UI로 나열**

총 6개의 여행지를 대표 이미지, 테마 태그, 여행 가격, 후기, 평점 등 간단한 정보를 직관적으로 보여주고 여행지별 대륙/국내 필터링으로 원하는 곳의 정보만 찾아볼 수 있습니다.

**2. 여행지 세부 페이지**

세부 페이지에서는 목록 카드에서 본 간단한 정보들을 개요/관광명소/후기/패키지 탭으로 자세히 볼 수 있게 만들었습니다.

**3. 세부 페이지에서 버튼 구현**

개요에서 여행 버튼 세우기를 누르시면 여행계획 페이지로 후기에서 후기작성을 누르시면 글쓰기 페이지로 패키지에서 예약하기를 누르시면 내 여행계획 페이지에 패키지 여행 정보를 담으실 수 있습니다.

### 3. AI 맞춤 여행 일정 생성
여행 계획 페이지는 사용자가 여행에 필요한 기본 정보를 입력하면, AI가 자동으로 맞춤형 여행 일정을 추천해 주는 서비스의 핵심 기능입니다. <br>
사용자는 복잡한 검색이나 일정 조율 없이, 몇 번의 클릭만으로 나만의 여행 일정을 손쉽게 생성할 수 있습니다.

**1. 여행 정보 입력**

여행 희망지, 여행 인원, 예산, 여행 기간, 관심사 등 여행과 관련된 다양한 정보를 입력할 수 있습니다.

**2. AI 기반 여행 일정 자동 생성**

입력된 정보를 바탕으로 AI가 최적의 여행 일정을 자동으로 설계해줍니다. 일정에는 추천 관광지, 체험, 식사 등 다양한 활동이 포함됩니다.

**3. 일정 수정 및 개인화**

AI가 제안한 기본 일정을 사용자가 직접 자유롭게 편집할 수 있습니다.

**4. 일정의 순서 변경, 일정 추가/삭제**

관광지, 식사, 숙박 등 상세 일정을 사용자가 직접 수정 가능합니다.

### 4. 여행 계획 저장 및 내 여행계획 관리
여행계획 페이지에서 생성한 일정은 확정/수정 후 “여행 계획 저장하기” 클릭하여 내 여행 계획 페이지에 사용자에 따라 해당 사용자가 저장한 여행만 볼 수 있습니다.

내 여행 계획 페이지에서
▸ 직접 만든 여행 일정
▸ 패키지 여행 예약내역
을 한 눈에 관리하고,

저장한 여행에 대해 계획별로 상세보기/수정을 통해 

▸ 일정/인원/예산/관심 테마 정보 수정

▸ 정보가 바뀔 때마다 AI로 재추천 가능
(예: 일정이나 인원, 예산 변경 → “AI 일정 다시 생성하기”)

▸ AI가 추천해준 일정 변경 가능

▸ 완료된 계획만 세부 페이지에 후기작성 버튼 생성

### 5. 여행 후기 & 커뮤니티
여행 후기, 질문/답변, 여행팁, 동행 구인 등
다양한 주제로 커뮤니티 글쓰기 지원합니다.

각 카테고리별로 분리하여 검색/필터/정렬 지원합니다.

글 상세페이지에서 댓글, 대댓글, 좋아요 기능이 가능하고 여행지 후기에는 실제 사진 및 동영상을 첨부하여 더욱 풍성한 후기 페이지를 즐길 수 있습니다.

후기/질문/동행 등 게시글이 여행지 상세와 연동되어, 여행지별 실제 후기 수, 후기 평점 등이 자동으로 제공됩니다.

### 6. 회원가입/로그인 & 프로필 관리
이메일 기반 회원가입이 가능합니다. (필수 정보: 이름, 이메일, 비밀번호, 휴대폰 번호 / 프로필 이미지는 선택 사항입니다.)

구글 및 카카오 계정을 통한 소셜 로그인도 지원합니다.

로그인 후에는 모든 서비스를 이용할 수 있으며, 화면 우측 상단에 가입한 이메일과 로그아웃 버튼이 표시됩니다.

비밀번호를 잊은 경우, 가입한 이메일을 입력하면 비밀번호 재설정 링크를 받아 새로운 비밀번호로 변경할 수 있습니다.

## 📃 페이지별 상세 안내
### 🏠 메인페이지
**여행지 검색**

- 검색창에서 여행지명 입력 → 상세페이지 이동

<img width="500" height="270" alt="image" src="https://github.com/user-attachments/assets/a136014a-5b57-400a-861b-81ae632792d9" />

<br><br>

**인기 여행지(후기수/평점/가격 등)**

- 인기여행지 클릭 -> 해당 여행지 상세페이지 이동

<img width="500" height="270" alt="image" src="https://github.com/user-attachments/assets/4916cfbb-18ec-4940-9fab-73b77898f32e" />  

<br><br>

**기타 기능**

- 개발자 github/notion
- 여행계획 바로가기
- 서비스

<img width="500" height="270" alt="image" src="https://github.com/user-attachments/assets/8a1484b9-0112-4131-b36f-30e207e5bba1" />  

<br><br>

### 🏝️ 여행지 목록/상세
**대륙/국가/테마/가격 등 필터**

<img width="500" height="270" alt="UI목록카드" src="https://github.com/user-attachments/assets/73406a86-b6bb-40b4-9776-235c0b7eec6e" />


**여행지별 관광명소, 패키지, 후기(연동)**

<img width="500" height="270" alt="여행지세부페이지1" src="https://github.com/user-attachments/assets/d8b6f037-6a01-4382-8842-4fd59186a83c" />

<img width="500" height="270" alt="여행지세부페이지2" src="https://github.com/user-attachments/assets/10f30916-1166-4267-bbf7-70c2c3744a20" />


**여행지별 실제 커뮤니티 후기수, 평점 자동 표시**

<img width="500" height="270" alt="후기평점" src="https://github.com/user-attachments/assets/989d74ce-6f82-4961-811e-9b3fe6abda43" />



### 🗺️ 여행 계획 생성/수정 (AI 추천)
**여행지, 날짜, 인원, 예산, 테마 선택**

<img width="500" height="270" alt="리드미1" src="https://github.com/user-attachments/assets/6eb5f631-7d73-473c-9c8d-75f68c5102dc" /><img width="500" height="270" alt="리드미2" src="https://github.com/user-attachments/assets/441b4912-241f-4311-a842-02bc4fd818d6" />

<br><br>

**AI 기반 추천 일정 생성(오전/오후/저녁)**

<img width="500" height="270" alt="리드미4" src="https://github.com/user-attachments/assets/4b5c7581-6e96-407a-80a3-a4a124a55bca" /><img width="500" height="270" alt="리드미5" src="https://github.com/user-attachments/assets/11523a1f-c1b4-4401-8cd1-85dd5cc6deb5" />

<br><br>

**일정 직접 수정 가능, 저장/재추천 가능**

<img width="500" height="270" alt="리드미6" src="https://github.com/user-attachments/assets/5b04f537-9a22-49a3-a2bf-4b7c2b2a8f2a" />


### 📑 내 여행 계획/패키지 관리
**내가 만든/예약한 여행 계획 목록 및 세부 페이지**

<img width="500" height="270" src="https://github.com/user-attachments/assets/9fb797a5-7ee0-4f92-b4f7-60e03073fcdd" />

<img width="500" height="270" alt="{E278B306-21C5-4730-8232-C425395630C0}" src="https://github.com/user-attachments/assets/cdbdbb90-b03e-438c-8e55-3665620f6a37" />

<br><br>

**완료됨 상태일 때만 생성되는 후기 작성 버튼**
<br><br>
<img width="500" height="270" src="https://github.com/user-attachments/assets/a845ea23-9216-48cf-ae9c-8a9b476e5227" />

<br><br>

**일정, 인원, 예산 등 수정 가능**

<br><br>

<img width="500" height="270" src="https://github.com/user-attachments/assets/daaf44e6-963f-434a-800e-bf2a7039a145" />

<br><br>

**수정 시 AI로 다시 일정 추천 가능**
<br><br>

<img width="500" height="270" src="https://github.com/user-attachments/assets/685d9a33-9bd1-4108-9968-7e5f0b6e2d69" />


### 💬 여행후기/커뮤니티
여행후기/질문/팁/동행 구인 등 다양한 글쓰기
댓글/대댓글, 좋아요, 후기 사진 첨부 지원
글 상세에서 후기/질문/댓글/좋아요 등 활동 지원

<br>

**게시글 작성**
 - 태그설정, 이미지 및 동영상 업로드, 여행후기/질문/팁/동행 구인 설정 및 여행지 선택 가능
<img width="500" height="270" alt="image" src="https://github.com/user-attachments/assets/dadcc841-f733-40a7-831c-bb68be3ebc78" />

<br>

**게시글 조회**
 - 검색 및 필터링을 통해 원하는 게시글 조회 가능
<img width="500" height="270" alt="image" src="https://github.com/user-attachments/assets/4a39d41b-34fb-4cbb-9f15-348c2fa3dab0" />

<br>
<br>

**게시글 상세페이지**
 - 게시글 상세페이지에서 게시글 내용 및 이미지 확인, 동영상 재생 가능
 - 좋아요 및 댓글, 대댓글 기능 가능
<img width="500" height="270" alt="image" src="https://github.com/user-attachments/assets/8094a0ab-2da9-4b31-b408-8f71e1401d30" />

<br>
<br>


### 회원가입 및 로그인/로그아웃
**회원가입**

<img width="500" height="270" alt="회원가입" src="https://github.com/user-attachments/assets/a8608018-509b-4cc1-8a0f-d353b86f95ef" />

<br><br>

**로그인/로그아웃**

<img width="500" height="270" alt="로그인" src="https://github.com/user-attachments/assets/1040ae92-d95a-4535-8c0b-f145d163fb3e" /><img width="500" height="270" alt="로그아웃" src="https://github.com/user-attachments/assets/bc3463f2-aa80-461a-8afe-01830ec84e24" />

<br><br>

**비밀번호 찾기**

- 가입한 이메일 입력 -> 이메일로 비밀번호 재설정 링크 발송 -> 비밀번호 재설정

<img width="500" height="270" alt="이메일 입력" src="https://github.com/user-attachments/assets/89a576eb-daa3-4b81-bd84-74e987e3980c" /><img width="500" height="270" alt="비밀번호 재설정" src="https://github.com/user-attachments/assets/3c7a54ed-d1ae-46f4-955c-c744be93d620" />

<br><br>

## 🗃️ 데이터베이스 구조
<img width="1540" height="839" alt="erd" src="https://github.com/user-attachments/assets/606a3faf-1d30-49f2-9daf-fba3707d4b7a" />

### 🙌 넥스트 코드 ERD CLOUD: [ERD 페이지 바로가기](https://www.erdcloud.com/d/S7f2psXivcmmtErEJ)

<br>

## 🗒️ 폴더 구조

```
aibe3-project1-team02/
├── .github/
├── .next/
├── .vscode/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-plan/
│   │   │   │   └── route.ts
│   │   │   ├── plans/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   └── auth/
│   │   │       └── callback/
│   │   │           └── page.tsx
│   │   ├── community/
│   │   │   ├── [id]/
│   │   │   │   ├── CommunityDetail.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── destinations/
│   │   │   ├── [id]/
│   │   │   │   ├── DestinationDetail.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── my-plans/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── planner/
│   │   │   └── page.tsx
│   │   ├── provider/
│   │   │   └── SupabaseProvider.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LoginForm.tsx
│   │   ├── PopularDestinations.tsx
│   │   ├── ProductCreate.tsx
│   │   ├── ProductList.tsx
│   │   ├── ReviewCreate.tsx
│   │   ├── ReviewList.tsx
│   │   ├── SignupForm.tsx
│   │   ├── TravelPlanEditor.tsx
│   │   └── TravelPlanning.tsx
│   ├── lib/
│   │   ├── supabase-admin.ts
│   │   ├── supabase-browser.ts
│   │   └── supabase.ts
│   └── types/
│       └── community.ts
├── .env.local
├── .gitignore
├── .prettierrc
├── .prettierignore
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── README.md
```
