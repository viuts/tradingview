import React from 'react'
import { Provider as MobxProvider } from 'mobx-react'

import { rootStore } from '../Stores'

import Header from '../Components/Header'
import ScreenPage from './ScreenPage'

const App = () => (
  <MobxProvider {...rootStore}>
    <>
      <Header />
      <ScreenPage />
    </>
  </MobxProvider>
)

export default App
