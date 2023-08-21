import React, { useMemo, useState } from 'react'

const commonTabClassName =
  'flex-1 border-b text-base capitalize font-semibold cursor-pointer hover:bg-table-seperator transition-color duration-200 flex items-center justify-center text-center'
const tabClassName = `${commonTabClassName} border-table-t-weak text-table-t-strong`
const activeTabClassName = `${commonTabClassName} border-secondary text-secondary`

export const Tabs = ({ children }) => {
  const tabs = useMemo(
    () =>
      React.Children.map(children, (child, index) => ({
        index,
        title: child.props.title,
        tab: child,
      })),
    [children]
  )

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div className="w-full flex flex-col">
      <div
        id="tab-names"
        className="w-full flex items-stretch justify-around h-10"
      >
        {tabs.map((tab) => {
          return (
            <div
              key={tab.title}
              className={
                activeTabIndex === tab.index ? activeTabClassName : tabClassName
              }
              onClick={() => {
                setActiveTabIndex(tab.index)
              }}
            >
              {tab.title}
            </div>
          )
        })}
      </div>
      <div className="w-full">{tabs[activeTabIndex].tab}</div>
    </div>
  )
}

export const Tab = ({ title, children }) => {
  return (
    <div className="max-h-72 h-72 flex-shrink-0 overflow-y-scroll scrollbar-thumb-rounded-full bg-gray-100 bg-opacity-50 scrollbar-thin scrollbar-thumb-scrollbar">
      {children}
    </div>
  )
}
