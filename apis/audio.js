import http from '../request'

export async function createAudioSpeech(input) {
  const res = await http.post(`/v1/audio/speech`, {
    model: 'tts-1',
    voice: "onyx",
    input,
  }, {
    responseType: 'blob',
  });
  return res
}
