import { Track } from '@/types/track';

export const dummyTrack: Track = {
  id: 'suzuka',
  name: '스즈카 서킷',
  location: '일본 미에현',
  length: 5.807,
  turns: 18,
  lapRecord: {
    time: '1:30.983',
    driver: 'Lewis Hamilton',
    year: 2019
  },
  sectors: [
    {
      number: 1,
      length: 1.986,
      characteristics: '고속 S자 코너와 헤어핀',
      topSpeed: 315
    },
    {
      number: 2,
      length: 1.978,
      characteristics: '스피드웨이와 데그너',
      topSpeed: 330
    },
    {
      number: 3,
      length: 1.843,
      characteristics: '캐스버그와 최종 시케인',
      topSpeed: 305
    }
  ],
  drsZones: [
    {
      number: 1,
      length: 0.783,
      detectionPoint: '15번 코너 이전',
      activationPoint: '메인 스트레이트'
    },
    {
      number: 2,
      length: 0.450,
      detectionPoint: '13번 코너 이전',
      activationPoint: '스피드웨이 직선'
    }
  ],
  corners: [
    {
      number: 1,
      name: 'First Turn',
      type: 'medium',
      angle: 90,
      description: '중속 오른쪽 코너, 추월 지점'
    },
    {
      number: 3,
      name: 'S Curves',
      type: 'fast',
      angle: 135,
      description: '고속 S자 코너 구간 시작'
    },
    {
      number: 11,
      name: 'Hairpin',
      type: 'slow',
      angle: 180,
      description: '저속 헤어핀, 주요 추월 지점'
    }
  ],
  mapImage: '/images/tracks/suzuka.svg',
  description: '스즈카 서킷은 F1의 전설적인 트랙 중 하나로, 혼다가 소유한 이 서킷은 1962년에 개장했습니다. 독특한 8자 모양의 레이아웃과 도전적인 코너 조합으로 유명하며, 특히 1번 코너부터 이어지는 S자 커브는 F1에서 가장 기술적으로 까다로운 구간 중 하나로 평가받고 있습니다.',
  records: [
    {
      type: 'race',
      time: '1:30.983',
      driver: 'Lewis Hamilton',
      team: 'Mercedes',
      year: 2019,
      date: '2019-10-13'
    },
    {
      type: 'qualifying',
      time: '1:27.064',
      driver: 'Sebastian Vettel',
      team: 'Ferrari',
      year: 2019,
      date: '2019-10-12'
    },
    {
      type: 'practice',
      time: '1:28.217',
      driver: 'Valtteri Bottas',
      team: 'Mercedes',
      year: 2019,
      date: '2019-10-11'
    }
  ]
}; 