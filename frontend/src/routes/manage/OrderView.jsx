import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {
  BooleanText,
  ErrorScreen,
  LoadingScreen,
  Section,
  SectionItem,
  Tab,
  Tabs,
} from '../../components/modelView'
import { ListPlaceholder } from '../../components/modelView'
import { ProductItem } from '../../components/modelView/OrderLists'
import { useOrder } from '../../hooks'

/**
 * // {"foodItems":[{"ingredients":["6073569b3898cb001765e3db","6073569b3898cb001765e3da","6073569b3898cb001765e3dd","6073569b3898cb001765e3dc"],"_id":"608c8d6a08a7a7001562e6ab","product":"6073569b3898cb001765e3ce","quantity":1}],"items":[],"__v":0,"city":"5ff1ce760fd8c500171206eb","deliveryOrder":"608df15b2a49ca001594c7ed","phone":"50505000","region":"5ff1ce980fd8c500171206ec"}
 */
export const OrderView = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useOrder({ _id: id })

  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>
          Loading order failed, most likely this order doesn't exist.
        </ErrorScreen>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="text-2xl text-secondary font-semibold capitalize">
            {`Order - `}
            <span className="font-mono">{data._id}</span>
          </div>
          <div className="w-full flex items-end justify-start space-x-3 pb-2 px-3">
            <div className="w-full h-full flex flex-col md:flex-row md:justify-evenly md:space-x-3">
              <div
                id="left-side"
                className="md:w-1/2 w-full md:max-w-md flex flex-col items-center p-2 space-y-3"
              >
                <Section title="Order infromation">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Order Type"
                      value={<span className="font-semibold">{data.type}</span>}
                    />
                    <SectionItem
                      title="Ordered by"
                      value={
                        <Link
                          to={
                            data.client
                              ? `/manage/users/${data.client._id}`
                              : '#'
                          }
                        >
                          <span className="text-secondary text-semibold underline">{`${data.client?.firstName} ${data.client?.lastName}`}</span>
                        </Link>
                      }
                    />
                    <SectionItem
                      title="Ordered from"
                      value={
                        data.partner ? (
                          <Link to={`/manage/partners/${data.partner._id}`}>
                            <span className="text-secondary text-semibold underline">{`${
                              data.partner.partnerName || 'N/A'
                            }`}</span>
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }
                    />
                    <SectionItem
                      title="Order price"
                      value={
                        <span className="font-semibold">{data.price}</span>
                      }
                    />
                    <SectionItem
                      title="Phone number"
                      value={data.phone || 'N/A'}
                    />
                    <SectionItem
                      title="Order date"
                      value={
                        data.date
                          ? new Date(Date.parse(data.date)).toDateString()
                          : 'N/A'
                      }
                    />
                    <SectionItem
                      title="Order time"
                      value={
                        data.date
                          ? new Date(Date.parse(data.date)).toTimeString()
                          : 'N/A'
                      }
                    />
                  </div>
                </Section>
                <Section title="">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Is the order active?"
                      value={<BooleanText value={data.actif} />}
                    />
                    <SectionItem
                      title="Is the order taken?"
                      value={<BooleanText value={data.taked} />}
                    />
                    <SectionItem
                      title="Is the order prepared?"
                      value={<BooleanText value={data.prepared} />}
                    />
                    <SectionItem
                      title="Is the order passed?"
                      value={<BooleanText value={data.passed} />}
                    />
                    <SectionItem
                      title="Is the order paid?"
                      value={<BooleanText value={data.payed} />}
                    />
                  </div>
                </Section>
              </div>
              <div
                id="right-side"
                className="flex-1 max-w-4xl md:mx-auto p-2 space-y-2"
              >
                <Tabs>
                  <Tab
                    title={
                      <div className="space-x-1">
                        <span>{`Items`}</span>
                        <span className="font-normal">{`(${
                          data.items?.length || 0
                        })`}</span>
                      </div>
                    }
                  >
                    {data.items.length !== 0 ? (
                      data.items.map((item) => (
                        <ProductItem key={item._id} item={item} />
                      ))
                    ) : (
                      <ListPlaceholder>The order has no items</ListPlaceholder>
                    )}
                  </Tab>
                  <Tab
                    title={
                      <div className="space-x-1">
                        <span>{`Food Items`}</span>
                        <span className="font-normal">{`(${
                          data.foodItems?.length || 0
                        })`}</span>
                      </div>
                    }
                  >
                    {data.foodItems.length !== 0 ? (
                      data.foodItems.map((item) => (
                        <ProductItem key={item._id} item={item} />
                      ))
                    ) : (
                      <ListPlaceholder>
                        The order has no food items
                      </ListPlaceholder>
                    )}
                  </Tab>
                </Tabs>
                <Section title="Order Location & Delivery">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Delivery order"
                      value={
                        <Link
                          to={
                            data.deliveryOrder
                              ? `/manage/delivery-orders/${data.deliveryOrder._id}`
                              : '#'
                          }
                        >
                          <span className="text-secondary text-semibold underline">{`Here`}</span>
                        </Link>
                      }
                    />
                    <SectionItem
                      title="Order City"
                      value={
                        <span className="font-semibold">
                          {data.region?.regionName || 'N/A'}
                        </span>
                      }
                    />
                    <SectionItem
                      title="Order Region"
                      value={
                        <span className="font-semibold">
                          {data.city?.cityName || 'N/A'}
                        </span>
                      }
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
