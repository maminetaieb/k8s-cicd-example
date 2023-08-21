import React, { useState } from 'react'
import { useParams } from 'react-router'
import {
  BooleanText,
  Section,
  SectionItem,
  ErrorScreen,
  LoadingScreen,
  Tabs,
  Tab,
  SuspendButton,
  ConfirmModal,
} from '../../components/modelView'
import { FaMapMarkerAlt, FaMap } from 'react-icons/fa'
import { useSuspendUser, useUser } from '../../hooks'
import { PrimaryButton } from '../../components'
import {
  ListPlaceholder,
  PartnerListItem,
  RoundedImage,
  WorkTimesItem,
} from '../../components/modelView/UserLists'
import { Link } from 'react-router-dom'

export const UserView = () => {
  const { id } = useParams()
  const { data, isLoading, isError, isFetching } = useUser({ _id: id })
  const [modalVisible, setModalVisible] = useState(false)

  const mutation = useSuspendUser({
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
          Loading user failed, most likely this user doesn't exist.
        </ErrorScreen>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-end justify-start space-x-3 pb-2 px-3">
            <div className="text-2xl text-secondary font-medium">{`${data.firstName} ${data.lastName}`}</div>
            <div className="text-sm text-table-t-weak flex space-x-1">
              <FaMapMarkerAlt />
              <div>
                {data.location
                  ? data.location.locationCode
                  : 'Location not available'}
              </div>
            </div>
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
              <div className="rounded-full flex-shrink-0 w-52 h-52 border border-table-seperator">
                <RoundedImage src={data.photo} alt={'profile'} />
              </div>
              <Section title="User infromation">
                <div className="grid grid-cols-3 gap-1 p-2 w-full">
                  <SectionItem title="Username" value={data.username} />
                  <SectionItem title="First name" value={data.firstName} />
                  <SectionItem title="Last name" value={data.lastName} />
                  <SectionItem
                    title="Email"
                    value={<a href={`mailto:${data.email}`}>{data.email}</a>}
                  />
                  <SectionItem
                    title="Phone number"
                    value={data.phone || 'N/A'}
                  />
                  <SectionItem
                    title="User Suspended (Banned)"
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

              <Section title="Address & location">
                <div className="grid grid-cols-3 gap-1 w-full p-2">
                  <SectionItem
                    title="Location Code"
                    value={
                      <span className="font-semibold">
                        {data.location ? data.location.locationCode : 'N/A'}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Building floor"
                    value={data.building?.floor || 'N/A'}
                  />
                  <SectionItem
                    title="Building door"
                    value={data.building?.door || 'N/A'}
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
                  {data.location?.location ? (
                    <Link
                      to={`/locate/user/?code=${data.location.locationCode}`}
                    >
                      <PrimaryButton>
                        <div className="flex whitespace-nowrap space-x-2">
                          <FaMap className="w-5 h-5" />
                          <div>View Location</div>
                        </div>
                      </PrimaryButton>
                    </Link>
                  ) : (
                    <div className="cursor-not-allowed">
                      <PrimaryButton disabled className="cursor-not-allowed">
                        <div className="flex whitespace-nowrap space-x-2">
                          <FaMap className="w-5 h-5" />
                          <div>Location not available</div>
                        </div>
                      </PrimaryButton>
                    </div>
                  )}
                </div>
              </div>
              <hr className="w-full"></hr>

              <Tabs>
                <Tab title="Partners">
                  {data.partners.length !== 0 ? (
                    data.partners.map((partner) => (
                      <PartnerListItem key={partner._id} partner={partner} />
                    ))
                  ) : (
                    <ListPlaceholder>No partners found :(</ListPlaceholder>
                  )}
                </Tab>
                <Tab title="Workplaces">
                  {data.workPlaces.length !== 0 ? (
                    data.workPlaces.map((workplace) => (
                      <PartnerListItem
                        key={workplace._id}
                        partner={workplace}
                      />
                    ))
                  ) : (
                    <ListPlaceholder>No workplaces found :(</ListPlaceholder>
                  )}
                </Tab>
                <Tab title="Work times">
                  {data.workTimes.length !== 0 ? (
                    data.workTimes.map((workTime) => (
                      <WorkTimesItem
                        key={workTime._id}
                        partner={workTime.partner}
                        from={workTime.from}
                        to={workTime.to}
                        holiday={workTime.holiday}
                      />
                    ))
                  ) : (
                    <ListPlaceholder>No work times found :(</ListPlaceholder>
                  )}
                </Tab>
                <Tab title="Breaks">
                  {data.brakes.length !== 0 ? (
                    data.brakes.map((breakTimes) => (
                      <WorkTimesItem
                        key={breakTimes._id}
                        partner={breakTimes.partner}
                        from={breakTimes.from}
                        to={breakTimes.to}
                      />
                    ))
                  ) : (
                    <ListPlaceholder>No break times found :(</ListPlaceholder>
                  )}
                </Tab>
              </Tabs>

              <Section title="user statistics">
                <div className="grid grid-cols-3 gap-1 w-full p-2">
                  <SectionItem
                    title="Number of partners"
                    value={
                      <span className="font-semibold">
                        {data.partners.length}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of workplaces"
                    value={
                      <span className="font-semibold">
                        {data.workPlaces.length}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Number of feedbacks left"
                    value={
                      <span className="font-semibold">
                        {data.feedbacks.length}
                      </span>
                    }
                  />
                  <SectionItem
                    title="Is the user a Partner?"
                    value={<BooleanText value={data.isPartner} />}
                  />
                  <SectionItem
                    title="Is the user confirmed?"
                    value={<BooleanText value={data.confirmed} />}
                  />
                  <SectionItem
                    title="Is the user a Vendor?"
                    value={<BooleanText value={data.isVendor} />}
                  />
                </div>
              </Section>
            </div>
          </div>
          {modalVisible && (
            <ConfirmModal
              title={`Are you sure you want to ${
                data?.isSuspended ? 'unban' : 'ban'
              } "${data?.username}" ?`}
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
