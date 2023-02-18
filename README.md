# HyundaiMobisHackathonWebApp

Hyundai mobis hackathon web app

## Disclaimer

This project is solely built as a prototype, and is not intended for production use.
There are many unimplemented features that are nessesary for production use,
and also the code is not optimized well in terms of program speed.
Use it at your own risk if you want to use it in production.

## Getting Started

```bash
npm i # Install dependencies

npx nx run emulators:run # Run the firebase emulator
npx nx run dummy-data:generate # Generate dummy data. More details in below.

npx nx run mobile-app:serve # Run the mobile app
```

## Notes

### Display size

- iPhone 12 Pro. (390 x 844) 화면에 최적화 되어있습니다.
- [크롬 모바일 디바이스 모드](https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome)을 보면서 개발했습니다. iOS 시뮬레이터에서 앱바가 탈모에 걸리는지는 테스트를 안해봤다는 의미입니다.
- PWA 세팅이 되어있습니다. 모바일 환경에서는 홈 화면에 추가하면 앱처럼 사용할 수 있습니다. PWA 설치 방법은 [여기](https://www.cdc.gov/niosh/mining/content/hearingloss/installPWA.html)를 참조하세요.

### 너무 아쉽지만...

- [parts-graphical-view](https://github.com/junwha0511/parts-graphical-view) 포팅이 안되어서 일단 현대차 사진으로 채워놨습니다. 포팅은 시간 나면 하는데, 지금은 토플이 조금 급합니다.

### constants

- `libs/constants/src/index.ts`에 `PROJECT_NAME`과 `SPECIFIED_VEHICLE_SERIAL_CODE`라는 상수가 있습니다. 
- 전자는 바꾸면 실제 UI에 나타나는 이름이 바뀝니다. 변경사항을 적용하려면 `npx nx run constants:build`를 실행합니다.
- 후자는 그 값을 `serialCode`로 하는 더미데이터를 생성하는데 이용됩니다. 더미데이터 생성은 `npx nx run dummy-data:generate`로 할 수 있습니다.

### Admin Dashboard

- 어드민 대시보드는 사용하려는 프레임워크에 번들러 에러 (vite를 써서 그런 것으로 보임)가 있는데 해결하려면 꽤 많은 시간을 넣어야 할 것 같아서 관뒀습니다.
- 그 대신에 개발자들이나 데이터 사이언티스트들이 사용할 수 있도록 서버에서 데이터를 편리하게 읽어올 수 있는 JS/Python 클라이언트를 구현해두었습니다.
  - JS 클라이언트: `libs/firebase/src/client.ts` 에 `FirebaseClient`가 있습니다.
  - Python 클라이언트: `tools/client/client.py`에 `FirebaseClient`가 있습니다.
