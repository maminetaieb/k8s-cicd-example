import * as icons from '../assets/images/icons'

const settings = {
  routes: [
    {
      title: 'Profile Settings',
      to: '/',
      exact: true,
      icon: icons.Profile,
    },
    {
      title: 'Sessions',
      to: '/sessions',
      icon: icons.Sessions,
    },
    {
      title: 'Configuration',
      to: '/configuration',
      icon: icons.Keys,
    },
  ],
}

export default settings
