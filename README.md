# Wakcraft

<p align="center">
    <a href="https://wakcraft.vercel.app" target="_blank">
      <img src="https://github.com/user-attachments/assets/bd3f9ef5-c2ef-41fa-9398-e8892507d2d7" />
    </a>
</p>

<br/>

## 🚀 프로젝트 소개

> ‘왁크래프트’는 170만 유튜버 [우왁굳](https://www.youtube.com/@woowakgood)의 [마인크래프트 컨텐츠](https://www.youtube.com/playlist?list=PLfASGV4peeDRjN43IAUD8E_ocPpQ-pLLj) 중 '눕프로해커' 시리즈를 정리한 웹사이트입니다.  
> 방송 중 “이 건축가가 어떤 작품을 만들었지?” 하고 궁금해하는 팬들을 위해, 참여자별로 콘텐츠를 분류하고 검색할 수 있도록 했습니다.

<br/>

### 📌 버전 업데이트

| 버전 | 주요 변화 |
| --- | --- |
| [V1](https://github.com/yewonJin/wakcraft-v1) | API Route 기반 + MVP 제작 및 초기 런칭 |
| [V2](https://github.com/yewonJin/wakcraft-v2) | API Route 기반 + 전체적인 스타일링 개선 |
| [V3](https://github.com/yewonJin/wakcraft-v3) | API Route 기반 + Atomic Design Pattern를 이용한 프로젝트 구조 개선 |
| [V4](https://github.com/yewonJin/wakcraft) | Server Actions 기반 + 모노레포 구성 및 리팩토링 |

<br/>

### 🗂️ 프로젝트 구조

- apps/admin -> 어드민 애플리케이션
- apps/web -> 웹 애플리케이션
- packages/* -> 공용 패키지

<br/>

## 🔗 애플리케이션 흐름

### 웹 애플리케이션
<img src="https://github.com/user-attachments/assets/ad507a8e-2c44-4595-b215-8831c40e7a25" width="600px" />

### 어드민 애플리케이션 흐름

<img src="https://github.com/user-attachments/assets/3afcae4e-eb6b-49ee-8cdc-ad0a2f45f7e4" width="600px" />

<br/>
<br/>

## 💡 핵심 경험

### 🛠️ 모노레포를 이용한 애플리케이션 분리
**🧩 문제**

- 어드민과 웹 애플리케이션이 한 프로젝트에 혼재했다. → 구조 파악 및 유지보수 어려움
- 또한 API 방식이 서로 달랐다.(API Routes + tanstack-query vs Server Actions) → 일관성 없음

**🔧 해결**

- 모노레포를 이용해서 이 두 애플리케이션을 분리했고, 중복되는 부분을 패키지로 분리했다.
- 일관성을 위해 API Route를 사용하지 않고 Server Actions으로 모두 구현했다.

<br/>

### **🛠️ Lazy Loading을 이용한 성능 최적화**

**🧩 문제**
- 사용자 경험(예: 빠른 검색)을 위해 DOM 크기가 큰 요소를 사용했다.
- 하지만 DOM 크기 때문에 렌더링 및 리렌더링 시 성능 문제가 발생했다.

**🔧 해결**
- IntersectionObserver으로 Lazy loading을 구현해서 DOM 크기가 큰 요소 렌더링 성능 최적화했다.
- CPU 4x slowdown 환경 기준, INP `811ms` → `275.2ms` 개선

→ [자세한 내용 보기](https://doromo.vercel.app/post/큰-dom-렌더링-최적화)

<br/> 

### 🎨 데스크톱/모바일 이미지 캐로셀 구현

https://github.com/user-attachments/assets/d27f8f91-7bcf-4d57-9e8f-65154e404a79

https://github.com/user-attachments/assets/86a646d2-b50b-4679-bfce-7f11ca3ccf35

1. 모바일과 데스크톱 환경에서 다른 UI/UX를 적용해야 했다.
2. header의 user-agent를 이용하여 모바일 환경임을 체크하고, 환경에 따라 다른 `CarouselContainer` 를 적용했다.

→ [자세한 내용 보기](https://doromo.vercel.app/post/데스크톱-모바일-호환되는-이미지-캐로셀)

→ [관련 코드 보기](https://github.com/yewonJin/wakcraft/blob/main/apps/web/src/components/organisms/ContentLine/Carousel/index.tsx)

<br/>

### 🎨 사용자를 위한 검색 및 하이라이팅 기능

https://github.com/user-attachments/assets/78267b68-0877-412d-9f66-983f14dd9e98

1. `string[]` 값과 input 값을 정규표현식으로 매칭하여, 한글 초성 검색도 가능하게 구현했다.
2. matchingIndex가 작을 수록, 더 높은 우선순위를 부여했다.
    ex) ㄱㄴ → 가나다라(0, 1), 가다나라(0,2) → 1. 가나다라, 2. 가다나라
   
→ [참고](https://taegon.kim/archives/9919)

→ [관련 코드 보기 1](https://github.com/yewonJin/wakcraft/blob/main/apps/web/src/utils/search.ts)

→ [관련 코드 보기 2](https://github.com/yewonJin/wakcraft/blob/main/apps/web/src/hooks/architect/useSearchArchitect.ts)
<br/>
<br/>

## 📈 결과 및 사용자 반응

- 내가 좋아하는 유튜브와 그의 팬들이 좋게 반응해주었다. (유튜버의 서브 유튜브 채널에도 사이트를 이용하는 것이 올라갔다.)    
    https://www.youtube.com/watch?v=LbX4YcG3BLU
- 하루 최대 2.2K 및 최대 30분간 400명의 사용자가 접속했다.

<img src="https://github.com/user-attachments/assets/c9fd2a56-7e32-4b1a-940b-613a2896d96f" width="600"/>
<img src="https://github.com/user-attachments/assets/0bfb3b0e-d0d3-4ef9-aa42-7de9cc6bb345" width="600"/>

  
