interface LiveRaceInfoProps {
  isRaceActive?: boolean;
}

export default function LiveRaceInfo({ isRaceActive = false }: LiveRaceInfoProps) {
  if (!isRaceActive) {
    return (
      <div className="bg-bg-secondary p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">다음 레이스</h3>
          <span className= "font-bold text-f1-red">2024 FORMULA 1</span>
        </div>
        
        <div className="space-y-4">
          <div className="border-b border-gray-600 pb-4">
            <h4 className="text-lg font-semibold">JAPANESE GRAND PRIX</h4>
            <p className="text-gray-800">스즈카 서킷</p>
            <div className="mt-2 flex items-center space-x-4">
              <div className="mr-4">
                <p className="text-sm text-gray-400">예선</p>
                <p className="font-mono">2024.04.06 15:00</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">결승</p>
                <p className="font-mono">2024.04.07 15:00</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-2">트랙 정보</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">트랙 길이</p>
                <p className="font-mono">5.807 km</p>
              </div>
              <div>
                <p className="text-gray-400">랩 수</p>
                <p className="font-mono">53 laps</p>
              </div>
              <div>
                <p className="text-gray-400">DRS 구간</p>
                <p className="font-mono">2 zones</p>
              </div>
              <div>
                <p className="text-gray-400">코너 수</p>
                <p className="font-mono">18 corners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">실시간 경기</h3>
        <span className="text-f1-red animate-pulse">LIVE</span>
      </div>
      
      <div className="space-y-4">
        {/* 실시간 순위 표시 영역 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">순위</th>
                <th className="px-4 py-2 text-left">드라이버</th>
                <th className="px-4 py-2 text-left">랩 타임</th>
                <th className="px-4 py-2 text-left">간격</th>
                <th className="px-4 py-2 text-left">타이어</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono">P1</td>
                <td className="px-4 py-2">데이터 로딩중...</td>
                <td className="px-4 py-2 font-mono">--:--.---</td>
                <td className="px-4 py-2 font-mono">--.---</td>
                <td className="px-4 py-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 경기 정보 표시 영역 */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">남은 랩</p>
            <p className="font-mono">-- / --</p>
          </div>
          <div>
            <p className="text-gray-500">경기 시간</p>
            <p className="font-mono">--:--:--</p>
          </div>
          <div>
            <p className="text-gray-500">트랙 상태</p>
            <p className="font-mono">--</p>
          </div>
        </div>
      </div>
    </div>
  );
} 