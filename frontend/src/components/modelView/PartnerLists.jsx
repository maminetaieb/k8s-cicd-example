import React from 'react'
import { FaMap } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BooleanText, RoundedImage } from '.'
import { PrimaryButton } from '..'
import { getLocationHref } from '../../utils'

const getDeliveryTypeString = (type) => {
  switch (type) {
    case 'collect':
      return 'collect only'
    case 'delivery':
      return 'delivery only'
    case 'both':
      return 'collect & delivery'
    default:
      return 'No delivery type'
  }
}
/*
  access: {
    dashboard: { type: Boolean, default: false },
    settings: { type: Boolean, default: false },
    statistics: { type: Boolean, default: false },
    deliverers: { type: Boolean, default: false },
    orders: {
      toBePickedUp: { type: Boolean, default: false },
      toBeDelivered: { type: Boolean, default: false },
      toBeReturned: { type: Boolean, default: false },
      history: { type: Boolean, default: false },
    },
    deposits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deposit' }],
  },
 */

const getAccessList = (access) => {
  if (!access) return <div className="text-error">No access</div>

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="space-x-1 capitalize contents">
        <div className="">Dashboard:</div>
        <div className="">
          <BooleanText value={access.dashboard} />
        </div>
      </div>
      <div className="space-x-1 capitalize contents">
        <div className="">settings:</div>
        <div className="">
          <BooleanText value={access.settings} />
        </div>
      </div>
      <div className="space-x-1 capitalize contents">
        <div className="">statistics:</div>
        <div className="">
          <BooleanText value={access.statistics} />
        </div>
      </div>
      <div className="space-x-1 capitalize contents">
        <div className="">deliverers:</div>
        <div className="">
          <BooleanText value={access.deliverers} />
        </div>
      </div>
      <div className="space-x-1 capitalize contents">
        <div className="">Orders to be picked up:</div>
        <div className="">
          <BooleanText value={access.orders.toBePickedUp} />
        </div>
      </div>
      <div className="space-x-1 capitalize contents">
        <div className="">Orders to be Delivered:</div>
        <div className="">
          <BooleanText value={access.orders.toBeDelivered} />
        </div>
      </div>
      <div className="space-x-1 capitalize contents">
        <div className="">Orders to be returned:</div>
        <div className="">
          <BooleanText value={access.orders.toBeReturned} />
        </div>
      </div>
      <div className="space-x-1 capitalize contents">
        <div className="">Order history:</div>
        <div className="">
          <BooleanText value={access.orders.history} />
        </div>
      </div>
    </div>
  )
}

