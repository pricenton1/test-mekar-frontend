import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import {connect} from "react-redux";

const UserForm = (props) => {

    const {formType, editedData,errorData, show, hide, jobs, education} = props
    const [userInput, setUserInput] = useState({
        userNIK: "",
        userName: "",
        userBirth: "",
        job: "",
        education: ""
    })

    const validationForm = () => {
        return (userInput.userNIK !== "" && userInput.userName !== "" && userInput.userBirth !== "" && userInput.job !== "" && userInput.education !== "")
    }

    const handleChangeInput = (name, value) => {
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const reset = () => {
        setUserInput({
            ...userInput,
            userNIK: "",
            userName: "",
            userBirth: "",
            job: "",
            education: ""
        })
    }

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const handleSubmit = (formType, id) => {
        let user = {
            userNIK: userInput.userNIK,
            userName: userInput.userName.toUpperCase(),
            userBirth: userInput.userBirth,
            userJob: {
                jobID: userInput.job
            },
            userEducation: {
                educationID: userInput.education
            }
        }

        if (formType === "Create") {
            props.create(user)
        } else {
            props.update(id, user)
        }
        reset()
    }

    const prevEditedData = usePrevious({editedData});
    useEffect(() => {
        if (prevEditedData !== editedData && Object.keys(editedData).length !== 0) {
            setUserInput({
                ...userInput,
                userNIK: editedData.userNIK,
                userName: editedData.userName,
                userBirth: editedData.userBirth,
                job: editedData.userJob.jobID,
                education: editedData.userEducation.educationID
            })
        } else {
            reset()
        }
    }, [editedData])

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{formType} User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="form">
                    <InputComponent
                        inputType={"number"}
                        inputName={"setuserNIK"}
                        inputLabel={"Nomor KTP"}
                        value={userInput.userNIK}
                        disable={formType === "Detail"}
                        inputPlaceholder={"Masukkan Nomor KTP (maximum 16 digit)"}
                        onChange={e => {
                            handleChangeInput("userNIK", e.target.value)
                        }}
                    />
                    <div className="container-error">
                        <small className="text-danger">{errorData.errors === undefined ?"":errorData.errors.userNIK === undefined ? "":errorData.errors.userNIK}</small>
                    </div>
                    <InputComponent
                        inputType={"text"}
                        inputName={"setuserName"}
                        inputLabel={"Nama Lengkap"}
                        value={userInput.userName}
                        disable={formType === "Detail"}
                        inputPlaceholder={"Masukkan Nama Lengkap"}
                        onChange={e => {
                            handleChangeInput("userName", e.target.value)
                        }}
                    />
                    <Form.Group>
                        <Form.Label>Tanggal Lahir</Form.Label>
                        <Form.Control
                            disabled={formType === "Detail"}
                            type="date"
                            value={userInput.userBirth}
                            onChange={e => handleChangeInput("userBirth", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pekerjaan</Form.Label>
                        <Form.Control
                            disabled={formType === "Detail"}
                            as="select" size="md"
                            value={userInput.job}
                            onChange={e => {handleChangeInput("job", e.target.value)}}>
                            <option value="" disabled selected >-- Pilih Pekerjaan --</option>
                                {jobs.map((val) => {
                                    return (
                                        <option value={val.jobID} key={val.jobID}>
                                            {val.jobLabel}
                                        </option>
                                    )
                                })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Pendidikan Terakhir</Form.Label>
                        <Form.Control
                            disabled={formType === "Detail"}
                            as="select" size="md"
                            value={userInput.education}
                            onChange={e => {handleChangeInput("education", e.target.value)}}>
                            <option value="" disabled selected >-- Pilih Pendidikan --</option>
                                {education.map((val) => {
                                    return (
                                        <option value={val.educationID} key={val.educationID}>
                                            {val.educationLabel}
                                        </option>)
                                })}
                        </Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {formType === "Detail" ? "" :
                    <ButtonComponent
                        btnLabel={formType}
                        validation={validationForm()}
                        click={() => handleSubmit(formType, editedData.userID)}
                    />
                }
                <Button variant="primary" onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        jobs: state.userReducer.user.jobs,
        education: state.userReducer.user.education
    }
}

export default connect(mapStateToProps, null)(UserForm);