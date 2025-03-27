import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import EnhancedTable from './EnhancedTable';


function EnhancedTableContainer() {
    const filesState = useAppSelector(state => state.filesReducer)

    if (filesState.isLoading === false && filesState.files) {
        return <EnhancedTable rows={filesState.files} />
    }
}

export default EnhancedTableContainer