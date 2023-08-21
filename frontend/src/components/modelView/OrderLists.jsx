import { Link } from 'react-router-dom'
import { RoundedImage } from '.'

export const ProductItem = ({ item }) => {
  return (
    <Link
      to={`/manage/products/${item.product._id}`}
      className="bg-table-header border-b border-table-seperator p-2 flex items-center w-full space-x-2 hover:bg-table-seperator transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 text-sm">
          <RoundedImage src={item.product.mainImage} alt={item.product.name} />
        </div>
        <div className="text-center p-1 text-xs text-table-t-strong">
          {`${item.product.name || 'N/A'}`}
        </div>
      </div>
      <div className="flex flex-col w-full p-2 space-y-2">
        <div className="text-base font-semibold text-table-t-stronger space-x-1 flex items-center">
          <div>{`${item.product.name || 'N/A'}`}</div>
        </div>
        <div className="w-full text-sm text-table-t-strong">
          {`Quantity: ${item.quantity || 'N/A'}`}
        </div>
      </div>
    </Link>
  )
}
