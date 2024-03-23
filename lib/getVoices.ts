const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
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

export default getVoices