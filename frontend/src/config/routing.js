import * as icons from '../assets/images/icons'

const config = {
  sections: [
    {
      title: 'Management',
      routes: [
        {
          title: 'Overview',
          to: '/manage',
          exact: true,
          icon: icons.ManageFillIcons.ManageHome,
          description: 'See shortcuts and summaries',
        },
        {
          title: 'Manage Users',
          to: '/manage/users',
          icon: icons.ManageFillIcons.ManageUsers,
          description:
            'Find, filter, locate and suspend users from the database.',
        },
        {
          title: 'Manage Partners',
          to: '/manage/partners',
          icon: icons.ManageFillIcons.ManagePartners,
          description: 'Find, filter, locate and suspend partners.',
        },
        {
          title: 'Manage Orders',
          to: '/manage/orders',
          icon: icons.ManageFillIcons.ManageOrders,
          description: 'Manage, Find, filter orders.',
        },
        {
          title: 'Manage Delivery Orders',
          to: '/manage/delivery-orders',
          icon: icons.ManageFillIcons.ManageDeliveryOrders,
          description: 'Manage, Find and filter orders.',
        },
        {
          title: 'Manage Products',
          to: '/manage/products',
          icon: icons.ManageFillIcons.ManageProducts,
          description: 'Manage, Find and filter products.',
        },
        {
          title: 'Manage Feedback',
          to: '/manage/feedback',
          icon: icons.ManageFillIcons.ManageFeedback,
          description: 'Manage, delete, and view Feedback.',
        },
      ],
    },
    {
      title: 'Analytics',
      routes: [
        {
          title: 'Overview',
          to: '/analytics',
          exact: true,
          icon: icons.AnalyticsHome,
        },
        {
          title: 'Partners & Users',
          to: '/analytics/partners',
          exact: true,
          icon: icons.PartnersAnalytics,
          description: 'View partners and users analytics.',
        },
        {
          title: 'Orders & Products',
          to: '/analytics/orders',
          exact: true,
          icon: icons.OrdersAnalytics,
          description: 'View orders and products analytics.',
        },
        {
          title: 'Financial Analytics',
          to: '/analytics/financial',
          icon: icons.FinanceHome,
          description: 'View income, profit, and more financial analytics.',
        },
        {
          title: 'Social Media',
          to: '/analytics/social-media',
          icon: icons.SocialMediaAnalytics,
          description:
            'View instagram, youtube and other social media analytics.',
        },
      ],
    },
    {
      title: 'Locations',
      routes: [
        {
          title: 'Locate user',
          to: '/locate/user',
          icon: icons.LocateUser,
        },
      ],
    },
  ],
}

export default config
