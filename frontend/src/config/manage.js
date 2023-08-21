import {
  UserServices,
  PartnerServices,
  DeliveryOrderServices,
  FeedbackServices,
  ProductServices,
  OrderServices,
} from '../services'
import { BooleanText } from '../components/modelView'

const accessors = {
  boolean: (data, id) => {
    const boolean = data[id]
    switch (boolean) {
      case true:
      case 'true':
      case 1:
        return <BooleanText value={true} />

      case false:
      case 'false':
      case 0:
        return <BooleanText value={false} />

      default:
        return <span className="font-semibold">N/A</span>
    }
  },
  float: (data, id) => {
    const number = Number.parseFloat(data[id])

    if (Number.isNaN(number)) return null

    return number.toFixed(2)
  },
  percent: (data, id) => {
    const number = Number.parseFloat(data[id])
    if (number === undefined) return null

    return `${number.toFixed(2)}%`
  },
}

const manage = {
  users: {
    label: 'Manage Users',
    key: 'users',
    fetch: UserServices.getAll,
    columns: [
      {
        id: 'username',
        accessor: 'username',
        Header: 'Username',
        type: String,
      },
      {
        id: 'firstName',
        accessor: 'firstName',
        Header: 'First Name',
        type: String,
      },
      {
        id: 'lastName',
        accessor: 'lastName',
        Header: 'Last name',
        type: String,
      },
      {
        id: 'email',
        accessor: 'email',
        Header: 'Email',
        type: String,
      },
      {
        id: 'phone',
        accessor: 'phone',
        Header: 'Phone',
        type: String,
      },
      {
        id: `locationCode`,
        accessor: (d) => d.location?.locationCode || 'N/A',
        Header: 'Location Code',
        type: String,
        canQuery: false,
      },
      {
        id: 'isPartner',
        accessor: (d) => accessors.boolean(d, 'isPartner'),
        Header: 'Partner',
        type: Boolean,
      },
      {
        id: 'isSuspended',
        accessor: (d) => accessors.boolean(d, 'isSuspended'),
        Header: 'Suspended',
        type: Boolean,
      },
      {
        id: 'confirmed',
        accessor: (d) => accessors.boolean(d, 'confirmed'),
        Header: 'Confirmed',
        type: Boolean,
      },
      {
        id: 'isVendor',
        accessor: (d) => accessors.boolean(d, 'isVendor'),
        Header: 'Vendor',
        type: Boolean,
      },
      {
        id: 'firstLogin',
        accessor: (d) => accessors.boolean(d, 'firstLogin'),
        Header: 'First Login',
        type: Boolean,
      },
      {
        id: 'locationState',
        accessor: (d) => accessors.boolean(d, 'locationState'),
        Header: 'Location State',
        type: Boolean,
      },
    ],
  },
  partners: {
    label: 'Manage Partners',
    key: 'partners',
    fetch: PartnerServices.getAll,
    columns: [
      {
        id: 'partnerName',
        accessor: 'partnerName',
        Header: 'Name',
        type: String,
      },
      {
        id: 'owner',
        accessor: (d) => d.owner?.username || 'N/A',
        Header: 'Owner',
        type: String,
        canQuery: false,
      },
      {
        id: 'rating',
        accessor: (d) => accessors.float(d, 'rating'),
        Header: 'Rating',
        type: Number,
      },
      {
        id: 'email',
        accessor: 'email',
        Header: 'Email',
        type: String,
      },
      {
        id: 'phone',
        accessor: 'phone',
        Header: 'Phone',
        type: String,
      },
      {
        id: 'services',
        accessor: (d) => d.services?.serviceName?.en || 'N/A',
        Header: 'Service',
        type: String,
        canQuery: false,
      },
      {
        id: 'confirmed',
        accessor: (d) => accessors.boolean(d, 'confirmed'),
        Header: 'Confirmed',
        type: Boolean,
      },
      {
        id: 'domain',
        accessor: (d) => d.domain?.name?.en || 'N/A',
        Header: 'Domain',
        type: String,
        canQuery: false,
      },
      {
        id: 'isSuspended',
        accessor: (d) => accessors.boolean(d, 'isSuspended'),
        Header: 'Suspended',
        type: Boolean,
      },
      {
        id: 'isDeliveryDistantPartner',
        accessor: (d) => accessors.boolean(d, 'isDeliveryDistantPartner'),
        Header: 'Distant Delivery',
        type: Boolean,
      },
      {
        id: 'isDeliveryLocalPartner',
        accessor: (d) => accessors.boolean(d, 'isDeliveryLocalPartner'),
        Header: 'Local Delivery',
        type: Boolean,
      },
      {
        id: 'holiday',
        accessor: (d) => accessors.boolean(d, 'holiday'),
        Header: 'Holiday',
        type: Boolean,
      },
      {
        id: 'percentage',
        accessor: (d) => accessors.percent(d, 'percentage'),
        Header: 'Percentage',
        type: Number,
      },
    ],
  },

  /**
   *   actif?: boolean
  taked?: boolean
  prepared?: boolean
  passed?: boolean
  payed?: boolean
  price?: { [field: string]: number } | number
  phone?: string | RegExp
  date?: { [field: string]: Date } | Date
  type?: 'regular' | 'food'

   */
  orders: {
    label: 'Manage Orders',
    key: 'orders',
    fetch: OrderServices.getAll,
    /**
   * {"actif":true,"taked":false,"prepared":true,"passed":true,"payed":false,"price":0,"type":"regular","_id":"60869a6ad133170015f728cc","client":"6083ff92c255ca0015c67a62","partner":"605666c6bab6740017784155","date":"2021-04-26T10:48:10.240Z","items":[],"foodItems":[],"__v":1,"phone":"26566856","city":"5ff1ce760fd8c500171206eb","deliveryOrder":"60869a70d133170015f728ce","region":"5ff1ce980fd8c500171206ec"}

   */
    columns: [
      {
        id: '_id',
        accessor: '_id',
        Header: 'ID',
        type: String,
      },
      {
        id: 'taked',
        accessor: (d) => accessors.boolean(d, 'taked'),
        Header: 'Taken?',
        type: Boolean,
      },
      {
        id: 'prepared',
        accessor: (d) => accessors.boolean(d, 'prepared'),
        Header: 'Prepared?',
        type: Boolean,
      },
      {
        id: 'passed',
        accessor: (d) => accessors.boolean(d, 'passed'),
        Header: 'Passed?',
        type: Boolean,
      },
      {
        id: 'payed',
        accessor: (d) => accessors.boolean(d, 'payed'),
        Header: 'Paid?',
        type: Boolean,
      },
      {
        id: 'price',
        accessor: (d) => accessors.float(d, 'price'),
        Header: 'Price',
        type: Number,
      },
      {
        id: 'phone',
        accessor: 'phone',
        Header: 'Phone',
        type: String,
      },
      {
        id: 'date',
        accessor: 'date',
        Header: 'Date',
        type: Date,
      },
      {
        id: 'type',
        accessor: 'type',
        Header: 'Type',
        type: String,
      },
    ],
  },
  /**
  * isRatedDeliverer?: boolean
  collectDate?: { [field: string]: Date }
  deliveryDate?: { [field: string]: Date }
  inDeposit?: boolean
  delivered?: boolean
  deliveryStatus?:
    | 'settled'
    | 'during_client_delivery'
    | 'during_collect_delivery'
    | 'during_return_delivery'
  returned?: boolean
  payed?: boolean
  type?: 'local' | 'distant'
  distance?: { [field: string]: number }
  status?: 'to_be_picked_up' | 'to_be_delivered' | 'to_be_returned'

 */
  deliveryOrders: {
    label: 'Manage Delivery Orders',
    key: 'delivery-orders',
    fetch: DeliveryOrderServices.getAll,
    columns: [
      {
        id: '_id',
        accessor: '_id',
        Header: 'ID',
        type: String,
      },
      {
        id: 'deliveryStatus',
        accessor: 'deliveryStatus',
        Header: 'Delivery Status',
        type: String,
      },
      {
        id: 'inDeposit',
        accessor: (d) => accessors.boolean(d, 'inDeposit'),
        Header: 'In Deposit?',
        type: Boolean,
      },
      {
        id: 'delivered',
        accessor: (d) => accessors.boolean(d, 'delivered'),
        Header: 'Delivered?',
        type: Boolean,
      },
      {
        id: 'returned',
        accessor: (d) => accessors.boolean(d, 'returned'),
        Header: 'Returned?',
        type: Boolean,
      },
      {
        id: 'payed',
        accessor: (d) => accessors.boolean(d, 'payed'),
        Header: 'Paid?',
        type: Boolean,
      },
      {
        id: 'type',
        accessor: 'type',
        Header: 'Type',
        type: String,
      },
      {
        id: 'status',
        accessor: 'status',
        Header: 'Status',
        type: String,
      },
      {
        id: 'distance',
        accessor: (d) => accessors.float(d, 'distance'),
        Header: 'Distance',
        type: Number,
      },
    ],
  },

  /**
   *   name?: string | RegExp
  basePrice?: { [field: string]: number } | number
  discount?: { [field: string]: number } | number
  description?: string | RegExp
  shortDescription?: string | RegExp
  date?: Date | { [field: string]: Date }
  isActive?: boolean
  type?: 'regular' | 'food'
  gender?: 'men' | 'women' | 'kids'
  weight?: { [field: string]: number } | number

   */
  products: {
    label: 'Manage Products',
    key: 'products',
    fetch: ProductServices.getAll,
    columns: [
      {
        id: '_id',
        accessor: '_id',
        Header: 'ID',
        type: String,
      },
      {
        id: 'name',
        accessor: 'name',
        Header: 'Name',
        type: String,
      },
      {
        id: 'basePrice',
        accessor: (d) => accessors.float(d, 'basePrice'),
        Header: 'Base price',
        type: Number,
      },
      {
        id: 'discount',
        accessor: (d) => accessors.float(d, 'discount'),
        Header: 'Discount',
        type: Number,
      },
      {
        id: 'description',
        accessor: 'description',
        Header: 'Description',
        type: String,
      },
      {
        id: 'shortDescription',
        accessor: 'shortDescription',
        Header: 'Short Description',
        type: String,
      },
      {
        id: 'type',
        accessor: 'type',
        Header: 'Type',
        type: String,
      },
      {
        id: 'gender',
        accessor: 'gender',
        Header: 'Gender',
        type: String,
      },
      {
        id: 'weight',
        accessor: (d) => accessors.float(d, 'weight'),
        Header: 'Mass',
        type: Number,
      },
      {
        id: 'date',
        accessor: 'date',
        Header: 'Date',
        type: Date,
      },
    ],
  },
  /**
   *   score?: { [field: string]: number } | number
  comment?: string | RegExp
  date?: { [field: string]: Date } | Date

   */
  feedback: {
    label: 'Manage Feedback',
    key: 'feedbacks',
    fetch: FeedbackServices.getAll,
    columns: [
      {
        id: '_id',
        accessor: '_id',
        Header: 'ID',
        type: String,
      },
      {
        id: 'score',
        accessor: (d) => accessors.float(d, 'score'),
        Header: 'Score',
        type: Number,
      },
      {
        id: 'user',
        accessor: (d) => d.user.username,
        Header: 'User',
        type: String,
        canQuery: false,
      },
      {
        id: 'partner',
        accessor: (d) => d.partner.partnerName,
        Header: 'Partner',
        type: String,
        canQuery: false,
      },
      {
        id: 'comment',
        accessor: 'comment',
        Header: 'Comment',
        type: String,
      },
      {
        id: 'date',
        accessor: 'date',
        Header: 'Date',
        type: Date,
      },
    ],
  },
}

export default manage
