import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    files: [],
    convertedFiles: [],
    isLoading: false,
    isConversionLoading: false,
    isCopying: false,
    isDeleting: false,
    isError: false,
    isConverting: false,
    message: "",
    isUpdating:false,
    isSelected: false
}

function createData(id, uid, file_name, date_modified, type, size, uploaded_by, projectId, conversion_uuid) {
    return {
        id,
        uid, 
        file_name,
        date_modified,
        type,
        size,
        uploaded_by,
        projectId,
        conversion_uuid
    }
}

export const filesReducer = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFilesMessage(state, action) {
            return {
                ...state,
                message: '',
            }
        },
        fileSelected(state, action) {
            return {
                ...state,
                message: "" ,
                isError: false,
                isSelected: true
            }
        },
        incorrectFileSelected(state, action) {
            return {
                ...state,
                message: "'" + action.payload + "' File Format Not Allowed. See allowed formats." ,
                isError: true,
                isSelected: false
            }
        },
        fetchFiles(state, action) {
            return {
                ...state,
                isLoading: true,
                // isError : false
            }
        },
        fetchFilesSuccess(state, action) {
            let row_data = []
            // console.log("Action payload", action.payload)
            for (let i = 0; i < action.payload.length; i++) {
                row_data.push(
                    createData(
                        action.payload[i].id,
                        action.payload[i].uid,
                        action.payload[i].file_name,
                        action.payload[i].created_at.toString('MMMM yyyy'),
                        action.payload[i].extension,
                        action.payload[i].size,
                        action.payload[i].username,
                        action.payload[i].project_id,
                        action.payload[i].conversion_uuid
                    ),
                )
            }

            return {
                ...state,
                isLoading: false,
                files: row_data,
                // isError : false
            }
        },
        fetchFilesFailed(state, action) {
            return {
                ...state,
                message: 'Files Fetch Failed',
                isError: true,
                isLoading: false,
            }
        },


        fetchConvertedFiles(state, action) {
            return {
                ...state,
                isConversionLoading: true,
                // isError : false
            }
        },
        fetchConvertedFilesSuccess(state, action) {
            let row_data = []
            for (let i = 0; i < action.payload.length; i++) {
                row_data.push(
                    createData(
                        action.payload[i].id,
                        action.payload[i].uid,
                        action.payload[i].file_name,
                        action.payload[i].created_at.toString('MMMM yyyy'),
                        action.payload[i].extension,
                        action.payload[i].size,
                        action.payload[i].username,
                        action.payload[i].project_id
                    ),
                )
            }

            return {
                ...state,
                isConversionLoading: false,
                convertedFiles: row_data,
                // isError : false
            }
        },
        fetchConvertedFilesFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Converted Files Failed',
                isError: true,
                isConversionLoading: false,
            }
        },



        uploadFiles(state, action) {
            return {
                ...state,
                // message : "",
                isUpdating: true,
            }
        },
        uploadFilesSuccess(state, action) {
            return {
                ...state,
                message: 'File Upload Successfull',
                isUpdating: false,
                isError: false,
            }
        },
        uploadFilesFailed(state, action) {
            console.log("upload error", action.payload.response.data)
            return {
                ...state,
                message: action.payload.response.data.error,
                isUpdating: false,
                isError: true,
            }
        },
        removeFiles(state, action) {
            return {
                ...state,
                message : "",
                isUpdating: true,
            }
        },
        removeFilesSuccess(state, action) {

            // console.log("Action payload:", action)
            return {
                ...state,
                message: 'File Delete Successfull',
                isUpdating: false,
                isError: false,
            }
        },
        removeFilesFailed(state, action) {
            return {
                ...state,
                message: 'File Delete Failed',
                isUpdating: false,
                isError: true,
            }
        },
        
        copyLink(state, action) {
            return {
                ...state,
                message : "",
                isCopying: true,
            }
        },
        copyLinkSuccess(state, action) {
            navigator.clipboard.writeText(action.payload)
            return {
                ...state,
                message: 'File Link Copied',
                isCopying: false,
                isError: false,
            }
        },
        copyLinkFailed(state, action) {
            return {
                ...state,
                message: 'File Link Copy Error',
                isCopying: false,
                isError: true,
            }
        },

        convertFile(state, action) {
            return {
                ...state,
                message : "",
                isConverting: true,
            }
        },
        convertFileSuccess(state, action) {
            navigator.clipboard.writeText(action.payload)
            return {
                ...state,
                message: action.payload.message,
                isConverting: false,
                isError: false,
            }
        },
        convertFileFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                message: action.payload.response.data.error,
                isConverting: false,
                isError: true,
            }
        },
        setFiles(state, action) {
            return {
                ...state,
                files : []
            }
        },


    },
})

export const {
    setFilesMessage,
    fileSelected,
    incorrectFileSelected,
    fetchFiles,
    fetchFilesSuccess,
    fetchFilesFailed,
    fetchConvertedFiles,
    fetchConvertedFilesSuccess,
    fetchConvertedFilesFailed,
    uploadFiles,
    uploadFilesSuccess,
    uploadFilesFailed,
    removeFiles,
    removeFilesSuccess,
    removeFilesFailed,
    updateFiles,
    copyLink,
    copyLinkSuccess,
    copyLinkFailed,
    convertFile,
    convertFileSuccess,
    convertFileFailed,
    setFiles
} = filesReducer.actions

export default filesReducer.reducer
