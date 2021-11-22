import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useHistory } from "react-router-dom";

import UserService from "../../services/user.service";

import Button from '@material-ui/core/Button';
import MaterialTable from "material-table";
import Alert from '@material-ui/lab/Alert';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';



const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
};

var objt = new Array(60);

export default function AnchillaryPage(props) {

    let history = useHistory();

    const flightNo = useRef(props.match.params.flightno);
    const [anchillaryServices, setAnchillaryServices] = useState([]);
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        fetch("http://localhost:3002/services/" + flightNo.current).then(res => res.json()).then(json => {
            objt = json;
            setAnchillaryServices(json.ancillaryServices);
        });
    }, []);

    const ex = () => {
        history.push('/adminPage');
    }

    const handleRowDelete = (oldData, resolve) => {

        let dataDelete = [...anchillaryServices];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setAnchillaryServices([...dataDelete]);
        objt.ancillaryServices = dataDelete;
        UserService.updateServicesDetails(objt, flightNo.current);
        resolve()
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        let errorList = []
        if (newData.name === undefined) {
            errorList.push("Please enter Anchillary name")
        }

        if (errorList.length < 1) {
            let dataUpdate = [...anchillaryServices];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setAnchillaryServices(dataUpdate);
            objt.ancillaryServices = dataUpdate;
            UserService.updateServicesDetails(objt, flightNo.current);
            resolve()
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }

    }

    const handleRowAdd = (newData, resolve) => {
        let errorList = []
        if (newData.name === undefined) {
            errorList.push("Please enter Anchillary name")
        }

        if (errorList.length < 1) { //no error
            let dataToAdd = [...anchillaryServices];
            dataToAdd.push(newData);
            setAnchillaryServices(dataToAdd);
            objt.ancillaryServices = dataToAdd;
            UserService.updateServicesDetails(objt, flightNo.current);
            resolve();
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    var columns = [
        { title: "id", field: "id", hidden: true },
        { title: "name", field: "name" },
    ]

    return (
        <div>
            <Button variant='contained' onClick={ex}>Back</Button>
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
                {iserror &&
                    <Alert severity="error">
                        {errorMessages.map((msg, i) => {
                            return <div key={i}>{msg}</div>
                        })}
                    </Alert>
                }
            </div>
            <MaterialTable
                columns={columns}
                title={'Anchillary Services'}
                icons={tableIcons}
                options={{
                    paging: false,
                    search: false,
                    draggable: false,
                    header: false,
                }}
                data={anchillaryServices}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
            />
        </div>
    );
}