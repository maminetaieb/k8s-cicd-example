import React, { useState } from 'react'
import { useParams } from 'react-router'
import { usePartner, useSuspendPartner } from '../../hooks'
import {
  BooleanText,
  Section,
  SectionItem,
  ErrorScreen,
  LoadingScreen,
  Tabs,
  Tab,
  ListPlaceholder,
  RoundedImage,
  SuspendButton,
  ConfirmModal,
} from '../../components/modelView'
import { FaMap } from 'react-icons/fa'
import { PrimaryButton } from '../../components'
import { getLocationHref } from '../../utils'
import { Link } from 'react-router-dom'
import {
  CategoryListItem,
  DelivererListItem,
  DeliveryCityListItem,
  DeliveryRegionListItem,
  ManagerListItem,
} from '../../components/modelView/PartnerLists'
import {
  SinglePartnerSalesByTime,
  SinglePartnerViewsByTime,
} from '../../components/analytics'

export const PartnerView = () => {
  const { id } = useParams()
  const { data, isLoading, isError, isFetching } = usePartner({ _id: id })
  const [modalVisible, setModalVisible] = useState(false)

  const mutation = useSuspendPartner({
    id,
    value: !data?.isSuspended,
    onSuccess: () => {
      setModalVisible(false)
    },
  })

  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>
          Loading partner failed, most likely this partner doesn't exist.
        </ErrorScreen>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center justify-start space-x-3 pb-2 px-3">
            <div className="text-2xl text-secondary font-semibold capitalize">{`${data.partnerName}`}</div>
            {data.isSuspended ? (
              <div className="text-xl text-error font-bold uppercase">
                [BANNED]
              </div>
            ) : null}
          </div>
          <div className="w-full h-full flex flex-col md:flex-row md:justify-evenly md:space-x-3">
            <div
              id="left-side"
              className="md:w-1/2 w-full md:max-w-md flex flex-col items-center p-2 space-y-3"
            >
              <div className="rounded-full w-52 h-52 flex-shrink-0 border border-table-seperator">
                <RoundedImage src={data.profileImage} alt={'profile'} />
              </div>
              <Section title="Partner infromation">
                <div className="grid grid-cols-3 gap-1 p-2 w-full">
                  <SectionItem title="Partner Name" value={data.partnerName} />
                  <SectionItem
                    title="Owner"
                    value={
                      <Link
                        to={
                          data.owner ? `/manage/users/${data.owner._id}` : '#'
                        }
                      >
                        <span className="text-secondary text-semibold underline">{`${data.owner?.firstName} ${data.owner?.lastName}`}</span>
                      </Link>
                    }
                  />
                  <SectionItem title="Email" value={data.email || 'N/A'} />
                  <SectionItem
                    title="Phone number"
                    value={data.phone || 'N/A'}
                  />
                  <SectionItem
                    title="Suspended (Banned)"
                    value={<BooleanText value={data.isSuspended} />}
                  />
                  <SectionItem
                    title="Join date"
                    value={
                      data.joined
                        ? new Date(Date.parse(data.joined)).toDateString()
                        : 'N/A'
                    }
                  />
                </div>
              </Section>
              <Section title="">
                <div className="grid grid-cols-3 gap-1 p-2 w-full">
                  <SectionItem
                    title="Is the delivery a distant partner?"
                    value={
                      <BooleanText value={data.isDeliveryDistantPartner} />
                    }
                  />
                  <SectionItem
                    title="Is the delivery a local partner?"
                    value={<BooleanText value={data.isDeliveryLocalPartner} />}
                  />
                </div>
              </Section>
              <Section title="partner statistics">
                <div className="grid grid-cols-3 gap-1 w-full p-2">
                  <SectionItem
                    title="Rating"
                    value={
                      <span className="font-semibold">
                        {data.rating
                          ? Number.parseFloat(data.rating).toFixed(2)
                          : 'N/A'}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of deliverers"
                    value={
                      <span className="font-semibold">
                        {data.deliverers.length}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of managers"
                    value={
                      <span className="font-semibold">
                        {data.managers.length}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of categories"
                    value={
                      <span className="font-semibold">
                        {data.categories.length}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of views"
                    value={
                      <span className="font-semibold">{data.views.length}</span>
                    }
                  />
                  <SectionItem
                    title="Number of items purchased"
                    value={
                      <span className="font-semibold">
                        {data.itemsPurchased.length}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of delivery cities"
                    value={
                      <span className="font-semibold">
                        {data.delivery?.cities?.length || 'N/A'}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of delivery regions"
                    value={
                      <span className="font-semibold">
                        {data.delivery?.regions?.length || 'N/A'}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Percentage"
                    value={
                      <span className="font-semibold">
                        {data.percentage ? `${data.percentage}%` : 'N/A'}
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
              <hr className="w-full"></hr>
              <div className="p-1 text-table-t-stronger flex flex-col">
                <div className="text-xs text-table-t-weak"></div>
                <div className="w-full justify-self-end flex items-center justify-start space-x-1">
                  <SuspendButton
                    isSuspended={data.isSuspended}
                    onClick={() => setModalVisible(true)}
                    isLoading={isFetching || isLoading || mutation.isLoading}
                  />
                  {data.localisation ? (
                    <a
                      href={getLocationHref(
                        data.localisation.lat,
                        data.localisation.lng
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PrimaryButton className="">
                        <div className="flex whitespace-nowrap space-x-2">
                          <FaMap className="w-5 h-5" />
                          <div>View Location</div>
                        </div>
                      </PrimaryButton>
                    </a>
                  ) : (
                    <PrimaryButton disabled className="cursor-not-allowed">
                      <div className="flex whitespace-nowrap space-x-2">
                        <FaMap className="w-5 h-5" />
                        <div>Location not available</div>
                      </div>
                    </PrimaryButton>
                  )}
                </div>
              </div>
              <Section title="description">
                <div className="text-sm p-2 w-full">
                  {data.description || 'No description'}
                </div>
              </Section>
              <Tabs>
                <Tab title="Managers">
                  {data.managers.length !== 0 ? (
                    data.managers.map((manager) => (
                      <ManagerListItem
                        key={manager.user._id}
                        manager={manager}
                      />
                    ))
                  ) : (
                    <ListPlaceholder>No managers found :(</ListPlaceholder>
                  )}
                </Tab>
                <Tab title="Deliverers">
                  {data.deliverers.length !== 0 ? (
                    data.deliverers.map((deliverer) => (
                      <DelivererListItem
                        key={deliverer.user._id}
                        deliverer={deliverer}
                      />
                    ))
                  ) : (
                    <ListPlaceholder>No deliverers found :(</ListPlaceholder>
                  )}
                </Tab>
                <Tab title="Cities">
                  {data.delivery.cities.length !== 0 ? (
                    data.delivery.cities.map((city) => (
                      <DeliveryCityListItem key={city._id} city={city} />
                    ))
                  ) : (
                    <ListPlaceholder>No cities found :(</ListPlaceholder>
                  )}
                </Tab>
                <Tab title="Regions">
                  {data.delivery.regions.length !== 0 ? (
                    data.delivery.regions.map((region) => (
                      <DeliveryRegionListItem
                        key={region._id}
                        region={region}
                      />
                    ))
                  ) : (
                    <ListPlaceholder>No regions found :(</ListPlaceholder>
                  )}
                </Tab>
                <Tab title="Categories">
                  {data.categories.length !== 0 ? (
                    data.categories.map((category) => (
                      <CategoryListItem
                        key={category._id}
                        category={category}
                      />
                    ))
                  ) : (
                    <ListPlaceholder>No categories found :(</ListPlaceholder>
                  )}
                </Tab>
              </Tabs>

              <Section title="Analytics & Graphs">
                <div className="space-y-5 p-2">
                  <SinglePartnerSalesByTime id={data._id} />
                  <SinglePartnerViewsByTime id={data._id} />
                </div>
              </Section>
              <Section title="social media">
                <div className="grid grid-cols-3 gap-1 w-full p-2">
                  <SectionItem
                    title="Website"
                    value={
                      data.website ? (
                        <a
                          href={data.website}
                          className="text-secondary underline font-semibold"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.website}
                        </a>
                      ) : (
                        'N/A'
                      )
                    }
                  />
                  <SectionItem
                    title="Youtube"
                    value={
                      data.youtube ? (
                        <a
                          href={data.youtube}
                          className="text-secondary underline font-semibold"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.youtube}
                        </a>
                      ) : (
                        'N/A'
                      )
                    }
                  />
                  <SectionItem
                    title="Facebook"
                    value={
                      data.facebook ? (
                        <a
                          href={data.facebook}
                          className="text-secondary underline font-semibold"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.facebook}
                        </a>
                      ) : (
                        'N/A'
                      )
                    }
                  />
                  <SectionItem
                    title="Instagram"
                    value={
                      data.instagram ? (
                        <a
                          href={data.instagram}
                          className="text-secondary underline font-semibold"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.instagram}
                        </a>
                      ) : (
                        'N/A'
                      )
                    }
                  />
                </div>
              </Section>
            </div>
          </div>
          {modalVisible && (
            <ConfirmModal
              title={`Are you sure you want to ${
                data?.isSuspended ? 'unban' : 'ban'
              } "${data?.partnerName}" ?`}
              cancel={() => setModalVisible(false)}
              confirm={() => {
                mutation.mutate()
              }}
              isLoading={mutation.isLoading}
            >
              <span className="text-table-t-stronger text-base py-2">
                By confirming, this user's account will be{' '}
                {data?.isSuspended ? 'unsuspended' : 'suspended'}.
              </span>
            </ConfirmModal>
          )}
        </div>
      )}
    </div>
  )
}
