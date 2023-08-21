import { React } from 'react'
import { IoClose } from 'react-icons/io5'

export const Modal = ({ title, children, close }) => {
  return (
    <div
      className={`fixed bg-gray-800 bg-opacity-70 w-screen h-screen inset-0 z-50`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col w-80 rounded-md bg-gray-700">
          <div className="flex justify-between items-center p-2">
            <div className="text-base">{title}</div>
            <div>
              <button
                className="outline-none focus:outline-none shadow-none"
                onClick={() => {
                  close()
                }}
              >
                <IoClose />
              </button>
            </div>
          </div>
          <div className="p-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
