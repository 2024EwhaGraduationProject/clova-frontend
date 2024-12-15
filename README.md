## 1️⃣ 폴더 구조
| 폴더 구조                 | 설명                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  <img width="370" alt="스크린샷 2024-12-14 오후 4 34 54" src="https://github.com/user-attachments/assets/ed532acf-8cba-42a9-8744-8220b3a66905" />           |  api : 서버 통신 <br><br> assets : 이미지, 아이콘 <br><br> core : 더미데이터 <br><br> hooks : 커스텀 훅 <br><br> pages : 화면 페이지 <br> - 기능에 따라 10가지 화면으로 구성 <br><br> styles : 포맷, 공통 스타일 <br><br> types : 데이터 타입 <br><br> utils : 공통 함수 |

## 2️⃣ 코드 설명
#### 1) api 연결
## 📄 서버 통신

🔻 러비팀은 Next가 아닌 React+typescript로 구현하기로해서 이번 투표 과제는 CSR로 구현했습니다. 

### 1. **axios**
  - 왜 fetch가 아닌 axios를 사용했는가?
     사실 자바스크립트에는 fetch api가 존재하지만, 더 많은 기능을 지원하기에 개발자들은 서버 통신에 보다 편리한 axios를 선호한다고..!

| Axios         | Fetch                        |
| ------------ | -------------------------- |
| 설치 필요 O | 설치 필요 X |
| CSRF 보호 기능이 있다               | 별도 기능이 없다  |
| 자동으로 JSON 데이터 형식으로 변환해준다 | json() 메서드를 따로 사용해서 JSON 형태로 바꿔 주어야 한다    |
| 요청 취소 및 타임아웃을 걸 수 있다. | -  |
|HTTP 요청을 가로챌 수 있다. | - |
|상태코드가 에러 코드를 내뱉으면 reject 한다.| 에러 응답을 받더라도 resolve 하고 네트워크 장애가 발생한 경우에만 거부한다. (에러 뱉어주지 X) |

<br/>

### 2. **async/await**
  - 왜 promise가 아닌 async, await를 사용했는가?
  ⚠️ Promise & then 의 문제점
      - 가독성이 떨어지고, 디버깅이 불편하다 (길어지는 체이닝)
      - 예외처리 (try…catch 와 .then / .catch의 혼용이 헷갈림)

      👉 그래서 등장한 **async/await**

  ```js
async function 함수명( ){
	await 비동기함수();
}
  ```

<br/>

### 3. **customAxios**
  - axios를 사용할 때마다 baseURL을 작성하는 등 반복되는 코드를 작성하지 않기 위해서 커스터마이징한 인스턴스를 모듈화하여 사용

```js
import axios from "axios";

export const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
```

<br />

### 4. **인터셉터**
- 로그인을하면 헤더에 토큰을 넣어주는 작업
👉 authorization header
     - 투표는 access 토큰에 따라 사용자를 식별해야하기 때문에 토큰을 확인하는 절차가 필수였습니다. 따라서 요청을 인터셉트해서 access token의 정보를 헤더에 넣어주도록 했습니다.
     - 토큰은 Cookie에 넣어서 관리했고 access token이 있으면 헤더의 Authorization에 Bearer ${token} 형태로 토큰 값을 넣어서 요청합니다.
     - useLayoutEffect 훅을 이용해서 렌더링 전에 훅 실행

```js
import { getCookie } from "@api/cookie";
import { customAxios } from "@api/customAxios";
import { useLayoutEffect } from "react";

export default function useSetInterceptors() {
  useLayoutEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(
      (request) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
          request.headers.Authorization = accessToken;
        }
        return request;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      },
    );

    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
    };
  }, []);
}
```

<br />

### 5. **react-query와 custom-hook**

🔻 GET - useQuery 사용

> 첫 번째 파라미터로 unique key를 포함한 배열이 들어간다. 이후 동일한 쿼리를 불러올 때 유용하게 사용된다.
> 첫 번째 파라미터에 들어가는 배열의 첫 요소는 unique key로 사용되고, 두 번째 요소부터는 query 함수 내부의 파라미터로 값들이 전달된다.
> 두 번째 파라미터로 실제 호출하고자 하는 비동기 함수가 들어간다. 이때 함수는 Promise를 반환하는 형태여야 한다.
> 최종 반환 값은 API의 성공, 실패 여부, 반환값을 포함한 객체이다.

```js
import { useQuery } from "react-query";
import { getTopicsById } from "@api/getTopicsById";
import { ResponseTypes } from "@api/getTopicsById";

export function useGetTopicsById(topicID: number) {
  const result = useQuery<ResponseTypes, Error>(
    ["getTopicsById", topicID],
    () => getTopicsById(topicID),
    {
      onError: (error) => {
        console.log("해당 Topic이 존재하지 않습니다.", error);
      },
    },
  );

  return result;
}
```

🔻 POST - useMutation 사용

> 반환값은 useQuery와 동일하지만, 처음 사용 시에 post 비동기 함수를 넣어준다. 이때 useMutation의 첫 번째 파라미터에 비동기 함수가 들어가고, 두 번째 인자로 상황 별 분기 설정이 들어간다는 점이 차이이다.
> 
> 실제 사용 시에는 mutation.mutate 메서드를 사용하고, 첫 번째 인자로 API 호출 시에 전달해주어야하는 데이터를 넣어주면 된다
> const { mutate: postVoteMutate } = usePostVote();