export const DelivererListItem = ({ deliverer }) => {
  if (!deliverer.user) return null
  if (!deliverer.user._id) return null

  return (
    <Link
      to={`/manage/users/${deliverer.user._id}`}
      className="bg-table-header border-b border-table-seperator p-2 flex w-full space-x-2 hover:bg-table-seperator transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 ">
          <RoundedImage
            src={deliverer.user.photo}
            alt={deliverer.user.username}
          />
        </div>
        <div className="text-center p-1 text-xs text-table-t-strong">
          {`${deliverer.user?.firstName || ''} ${
            deliverer.user?.lastName || ''
          }`}
        </div>
      </div>
      <div className="flex flex-col w-full h-full justify-between space-y-3 p-2">
        <div className="text-base font-semibold text-table-t-stronger space-x-1 flex justify-between items-center">
          <div>
            {`${deliverer.user?.firstName || ''} ${
              deliverer.user?.lastName || ''
            }`}
            {deliverer.pseudoname ? (
              <span className="text-xs text-table-t-strong">{` - ${deliverer.pseudoname}`}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="text-sm text-success">
            {getDeliveryTypeString(deliverer.type)}
          </div>
        </div>
        <div className="text-sm">
          {deliverer.duringDelivery ? (
            <div className="text-success">
              Deliverer is currently during a delivery
            </div>
          ) : (
            <div className="text-error">
              Deliverer is not currently during a delivery
            </div>
          )}
        </div>
        <div className="text-sm self-end justify-self-end space-x-1">
          {deliverer.path?.currentPosition ? (
            <a
              href={getLocationHref(
                deliverer.path.currentPosition.lat,
                deliverer.path.currentPosition.lng
              )}
              target="_blank"
              rel="noreferrer"
            >
              <PrimaryButton className="max-h-10">
                <div className="flex whitespace-nowrap space-x-2">
                  <FaMap className="w-6 h-6" />
                  <div>View Current location</div>
                </div>
              </PrimaryButton>
            </a>
          ) : (
            <></>
          )}
          {deliverer.path?.targetPosition ? (
            <a
              href={getLocationHref(
                deliverer.path.targetPosition.lat,
                deliverer.path.targetPosition.lng
              )}
              target="_blank"
              rel="noreferrer"
            >
              <PrimaryButton className="max-h-10">
                <div className="flex whitespace-nowrap space-x-2">
                  <FaMap className="w-6 h-6" />
                  <div>View Target location</div>
                </div>
              </PrimaryButton>
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Link>
  )
}

export const ManagerListItem = ({ manager }) => {
  return (
    <Link
      to={`/manage/users/${manager.user._id}`}
      className="bg-table-header border-b border-table-seperator p-2 flex items-center w-full space-x-2 hover:bg-table-seperator transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 text-sm">
          <RoundedImage src={manager.user.photo} alt={manager.user.username} />
        </div>
        <div className="text-center p-1 text-xs text-table-t-strong">
          {`${manager.user?.firstName || ''} ${manager.user?.lastName || ''}`}
        </div>
      </div>
      <div className="flex flex-col w-full p-2 space-y-2">
        <div className="text-base font-semibold text-table-t-stronger space-x-1 flex items-center">
          <div>
            {`${manager.user?.firstName || ''} ${manager.user?.lastName || ''}`}
            {manager.pseudoname ? (
              <span className="text-xs text-table-t-strong">{` - ${manager.pseudoname}`}</span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full text-sm text-table-t-strong">
          {manager.notes || 'No notes left'}
        </div>
        <div className="w-full text-sm text-table-t-strong">
          {getAccessList(manager.access?.access)}
        </div>
      </div>
    </Link>
  )
}

export const DeliveryCityListItem = ({ city }) => {
  return (
    <div className="bg-table-header border-b border-table-seperator text-sm text-table-t-strong p-2 flex items-center justify-between w-full space-x-2">
      <div className="text-base capitalize font-semibold text-table-t-stronger space-x-1 flex items-center">
        {`${city.city.cityName}`}
      </div>
      <div className="justify-self-end">
        Delivery price:{' '}
        <span className="font-semibold">{city.deliveryPrice}</span>
      </div>
      <div className="justify-self-end">
        Delivery time:{' '}
        <span className="font-medium">{`From ${city.deliveryTime.from} To ${city.deliveryTime.to}`}</span>
      </div>
    </div>
  )
}
export const DeliveryRegionListItem = ({ region }) => {
  return (
    <div className="bg-table-header border-b border-table-seperator p-2 flex items-center justify-between w-full space-x-2">
      <div className="text-base text-table-t-stronger font-medium">
        {region.regionName}
      </div>
      <div className="text-xs text-table-t-weak">{`Has ${
        region.services?.length || 0
      } services.`}</div>
    </div>
  )
}

const ProductItem = ({ item }) => {
  return (
    <Link
      to={`/manage/products/${item._id}`}
      className="bg-table-header border-b border-table-seperator p-2 flex items-center w-full space-x-2 hover:bg-table-seperator transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 text-sm">
          <RoundedImage src={item.mainImage} alt={item.name} />
        </div>
        <div className="text-center p-1 text-xs text-table-t-strong">
          {`${item.name || 'N/A'}`}
        </div>
      </div>
      <div className="flex flex-col w-full p-2 space-y-2">
        <div className="text-base font-semibold text-table-t-stronger space-x-1 flex items-center">
          <div>{`${item.name || 'N/A'}`}</div>
        </div>
      </div>
    </Link>
  )
}

const SubCategory = ({ subCategory }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="text-xs text-table-t-weak border-b border-table-seperator p-1 pl-5">
        {subCategory.name}
      </div>
      {subCategory.products.map((item) => {
        return <ProductItem key={item._id} item={item} />
      })}
    </div>
  )
}

export const CategoryListItem = ({ category }) => {
  return (
    <div className="bg-table-header border-b border-table-seperator flex flex-col w-full ">
      <div className="flex items-center space-x-2 border-b border-table-seperator p-2">
        <div className="w-10 h-10 text-sm">
          <RoundedImage src={category.image} alt={category.image} />
        </div>
        <div className="text-base text-table-t-stronger font-medium">
          {category.name}
        </div>
      </div>
      <div className="">
        {category.subCategories.map((subCategory) => (
          <SubCategory key={subCategory._id} subCategory={subCategory} />
        ))}
      </div>
    </div>
  )
}
