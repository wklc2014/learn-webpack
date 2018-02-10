import { connect } from 'mirrorx';
import TestHTable from '../components/TestHTable/TestHTable.jsx'

function mapStateToProps(state, ownProps) {
    return {
        values: state._report.h_table,
    }
}

export default connect(mapStateToProps)(TestHTable);