```js
import { useMutation } from "react-query";
import { postSignUp } from "@api/postSignUp";
import { useNavigate } from "react-router-dom";

export function usePostSignUp() {
  const navigate = useNavigate();

  return useMutation(postSignUp, {
    onSuccess: () => {
      console.log("회원가입 성공");
      navigate("/signin");
    },
    onError: (error) => {
      console.log("회원가입 실패", error);
    },
  });
}
```

👉 왜 React Query를 사용했는가?
1. React Query는 React Application에서 서버 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 라이브러리입니다.
2. 복잡하고 장황한 코드가 필요한 다른 데이터 불러오기 방식과 달리 React Component 내부에서 간단하고 직관적으로 API를 사용할 수 있습니다.
3. 더 나아가 React Query에서 제공하는 캐싱, Window Focus Refetching 등 다양한 기능을 활용하여 API 요청과 관련된 번잡한 작업 없이 “핵심 로직”에 집중할 수 있습니다.
4. React-Query는 캐싱을 통해 동일한 데이터에 대한 반복적인 비동기 데이터 호출을 방지하고, 이는 불필요한 API 콜을 줄여 서버에 대한 부하를 줄이는 좋은 결과를 가져옵니다. 
5. 컴포넌트 내부에서 Server 데이터를 가져오고 있는데, 이때 onSuccess와 onError 함수를 통해 fetch 성공과 실패에 대한 분기를 아주 간단하게 구현할 수 있어서 이는 Server 데이터를 불러오는 과정에서 구현해야할 추가적인 설정들을 진행할 필요가 없습니다.
6. 📍 즉, Client 데이터는 상태 관리 라이브러리가 관리하고, Server 데이터는 React-Query가 관리하는 구조라고 생각하면 되고 이를 통해 우리는 Client 데이터와 Server 데이터를 온전하게 분리할 수 있습니다.

| 장점         | |
| ------------ | -------------------------- |
| 재사용성         | API 호출과 처리를 분리하여 여러 컴포넌트에서 재사용 가능                        |
| 에러 핸들링 | useMutation의 onError 콜백을 사용하여 에러를 처리 |
| 성공 처리              | onSuccess 콜백을 사용해 성공 시 필요한 후속 작업(예: 페이지 이동)을 쉽게 관리할 수 있음  |
| 상태 관리 | React Query를 사용하여 서버 상태를 관리하면, 상태를 직접 관리할 필요 없이 자동으로 업데이트    |


### 6. **우리가 리액트쿼리를 적용한 방법**

📦api
 ┣ 📜cookie.ts
 ┣ 📜customAxios.ts
 ┣ 📜getVotingOptionsById.ts
 ┗ 📜postSignIn.ts

- api 폴더에 있는 함수는 API 호출을 수행합니다.
- customAxios를 사용해 API 요청을 보내고, 서버로부터의 응답을 반환합니다.

📦hooks
 ┣ 📜useGetVotingOptionsById.ts
 ┗ 📜usePostSignIn.ts

- hooks 폴더에 있는 함수는 요청을 처리하는 역할 
- 예를 들어, 로그인에 성공하면 쿠키에 토큰을 저장하고, 실패 시 에러 메시지를 표시하는 등 커스텀 할 수 있습니다. 
- 컴포넌트에서 hooks들을 호출하여 다양하게 사용할 수 있습니다 

---
## 🎀 참고
[🔗 리액트쿼리 공식문서.](https://github.com/ssi02014/react-query-tutorial)

## 📄 브랜치 전략

[**Issue** 먼저 생성하고 **해당 이슈 번호** 브랜치 생성]

▶️ **브랜치명**
  - `main`: 최종 Merge를 하는 곳 (배포 브랜치)
  - `develop` : 개발할때 Merge하는 곳
  - `페이지명` : 기능을 개발하면서 각자 페이지별로 사용할 브랜치
  - `test` : 개인 연습 브랜치
 
▶️ **브랜치 전략**
  - `feature/#이슈번호/페이지/기능설명`

  ```
  develop
  ㄴ feature/#이슈번호/home/headerUI
  ```

- ↩️ PR은 1명 이상이 확인하면 merge

<br />

## 3️⃣ How to build, install, test
#### 1) 프로젝트를 본인의 저장소로 fork
<img width="511" alt="스크린샷 2024-12-14 오후 4 19 41" src="https://github.com/user-attachments/assets/6341b0d9-8f28-42c9-aec4-6cb3b3e6c8fc" />

#### 2) fork한 저장소로 이동 후 저장소 주소 복사 
<img width="484" alt="스크린샷 2024-12-14 오후 4 20 29" src="https://github.com/user-attachments/assets/4a9cf5cb-e07c-4c67-bea6-07c64e8a0f07" />

#### 3) fork한 저장소를 자신의 컴퓨터로 clone하고, 해당 폴더로 이동
```js
git clone 저장소_주소.git
cd 폴더_이름
```
#### 4) 의존성 모듈 설치 `yarn`
#### 5) React 앱 실행 `yarn dev`

## 4️⃣ Opensource
| 역할                 | 종류                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white) ![ReactQuery](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)                                                                                                                |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                             |
| Styling              | ![StyledComponent](https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)                                                                           |
| Data Fetching        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)                                                                                                                |
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![Stylelint](https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white)|
| Package Manager      | ![Yarn](https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)                                                                                                                   |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)  |
| Deploy               | ![Deploy](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
