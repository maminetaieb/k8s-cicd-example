import {
  City,
  Location,
  Partner,
  Region,
  Service,
  User,
  Domain,
  Access,
  Deposit,
  Category,
} from '../../models/shared'
import axios from 'axios'
import { UserEntity, Users } from './types/userType'

/**
 * Script to populate the database with random models so it can be used for testing
 */

const getRandomUser = async (count: number): Promise<UserEntity[]> => {
  const url = `https://randomuser.me/api/?results=${count}&noinfo`
  const response = await axios.get(url)
  const data: Users = response.data

  return data.results ?? []
}

const getUser = (randomUser: UserEntity) => {
  const user = new User({
    username: randomUser.login.username,
    firstName: randomUser.name.first,
    lastName: randomUser.name.last,
    email: randomUser.email,
    password: randomUser.login.password,
    phone: randomUser.phone,
    photo: randomUser.picture.medium,
    feedbacks: [],
    workPlaces: [],
    partners: [],
    workTimes: [],
    brakes: [],
    joined: new Date(),
    isPartner: true,
    confirmed: true,
    isVendor: false,
    building: {
      door: randomUser.location.street.name,
      floor: randomUser.location.street.number,
    },
    firstLogin: true,
    locationState: true,
  })

  return user
}

const createPartner = async () => {
  const users = await getRandomUser(3)
  // location, feedbacks, workplaces, partners, worktimes, breaks,
  const user = users[0]
  const deliverUser = users[1]
  const managerUser = users[2]

  const userModel = getUser(user)
  const deliverUserModel = getUser(deliverUser)
  const managerUserModel = getUser(managerUser)

  const location = new Location({
    locationCode: 'abcd',
    user: userModel,
    location: {
      latitude: Number.parseFloat(user.location.coordinates.latitude),
      longitude: Number.parseFloat(user.location.coordinates.longitude),
    },
  })

  //@ts-ignore
  userModel.location = location

  const deposit = new Deposit({
    name: user.login.username,
    deliveryOrders: [],
    localisation: {
      lng: Number.parseFloat(user.location.coordinates.longitude),
      lat: Number.parseFloat(user.location.coordinates.latitude),
    },
    managers: [managerUserModel],
  })

  // partner
  const access = new Access({
    manager: managerUserModel,
    access: {
      dashboard: [true, false][Math.floor(Math.random() * 2)],
      settings: [true, false][Math.floor(Math.random() * 2)],
      statistics: [true, false][Math.floor(Math.random() * 2)],
      deliverers: [true, false][Math.floor(Math.random() * 2)],
      orders: {
        toBePickedUp: [true, false][Math.floor(Math.random() * 2)],
        toBeDelivered: [true, false][Math.floor(Math.random() * 2)],
        toBeReturned: [true, false][Math.floor(Math.random() * 2)],
        history: [true, false][Math.floor(Math.random() * 2)],
      },
      deposits: [deposit],
    },
  })

  const domain = new Domain({
    name: {
      fr: `random service, ${Math.random()}`,
      en: `random service, ${Math.random()}`,
    },
    services: [],
    type: ['shopping', 'food', 'service'][Math.floor(Math.random() * 3)],
    status: [true, false][Math.floor(Math.random() * 2)],
  })

  const region = new Region({
    regionName: deliverUser.location.state,
    services: [],
  })

  const service = new Service({
    serviceName: {
      fr: [`service randome, ${Math.random()}`],
      en: `random service, ${Math.random()}`,
    },
    deliveryType: ['local', 'distant'][Math.floor(Math.random() * 2)],
    isFood: [true, false][Math.floor(Math.random() * 2)],
    domain: domain,
    percentage: Math.floor(Math.random() * 101),
    partnersRegions: [
      {
        region: region,
        partners: [user],
      },
    ],
    icon: user.picture.thumbnail,
  })

  //@ts-ignore
  region.services.push(service)

  const city = new City({
    cityName: deliverUser.location.city,
    regions: [region],
  })

  const category = new Category({
    name: ['food', 'trade', 'furniture'][Math.floor(Math.random() * 2)],
    subCategories: [],
  })

  const partner = new Partner({
    description: 'This is a description, its really cool.',
    profileImage: user.picture.medium,
    backgroundImage: user.picture.large,
    images: [user.picture.medium],
    deliverers: [
      {
        user: deliverUserModel,
        pseudoname: deliverUser.name.first,
        type: ['collect', 'delivery', 'both'][Math.floor(Math.random() * 3)],
        workingCities: [city],
        duringDelivery: [true, false][Math.floor(Math.random() * 2)],
        path: {
          currentPosition: {
            lng: Number.parseFloat(deliverUser.location.coordinates.longitude),
            lat: Number.parseFloat(deliverUser.location.coordinates.latitude),
          },
          targetPosition: {
            lng: Number.parseFloat(user.location.coordinates.longitude),
            lat: Number.parseFloat(user.location.coordinates.latitude),
          },
        },
      },
    ], //updated field
    owner: userModel,
    managers: [
      {
        user: managerUserModel,
        notes: 'very important notes, so important',
        pseudoname: managerUser.name.first,
        access: access,
      },
    ], //updated Field
    rating: Math.random() * 5,
    services: service,
    domain: domain,
    partnerName: `The ${user.name.last} brothers`,
    website: `${user.login.username}.tn`,
    instagram: `https://instagram.com/${user.login.username}`,
    isDeliveryDistantPartner: [true, false][Math.floor(Math.random() * 2)],
    isDeliveryLocalPartner: [true, false][Math.floor(Math.random() * 2)],
    youtube: `https://youtube.com/u/${user.login.username}`,
    facebook: `https://facebook.com/${user.login.username}`,
    patentent: `https://what.com/${user.login.username}`,
    returnRules: [
      'Allow returns up to 7 days',
      'No returns',
      'Allow returns after 24 hours',
    ][Math.floor(Math.random() * 3)],
    workingDays: {
      from: ['sunday', 'monday', 'tuesday'][Math.floor(Math.random() * 3)],
      to: ['friday', 'saturday'][Math.floor(Math.random() * 2)],
    },
    workingHours: {
      from: ['8:00', '9:00'][Math.floor(Math.random() * 2)],
      to: ['22:00', '23:00'][Math.floor(Math.random() * 2)],
    },
    email: user.email,
    rules: 'you know the rules and so do i',
    localisation: {
      lng: Number.parseFloat(user.location.coordinates.longitude),
      lat: Number.parseFloat(user.location.coordinates.latitude),
    },
    delivery: {
      cities: [
        {
          city: city,
          deliveryPrice: Math.floor(Math.random() * 20),
          deliveryTime: {
            from: ['8:00', '9:00'][Math.floor(Math.random() * 2)],
            to: ['22:00', '23:00'][Math.floor(Math.random() * 2)],
          },
        },
      ],
      regions: [region],
    },
    phone: user.phone,
    categories: [category],
    views: [new Date(), new Date()],
    holiday: [true, false][Math.floor(Math.random() * 2)],
    itemsPurchased: [new Date(), new Date()],
    socialReason: 'social reasons',
    questionOne: 'what is your name?',
    joined: new Date(),
    questionTwo: 'what is the meaning of life?',
    percentage: Math.floor(Math.random() * 101),
    confirmed: [true, false][Math.floor(Math.random() * 2)],
  })

  //@ts-ignore
  userModel.partners.push(partner)
  //@ts-ignore
  access.partner = partner
  //@ts-ignore
  deposit.partner = partner
  //@ts-ignore
  category.partner = partner

  // insert all to the database
  await userModel.save()
  await partner.save()
  await access.save()
  await category.save()
  await deposit.save()
  await location.save()
  await domain.save()
  await city.save()
  await deliverUserModel.save()
  await managerUserModel.save()
}

const createPartners = async (count: number) => {
  for (let i = 0; i < count; i++) {
    try {
      await createPartner()
      await new Promise((res, rej) => setTimeout(res, 200))
      console.log(`created partner ${i}.`)
    } catch (error: unknown) {
      console.error(error)
      break
    }
  }
}

const main = async () => {
  createPartners(100)
}

main()
