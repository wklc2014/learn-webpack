import React from 'react';
import { connect, Router, Route, Switch } from 'mirrorx';

import Loading from './Loading.jsx';

import TestHForm from './TestHFormContainer.jsx';
import TestHTable from './TestHTableContainer.jsx';

import MainLayout from '../components/MainLayout/MainLayout.jsx';
import TestHFormLayout from '../components/TestHFormLayout/TestHFormLayout.jsx';
import TestHFormItem from '../components/TestHFormItem/TestHFormItem.jsx';
import TestHSimditor from '../components/TestHSimditor/TestHSimditor.jsx';

function App (props) {
    return (
        <Router>
            <Loading>
                <MainLayout>
                    <Switch>
                        <Route path="/h_form" component={ TestHForm } />
                        <Route path="/h_form_item" component={ TestHFormItem } />
                        <Route path="/h_table" component={ TestHTable } />
                        <Route path="/h_form_layout" component={ TestHFormLayout } />
                        <Route path="/h_simditor" component={ TestHSimditor } />
                    </Switch>
                </MainLayout>
            </Loading>
        </Router>
    )
};

function mapStateToProps(state, ownProps) {
    return {

    }
}

export default connect(mapStateToProps)(App);
