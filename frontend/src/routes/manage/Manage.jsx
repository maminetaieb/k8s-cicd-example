import React from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { manage } from '../../config'
import {
  Overview,
  ManagePage,
  PartnerView,
  UserView,
  ProductView,
  DeliveryOrderView,
  FeedbackView,
  OrderView,
} from '.'

export const Manage = () => {
  const { path } = useRouteMatch()
  const location = useLocation()

  return (
    <Switch location={location} key={location.pathname}>
      <Route path={`${path}/users/:id`}>
        <UserView />
      </Route>
      <Route path={`${path}/partners/:id`}>
        <PartnerView />
      </Route>
      <Route path={`${path}/products/:id`}>
        <ProductView />
      </Route>
      <Route path={`${path}/orders/:id`}>
        <OrderView />
      </Route>
      <Route path={`${path}/delivery-orders/:id`}>
        <DeliveryOrderView />
      </Route>
      <Route path={`${path}/feedback/:id`}>
        <FeedbackView />
      </Route>

      <Route exact path={`${path}/products`}>
        <ManagePage config={manage.products} />
      </Route>
      <Route exact path={`${path}/feedback`}>
        <ManagePage config={manage.feedback} />
      </Route>
      <Route exact path={`${path}/orders`}>
        <ManagePage config={manage.orders} />
      </Route>
      <Route exact path={`${path}/delivery-orders`}>
        <ManagePage config={manage.deliveryOrders} />
      </Route>
      <Route exact path={`${path}/users`}>
        <ManagePage config={manage.users} />
      </Route>
      <Route exact path={`${path}/partners`}>
        <ManagePage config={manage.partners} />
      </Route>
      <Route exact path={`${path}/`}>
        <Overview />
      </Route>
    </Switch>
  )
}
