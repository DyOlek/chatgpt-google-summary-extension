import { render } from 'preact'
import ChatGPTContainer from '@/content-script/compenents/ChatGPTContainer'
import { waitForElm } from '@/content-script/utils'

interface MountProps {
  question: string | null
  transcript?: unknown
  langOptionsWithLink?: unknown
}

export default async function mount(props: MountProps) {
  const { question, transcript, langOptionsWithLink } = props

  if (document.querySelector('section.glarity--container')) {
    document.querySelector('section.glarity--container')?.remove()
  }

  const container = document.createElement('section')
  container.className = 'b_glarity glarity--container gpt--light'
  container.id = 'glarity--container'

  container.classList.add('glarity--chatgpt--youtube')
  waitForElm('#secondary.style-scope.ytd-watch-flexy').then(() => {
    document.querySelector('#secondary.style-scope.ytd-watch-flexy')?.prepend(container)
  })

  render(
    <ChatGPTContainer
      question={question}
      transcript={transcript}
      langOptionsWithLink={langOptionsWithLink}
      triggerMode="always"
    />,
    container,
  )
}
