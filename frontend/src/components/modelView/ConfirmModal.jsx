import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const ConfirmModal = ({
  cancel,
  confirm,
  title,
  children,
  isLoading,
}) => {
  const closeModal = () => {
    if (isLoading) return
    cancel()
  }

  return (
    <div
      onClick={() => closeModal()}
      className="fixed backdrop-filter backdrop-blur-sm cursor-pointer flex top-0 left-0 z-50 w-screen h-screen bg-opacity-50 bg-black items-center justify-center"
    >
      <div
        className="bg-page-background rounded-md md:max-w-xl sm:max-w-lg max-w-xs w-full flex flex-col p-3 cursor-auto items-center space-y-1"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          id="header"
          className="w-full text-lg text-secondary font-semibold flex items-center justify-between"
        >
          <div>{title}</div>
          <div>
            {isLoading && (
              <AiOutlineLoading3Quarters className="text-secondary w-7 h-7 px-1 animate-spin" />
            )}
          </div>
        </div>
        <hr className="w-full text-table-t-weak text-center" />
        <div className="w-full">{children}</div>
        <div className="w-full flex items-center justify-end mt-3 px-1 space-x-2">
          <button
            type="reset"
            className="text-secondary focus:outline-none rounded-md bg-page-background px-2 py-1 hover:bg-table-seperator border border-secondary text-sm"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            onClick={() => confirm()}
            className="text-page-background focus:outline-none rounded-md bg-secondary px-5 py-1 hover:bg-table-pagination-button-active border border-secondary text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
