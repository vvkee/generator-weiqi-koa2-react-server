import React from 'react'
import {
    Router,
    Route,
    IndexRoute,
    createMemoryHistory
} from 'react-router'

import Test from './views/test'

export default (
    <Router history={createMemoryHistory()}>
        <Route path="/" component={Test}>
            <IndexRoute component={Test} />
            <Route path="/" component={Test} />
        </Route>
    </Router>
)
