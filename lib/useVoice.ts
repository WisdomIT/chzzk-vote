import { useGlobalOptionStore } from "./zustand";

//window.speechSynthesis는 비동기 함수가 아니나, 브라우저에 따라 딜레이가 있을 수 있어 비동기 처리하도록 함수를 만들어준다
export const getSystemVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve, reject) => {
    let synth = window.speechSynthesis;
    let id: number; // id의 타입을 number로 명시적으로 지정

    id = window.setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
};

//zustand로 저장된 보이스를 가져옴
const getStoredVoice = async () => {
  const { voice } = useGlobalOptionStore();

  const voices = await getSystemVoices();
  const filter = voices.filter((voice) => voice.lang === "ko-KR");
  const findSettedVoice = filter.find((e) => e.name === voice);

  //검색된 모델이 없으면 첫번째 모델을 반환
  if (!findSettedVoice) return voices[0];
  return findSettedVoice;
};

export default async function useVoice(message: string) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.voice = await getStoredVoice();

  //일부 환경에서 백그라운드에서 돌아가는 보이스가 있을 때 재생되지 않는 문제 해결
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
