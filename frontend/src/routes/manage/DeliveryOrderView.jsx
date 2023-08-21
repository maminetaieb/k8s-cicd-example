import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {
  BooleanText,
  ErrorScreen,
  LoadingScreen,
  Section,
  SectionItem,
} from '../../components/modelView'
import { useDeliveryOrder } from '../../hooks'

export const DeliveryOrderView = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useDeliveryOrder({ _id: id })

  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>
          Loading delivery order failed, most likely this delivery order doesn't
          exist.
        </ErrorScreen>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="text-2xl text-secondary font-semibold capitalize">
            {`Delivery Order - `}
            <span className="font-mono">{data._id}</span>
          </div>

          <div className="w-full flex items-end justify-start space-x-3 pb-2 px-3">
            <div className="w-full h-full flex flex-col md:flex-row md:justify-evenly md:space-x-3">
              <div
                id="left-side"
                className="md:w-1/2 w-full md:max-w-md flex flex-col items-center p-2 space-y-3"
              >
                <Section title="Delivery Order infromation">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Ordered by"
                      value={
                        data.client ? (
                          <Link to={`/manage/users/${data.client._id}`}>
                            <span className="text-secondary text-semibold underline">{`${data.client.firstName} ${data.client.lastName}`}</span>
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }
                    />

                    <SectionItem
                      title="From partner"
                      value={
                        data.partner ? (
                          <Link to={`/manage/partners/${data.partner._id}`}>
                            <span className="text-secondary text-semibold underline">{`${data.partner.partnerName}`}</span>
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }
                    />
                    <SectionItem
                      title="Phone number"
                      value={data.phone || 'N/A'}
                    />
                    <SectionItem
                      title="Order date"
                      value={
                        data.orderDate
                          ? new Date(Date.parse(data.orderDate)).toDateString()
                          : 'N/A'
                      }
                    />
                    <SectionItem
                      title="Order time"
                      value={
                        data.orderDate
                          ? new Date(Date.parse(data.orderDate)).toTimeString()
                          : 'N/A'
                      }
                    />
                    <SectionItem
                      title="Delivery Type"
                      value={<span className="font-semibold">{data.type}</span>}
                    />
                    <SectionItem
                      title="Order Type"
                      value={
                        <span className="font-semibold">{data.orderType}</span>
                      }
                    />
                    <SectionItem
                      title="Price"
                      value={
                        <span className="font-semibold">{data.price}</span>
                      }
                    />
                    <SectionItem
                      title="Purchase Order"
                      value={
                        data.purchaseOrder ? (
                          <Link to={`/manage/orders/${data.purchaseOrder._id}`}>
                            <span className="text-secondary text-semibold underline">
                              Here
                            </span>
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }
                    />
                  </div>
                </Section>
              </div>
              <div
                id="right-side"
                className="flex-1 max-w-4xl md:mx-auto p-2 space-y-2"
              >
                <Section title="">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Status"
                      value={
                        <span className="font-mono text-success text-base">
                          {data.status}
                        </span>
                      }
                    />
                  </div>
                </Section>
                <Section title="Status">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Is the order delivered?"
                      value={<BooleanText value={data.delivered} />}
                    />
                    <SectionItem
                      title="Is the order in deposit?"
                      value={<BooleanText value={data.inDeposit} />}
                    />
                    <SectionItem
                      title="Is the deliverer rated?"
                      value={<BooleanText value={data.isRatedDeliverer} />}
                    />
                    <SectionItem
                      title="Is the order paid?"
                      value={<BooleanText value={data.payed} />}
                    />
                    <SectionItem
                      title="Is the order returned?"
                      value={<BooleanText value={data.retruned} />}
                    />
                  </div>
                </Section>
                <Section title="Location">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Delivery City"
                      value={<span className="font-semibold">{data.deliveryCity?.cityName || 'N/A'}</span>}
                    />
                    <SectionItem
                      title="Delivery Region"
                      value={<span className="font-semibold">{data.deliveryRegion?.regionName || 'N/A'}</span>}
                    />
                    <SectionItem
                      title="Collect City"
                      value={<span className="font-semibold">{data.collectCity?.cityName || 'N/A'}</span>}
                    />
                    <SectionItem
                      title="Collect Region"
                      value={<span className="font-semibold">{data.collectRegion?.regionName || 'N/A'}</span>}
                    />
                  </div>
                </Section>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
