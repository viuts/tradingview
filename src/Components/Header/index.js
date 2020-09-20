import React from 'react'

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
} from '@elastic/eui'

export default () => (
  <EuiHeader>
    <EuiHeaderSectionItem border="right">
      <EuiHeaderLogo iconType="help" href="#">Tradingview</EuiHeaderLogo>
    </EuiHeaderSectionItem>
  </EuiHeader>
)
