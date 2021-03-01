import React, { Component } from 'react';
import {Pagination } from 'react-bootstrap';
import {connect} from "react-redux";

const TablePaging = (props) => {
        const {page,setPage,users} = props
        return (
            <div>
                <Pagination>
                    <Pagination.First
                        disabled={page === 1 ? true : false}
                        onClick={() => setPage(page - 1 )} 
                    />

                    <Pagination.Prev
                        disabled={page === 1 ? true : false}
                        onClick={() => setPage(page - 1 )}
                    />

                    {page < 3 ? null : (
                        <Pagination.Item onClick={() => setPage(page - 2 )}>
                            {page - 2}
                        </Pagination.Item>
                    )}
                    {page < 2 ? null : (
                        <Pagination.Item onClick={() => setPage(page - 1 )}>
                            {page - 1}
                        </Pagination.Item>
                    )}

                    <Pagination.Item active>{page}</Pagination.Item>

                    <Pagination.Item
                        disabled={users.length < 5 ? true : false} 
                        onClick={() => setPage(page + 1 )}>
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item
                        disabled={users.length < 5 ? true : false} 
                        onClick={() => setPage(page + 2 )}>
                        {page + 2}
                    </Pagination.Item>
                        <Pagination.Next
                        disabled={users.length < 5 ? true : false} 
                        onClick={()=> setPage(page + 1)}/>
                    <Pagination.Last 
                        disabled={users.length < 5 ? true : false}
                    />

                </Pagination>
            </div>
        )
}

const mapStateToProps = (state)=>{
    return{
        users : state.userReducer.user.users
    }
}

export default connect(mapStateToProps,null)(TablePaging);
