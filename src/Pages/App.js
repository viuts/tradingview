import React from 'react'
import { Provider as MobxProvider } from 'mobx-react'

import { rootStore } from '../Stores'

import Header from '../Components/Header'
import SimulatorPage from './ScreenPage'

const App = () => (
  <MobxProvider {...rootStore}>
    <>
      <Header />
      <SimulatorPage />
    </>
  </MobxProvider>
)

export default App
