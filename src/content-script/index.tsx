import { render } from 'preact'
import '@/assets/styles/base.scss'
import { getUserConfig } from '@/config'
import ChatGPTTip from '@/content-script/compenents/ChatGPTTip'
import Browser from 'webextension-polyfill'
import mount from '@/content-script/compenents/Mount'
import getQuestion from './compenents/GetQuestion'
import '@/content-script/styles.scss'

async function Run() {
  const userConfig = await getUserConfig()

  const questionData = await getQuestion()
  if (questionData) {
    mount(questionData)
  }

  Browser.runtime.onMessage.addListener((message, _, sendResponse) => {
    const { type, data } = message
    switch (type) {
      case 'CHATGPT_TAB_CURRENT': {
        const container = document.createElement('section')
        container.className = 'glarity--chatgpt--tips'
        container.id = 'glarity--chatgpt--tips'
        document.body.prepend(container)
        render(<ChatGPTTip isLogin={data.isLogin} />, container)
        break
      }
      case 'GET_DOM': {
        sendResponse({ html: document.querySelector('html')?.outerHTML })
        break
      }
    }
  })
}

Run()

document.addEventListener('yt-navigate-finish', Run)
