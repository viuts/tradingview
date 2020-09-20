import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiBasicTable,
  EuiTextArea,
  EuiButton,
} from '@elastic/eui'

const ScreenPage = ({
  stockStore,
}) => {
  const [text, setText] = useState('')
  // const [popup, setPopup] = useState()

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageContent>
          <EuiTextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <EuiButton
            onClick={() => stockStore.addByCsv(text)}
          >
            Add
          </EuiButton>
          <EuiBasicTable
            columns={stockStore.columns}
            rowHeader="TICKER"
            items={stockStore.data}
          />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}

ScreenPage.propTypes = {
  stockStore: PropTypes.object.isRequired,
}

export default inject('stockStore')(observer(ScreenPage))
