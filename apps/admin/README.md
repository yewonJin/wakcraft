# 어드민 애플리케이션

## 🚀 애플리케이션 소개
>  유튜버 우왁굳의 컨텐츠인 눕프로해커, 예능 눕프핵, 배치고사를 추가 및 수정할 수 있습니다.  
>  또한 건축가들에 대한 정보를 수정할 수 있습니다.

<br />

## 🔗 어드민 애플리케이션 흐름

<img src="https://github.com/user-attachments/assets/9213dd97-1300-491c-a034-c3f33b794abf" width="600"/>

<br />

## ✅ 컨텐츠 등록 흐름

### ✍️ 사전 준비 - 컨텐츠 정리
[🔗 숲 생방송](https://vod.sooplive.co.kr/player/149995341?change_second=15148), 
[🔗 유튜브 영상](https://www.youtube.com/watch?v=vCPx9G5BYEY&feature=youtu.be)

위와 같은 생방송 혹은 유튜브 영상을 참고하여 아래 내용을 정리한다:
1. 컨텐츠 회차, 주제, 날짜
2. 건축 작품명, 순위, 건축가 ID
3. 이미지 수집
    - 유튜버의 [네이버 카페](https://cafe.naver.com/steamindiegame) 또는 생방송 캡처

📝 예시:
```md
1. 58회, 자유, 2025-02-01  
2. 1라인: 가논돌프 - 눕: 녺샊이, 프로: 재수피기, 해커: 현잼민  
   2라인: 미야조노 카오리 - 눕: 공속팬치, ...  
3. 이미지 - 캡처 or 네이버 카페 참고
```

<br />

### 1️⃣ 컨텐츠 정보 입력
- 회차, 주제, 날짜 입력
![1](https://github.com/user-attachments/assets/03277402-3810-41d3-bbdf-a7c04751e5dd)

<br/>

### 2️⃣ 라인 정보 압력

#### 이미지 선택
  1. 모든 이미지를 미리 업로드 후, 이미지 선택하기
     
  https://github.com/user-attachments/assets/5dcecf79-5903-4f20-a1f8-4c6b2b00b1b9
  
  2. 드래그 앤 드롭 or 파일 업로드를 클릭하여 이미지 업로드하기
     
  https://github.com/user-attachments/assets/bea440e2-a5f7-4830-bd71-46558f0eb76c

<br/>

#### 건축가 입력
- 잘못된 건축가 입력을 방지하기 위해 미리 등록된 건축가들의 아이디를 검색해서 선택한다.
- 마인크래프트 아이디, 한글 아이디 둘 다 검색의 키워드로 가능하고, 한글 초성 검색이 가능하다.
  
https://github.com/user-attachments/assets/52e1a8a4-4cd5-4201-b673-3b2a17b95e48

<br/>

### 3️⃣ 서버 액션 실행
```ts
export const postNoobProHacker = async (payload: NoobProHacker) => {
  // 유효성 검사
  // 트랜잭션 처리
}
```
- 유효성 검사 후 mongoose session 기반 트랜잭션 처리
- 콘텐츠 → 건축가 포트폴리오 데이터로 변환
- 건축가 랭킹, 포트폴리오, 참가 횟수 자동 반영

<br/>

### 4️⃣ 결과
- [58회 콘텐츠 페이지 바로가기](https://wakcraft.vercel.app/noobprohacker/58)
- 각 건축가 포트폴리오에 작품이 자동 추가됨
