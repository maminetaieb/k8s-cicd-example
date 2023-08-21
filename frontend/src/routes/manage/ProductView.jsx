import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {
  BooleanText,
  ErrorScreen,
  ListPlaceholder,
  LoadingScreen,
  RoundedImage,
  Section,
  SectionItem,
  Tab,
  Tabs,
} from '../../components/modelView'
import { VariantListItem } from '../../components/modelView/ProductLists'
import { useProduct } from '../../hooks'

export const ProductView = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useProduct({ _id: id })

  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>
          Loading user failed, most likely this user doesn't exist.
        </ErrorScreen>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center space-x-3 pb-2 px-3">
            <div className="text-2xl text-secondary font-semibold capitalize">{`Product - ${data.name}`}</div>
            <div className="font-light text-base text-table-t-weak">{`[${
              data.stock || 0
            } left in stock]`}</div>
          </div>
          <div className="w-full flex items-end justify-start space-x-3 pb-2 px-3">
            <div className="w-full h-full flex flex-col md:flex-row md:justify-evenly md:space-x-3">
              <div
                id="left-side"
                className="md:w-1/2 w-full md:max-w-md flex flex-col items-center p-2 space-y-3"
              >
                <div className="rounded-full w-52 h-52 flex-shrink-0 border border-table-seperator">
                  <RoundedImage src={data.mainImage} alt={'product'} />
                </div>
                <Section title="Product infromation">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="Product Name"
                      value={data.name || 'N/A'}
                    />
                    <SectionItem
                      title="From partner"
                      value={
                        <Link
                          to={
                            data.partner
                              ? `/manage/partners/${data.partner._id}`
                              : '#'
                          }
                        >
                          <span className="text-secondary text-semibold underline">{`${data.partner?.partnerName}`}</span>
                        </Link>
                      }
                    />
                    <SectionItem
                      title="Base price"
                      value={
                        <span className="font-semibold">
                          {data.basePrice ?? 'N/A'}
                        </span>
                      }
                    />
                    <SectionItem
                      title="Discount"
                      value={
                        <span className="font-semibold">
                          {data.discount ?? 'N/A'}
                        </span>
                      }
                    />
                    <SectionItem
                      title="Dimensions"
                      value={
                        ![null, undefined].includes(data.dimension) ? (
                          <span className="font-semibold">
                            {data.dimension}
                          </span>
                        ) : (
                          'N/A'
                        )
                      }
                    />
                    <SectionItem title="Type" value={data.type || 'N/A'} />
                    <SectionItem
                      title="Added date"
                      value={
                        data.date
                          ? new Date(Date.parse(data.date)).toDateString()
                          : 'N/A'
                      }
                    />
                    <SectionItem
                      title="Weight/mass"
                      value={
                        <span className="font-semibold">
                          {data.weight || 'N/A'}
                        </span>
                      }
                    />
                    <SectionItem
                      title="Is the product active?"
                      value={<BooleanText value={data.isActive} />}
                    />
                    <SectionItem
                      title="Quantity in stock"
                      value={
                        <span className="font-semibold">{data.stock || 0}</span>
                      }
                    />
                    <SectionItem
                      title="Number of views"
                      value={
                        <span className="font-semibold">
                          {data.views?.length || 0}
                        </span>
                      }
                    />
                  </div>
                </Section>
              </div>
              <div
                id="right-side"
                className="flex-1 max-w-4xl md:mx-auto p-2 space-y-2"
              >
                <Section title="Short description">
                  <div className="text-sm text-table-t-stronger p-2">
                    {data.shortDescription || 'Description not available.'}
                  </div>
                </Section>
                <Section title="Full description">
                  <div className="text-sm text-table-t-stronger p-2">
                    {data.description || 'Description not available.'}
                  </div>
                </Section>
                <Tabs>
                  <Tab title="Variants">
                    {data.variants.length !== 0 ? (
                      data.variants.map((variant) => (
                        <VariantListItem key={variant._id} variant={variant} />
                      ))
                    ) : (
                      <ListPlaceholder>No variants found :(</ListPlaceholder>
                    )}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
