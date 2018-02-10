import mirror, { connect } from 'mirrorx';

import reportModel from '../models/_report.js';
import TestHForm from '../components/TestHForm/TestHForm.jsx'

mirror.model(reportModel);

mirror.hook((action, getState) => {



})

function mapStateToProps(state, ownProps) {
    return {
        values: state._report.h_form,
    }
}

export default connect(mapStateToProps)(TestHForm);

