import logo from '@/assets/img/logo.png'
import '@/assets/styles/base.scss'
import { APP_TITLE } from '@/config'
import './styles.scss'

function App() {
  return (
    <div className="glarity--flex glarity--flex-col glarity--h-full glarity--popup">
      <div className="glarity--mb-1 glarity--flex glarity--flex-row glarity--items-center glarity--px-1">
        <img src={logo} className="glarity--w-5 glarity--h-5 glarity--rounded-sm" />
        <p className="glarity--text-sm glarity--font-semibold glarity--m-0 glarity--ml-1">
          {APP_TITLE}
        </p>
      </div>
    </div>
  )
}

export default App
