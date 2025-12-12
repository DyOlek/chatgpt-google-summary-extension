import { getProviderConfigs, Language } from '@/config'
import { getSummaryPrompt } from '@/content-script/prompt'
import { videoPrompt, videoSummaryPromptHightligt } from '@/utils/prompt'
import { getLangOptionsWithLink, getConverTranscript } from '@/content-script/utils'
import { queryParam } from 'gb-url'

export default async function getQuestion() {
  const providerConfigs = await getProviderConfigs()

  const videoId = queryParam('v', window.location.href)

  if (!videoId) {
    return ''
  }

  // Get Transcript Language Options & Create Language Select Btns
  const langOptionsWithLink = await getLangOptionsWithLink(videoId)

  const transcriptList = await getConverTranscript({ langOptionsWithLink, videoId, index: 0 })

  const videoTitle = document.title
  // const videoUrl = window.location.href

  const transcript = (
    transcriptList.map((v) => {
      return `${v.text}`
    }) || []
  ).join('')

  const Instructions = videoSummaryPromptHightligt

  const queryText = videoPrompt({
    title: videoTitle,
    transcript: getSummaryPrompt(transcript, providerConfigs.provider),
    language: 'ru',
    prompt: Instructions,
  })

  return {
    question: transcript.length > 0 ? queryText : '',
    transcript: transcriptList,
    langOptionsWithLink,
  }
}
