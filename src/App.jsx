import { useState } from 'react';

function App() {
  const [namesInput, setNamesInput] = useState('');
  const [teamSize, setTeamSize] = useState(2);
  const [teams, setTeams] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleGenerateTeams = () => {
    const nameList = namesInput
      .split(/[\n,]+/)
      .map((name) => name.trim())
      .filter((name) => name !== '');

    if (nameList.length === 0) {
      alert('참가자 이름을 입력해주세요. 😅');
      return;
    }
    if (teamSize < 2) {
      alert('팀당 인원은 최소 2명 이상이어야 합니다. ✌️');
      return;
    }
    if (nameList.length < teamSize) {
      alert('총 인원이 한 팀의 인원보다 적습니다. 더 많은 인원을 추가해 주세요! 👨‍👩‍👧‍👦');
      return;
    }

    const numberOfTeams = Math.floor(nameList.length / teamSize);
    const shuffledNames = shuffleArray(nameList);
    const newTeams = Array.from({ length: numberOfTeams }, () => []);

    shuffledNames.forEach((name, index) => {
      newTeams[index % numberOfTeams].push(name);
    });

    setTeams(newTeams);
  };

  return (
    // 배경 그라데이션 적용
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center transition-all duration-500">
      
      {/* 메인 입력 카드 (글래스모피즘 스타일) */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white overflow-hidden transform transition-all">
        
        {/* 헤더 부분 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            팀 매칭 마스터 🎲
          </h1>
          <p className="mt-3 text-indigo-100 text-lg font-medium">
            이름을 입력하면 가장 공평하고 완벽한 팀을 만들어 드립니다.
          </p>
        </div>

        {/* 입력 폼 부분 */}
        <div className="p-8 sm:p-10 space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              참가자 명단 <span className="text-gray-400 font-normal lowercase">(쉼표 또는 줄바꿈으로 구분)</span>
            </label>
            <div className="relative">
              <textarea
                className="w-full p-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none text-gray-700 text-lg shadow-inner"
                rows="5"
                placeholder="예: 김철수, 이영희, 홍길동..."
                value={namesInput}
                onChange={(e) => setNamesInput(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-sm text-sm font-bold text-purple-600 border border-purple-100">
                총 {namesInput.split(/[\n,]+/).filter(n => n.trim() !== '').length}명
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-end">
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                팀당 인원 수
              </label>
              <input
                type="number"
                min="2"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-center text-xl font-bold text-gray-800 shadow-inner"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 2)}
              />
            </div>
            <div className="w-full sm:w-2/3">
              <button
                onClick={handleGenerateTeams}
                className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                무작위 팀 생성하기 ✨
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 결과 출력 섹션 */}
      {teams.length > 0 && (
        <div className="w-full max-w-6xl mt-16 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              매칭 결과 <span className="text-purple-600">({teams.length}팀)</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teams.map((team, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Team {index + 1}
                  </h3>
                  <span className="bg-indigo-50 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full group-hover:bg-indigo-100 transition-colors">
                    {team.length}명
                  </span>
                </div>
                <ul className="space-y-3">
                  {team.map((member, mIndex) => (
                    <li key={mIndex} className="flex items-center text-gray-700 font-medium">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center text-sm font-bold mr-4 shadow-sm">
                        {mIndex + 1}
                      </div>
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 간단한 애니메이션용 CSS (App.jsx 하단에 인라인으로 추가하거나 index.css에 넣으셔도 됩니다) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}} />
    </div>
  );
}

export default App;