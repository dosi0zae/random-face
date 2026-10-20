# Random Face

단체 사진을 넣으면 얼굴을 찾아서 한 명을 랜덤으로 뽑아주는 아이패드용 웹앱.

- 얼굴 인식은 기기 안에서만 실행됩니다 (사진이 어디로도 업로드되지 않음).
- Safari에서 한 번 열고 공유 → **홈 화면에 추가** 하면, 이후 인터넷 없이도 동작합니다.
- 얼굴을 탭하면 뽑기에서 빼기/넣기, 못 찾은 얼굴은 빈 곳을 탭해서 추가.

얼굴 인식: [MediaPipe Tasks Vision](https://github.com/google-ai-edge/mediapipe) 0.10.35 + BlazeFace short-range 모델 (Apache License 2.0).
