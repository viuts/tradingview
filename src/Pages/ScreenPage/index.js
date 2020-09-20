import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiBasicTable,
  EuiButton,
  EuiTextArea,
  EuiLink,
} from '@elastic/eui'

const ScreenPage = ({
  stockStore,
}) => {
  const [text, setText] = useState('')
  const tableRef = useRef()

  const onSelectItem = (item) => {
    if (!stockStore.selected.find(row => row.TICKER === item.TICKER)) {
      const selected = [
        ...stockStore.selected,
        stockStore.items.find(row => row.TICKER === item.TICKER),
      ]

      tableRef.current.setSelection(selected)
    }
  }

  const openItem = (item) => {
    stockStore.setCurrent(item)
    const popup = window.open(item.LINK, 'chart', 'width=1920,height=600')
    popup.blur()
    window.focus()
    onSelectItem(item)
  }

  const onKeyPress = () => {
    // Trigger the button element with a click
    let currentIndex = -1
    if (stockStore.current) {
      currentIndex = stockStore.items.findIndex(item => item.TICKER === stockStore.current.TICKER)
    }

    // already reached last
    if (currentIndex === stockStore.items.length - 1) {
      return
    }
    // Open next item
    const nextItem = stockStore.items[currentIndex + 1]
    openItem(nextItem)
  }

  useEffect(() => {
    window.addEventListener('keyup', (event) => {
      // Number 13 is the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault()
        onKeyPress()
      }
    })
  }, [])

  const columns = stockStore.columns.map((col) => {
    if (col.field === 'LINK') {
      return {
        ...col,
        sortable: false,
        render: (value, item) => (
          <EuiLink
            color="accent"
            onClick={(e) => {
              e.preventDefault()
              openItem(item)
            }}
          >
            Link
          </EuiLink>
        ),
      }
    }

    return col
  })

  const onTableChange = ({ sort = {} }) => {
    stockStore.setSort(sort.field)
    stockStore.setDirection(sort.direction)
  }

  const sorting = {
    sort: {
      field: stockStore.sort,
      direction: stockStore.direction,
    },
  }

  const onSelectionChange = (selected) => {
    stockStore.setSelected(selected)
  }

  const selection = {
    selectable: () => true,
    onSelectionChange,
  }

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageContent>
          {columns.length === 0 && (
            <>
              <EuiTextArea
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <EuiButton
                onClick={() => {
                  stockStore.addByCsv(text)
                }}
              >
                Add
              </EuiButton>
            </>
          )}
          {columns.length > 0 && stockStore.items.length > 0 && (
            <EuiBasicTable
              ref={tableRef}
              columns={columns}
              itemId="TICKER"
              rowHeader="TICKER"
              items={stockStore.items}
              sorting={sorting}
              onChange={onTableChange}
              isSelectable
              selection={selection}
              rowProps={(item) => {
                if (stockStore.current && item.TICKER === stockStore.current.TICKER) {
                  return {
                    style: {
                      background: '#FFFFE0',
                    },
                  }
                }

                return {}
              }}
            />
          )}
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}

ScreenPage.propTypes = {
  stockStore: PropTypes.object.isRequired,
}

export default inject('stockStore')(observer(ScreenPage))
