# Changelog

## [0.2.0](https://github.com/WisdomIT/chzzk-vote/compare/v0.1.0...v0.2.0) (2026-07-25)


### Features

* /sign 페이지 ([b116226](https://github.com/WisdomIT/chzzk-vote/commit/b116226712251c536d2a8bd75f01d734ae8efd00))
* Chat 컴포넌트 작성 및 시청자 추첨 적용 ([ed3aa60](https://github.com/WisdomIT/chzzk-vote/commit/ed3aa601a96b3887e4d477dcde88cafe3056f883))
* ChatSlot 컴포넌트 작성 ([bcacacf](https://github.com/WisdomIT/chzzk-vote/commit/bcacacf5ab029907a6d94da9263435058338709a))
* ChatSlot에 confettiExplosion 적용 ([0c712e2](https://github.com/WisdomIT/chzzk-vote/commit/0c712e2496da7fc033e3fb445b0d28b9071326e4))
* Deepcopy (obj, arr 깊은복사용 lib) ([7ebc0f8](https://github.com/WisdomIT/chzzk-vote/commit/7ebc0f8edb954f47bb65660235059d12e2f00218))
* Footer 링크 추가 ([774a88f](https://github.com/WisdomIT/chzzk-vote/commit/774a88f82d37ce92def7c721b48b744666285eb6))
* GA 태그 생성 ([691442e](https://github.com/WisdomIT/chzzk-vote/commit/691442e8570802f51b4f0f862c004c2cc6e7c92e))
* Global components ([da2c54d](https://github.com/WisdomIT/chzzk-vote/commit/da2c54d73c32fad9cb3fec4e6d3104a1f904f3ff))
* Global Layout ([01e2297](https://github.com/WisdomIT/chzzk-vote/commit/01e2297c2b748bc983907f7915dac9589bc0b3a2))
* Global Option - zustand 상태 ([456201a](https://github.com/WisdomIT/chzzk-vote/commit/456201a97d32071645a5238ba581bb2401001e74))
* index 페이지 / favicon ([771394b](https://github.com/WisdomIT/chzzk-vote/commit/771394b828197d65f5f0d13931b229871356652d))
* timer ([03e23e0](https://github.com/WisdomIT/chzzk-vote/commit/03e23e0b9fbbe9400c8350066f4fbf0b28a8e554))
* 기본 스타일 정의 ([1d44484](https://github.com/WisdomIT/chzzk-vote/commit/1d44484085fc5345e2f3416885b9ce83a5a37b9f))
* 도네 투표 성능 최적화 ([da08862](https://github.com/WisdomIT/chzzk-vote/commit/da08862a6d2a64087132a26f1e1451f48b823637))
* 도네투표 추가 ([9170f66](https://github.com/WisdomIT/chzzk-vote/commit/9170f662cfca7c8e453474e101f5f690292a2a4f))
* 도네투표 추가 ([5eeef16](https://github.com/WisdomIT/chzzk-vote/commit/5eeef16ffc46a85c6bd21843623fe59c9e7b0748))
* 룰렛 기능 구현 ([55f6738](https://github.com/WisdomIT/chzzk-vote/commit/55f673859ca358798f20bbf93e7a1a41ca78dd71))
* 사이트 줌 기능 추가 ([dc7ab45](https://github.com/WisdomIT/chzzk-vote/commit/dc7ab45a7fb596d10ed867818c02fd31528901dc))
* 설정 - 패치노트 및 투네이션 링크 ([426fd14](https://github.com/WisdomIT/chzzk-vote/commit/426fd144c1de9f64a5f2e6b0a20693bb5d906733))
* 설정 페이지 구현 ([ff459fe](https://github.com/WisdomIT/chzzk-vote/commit/ff459fe98d748cda8899f99681543de7e02976c1))
* 숫자 투표 - 구독자 및 중복 방지 기능 변경 ([96877a4](https://github.com/WisdomIT/chzzk-vote/commit/96877a421d8237468128a7efb6e8ebc8998a1950))
* 숫자투표 구현 ([c9f9fee](https://github.com/WisdomIT/chzzk-vote/commit/c9f9fee0804a153ebfa62a05c02dbc0ad78b455c))
* 시청자 추점 - 모집 ([7f3d528](https://github.com/WisdomIT/chzzk-vote/commit/7f3d528e77a8c4e53620b9d95525fa91a445822c))
* 시청자 추첨 - 구독자 및 중복 방지 기능 변경 ([1df1569](https://github.com/WisdomIT/chzzk-vote/commit/1df156923d158f7adf2585be21d54c31370735cb))
* 투표 결과 룰렛 이전기능 추가 ([5ed0d9c](https://github.com/WisdomIT/chzzk-vote/commit/5ed0d9c901073a29cc321b9c8e97f9203240eba5))
* 투표 결과 정렬기능 추가 ([4b143f2](https://github.com/WisdomIT/chzzk-vote/commit/4b143f215a25a9ac078f4ed40f9d92cd552dffaa))


### Bug Fixes

* Btn width 없을 때 initial값으로 넣기 ([abb36d0](https://github.com/WisdomIT/chzzk-vote/commit/abb36d03fc2e3b77fcabdd35b6b04956a017a687))
* client.disconnect() 에러 방지를 위한 충분한 딜레이 설정 ([c53065e](https://github.com/WisdomIT/chzzk-vote/commit/c53065ee46411a88a75c61a4da4f6424fcc55e8a))
* getVoices 못 가져오는 버그 픽스 ([b1acc16](https://github.com/WisdomIT/chzzk-vote/commit/b1acc16edeb3bb6016ed2a13a0886f5d9dcb177e))
* sign은 최초만 접속 가능하도록, config에서 setChannel 시 모달 내려가도록 ([32bd735](https://github.com/WisdomIT/chzzk-vote/commit/32bd735b3f4e103bdd4683448c0b3a8aff1233aa))
* Slot 무한반복 개선 ([bdf63eb](https://github.com/WisdomIT/chzzk-vote/commit/bdf63ebc14752aac3d812c05261ec11d7483e29e))
* 시청자 채팅 이모티콘 표시되지 않는 문제 해결, 이모티콘은 음성 tts에서 제외 ([b046165](https://github.com/WisdomIT/chzzk-vote/commit/b04616559b19c73f750973001ff6f10cbb718ce8))
* 시청자 추첨, 숫자 투표 - 리셋 시 중복(drawn) 데이터 초기화 ([1d79a96](https://github.com/WisdomIT/chzzk-vote/commit/1d79a961ffb0819cc3eff7968e9a6b258ecc699e))
* 채팅 종료 시 disconnect 되지 않는 버그 해결 ([3c5be7e](https://github.com/WisdomIT/chzzk-vote/commit/3c5be7e294b19c2c765a95f35abff83c6c67cc8b))


### Performance Improvements

* 추첨 및 투표 성능 최적화 ([2a8c26a](https://github.com/WisdomIT/chzzk-vote/commit/2a8c26adc69f3a8e0991d81a49c87fc3af566f54))
