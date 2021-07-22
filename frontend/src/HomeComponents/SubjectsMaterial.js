import React from 'react';


export default function SubjectsMaterial( props) {
    const {item}=props;

    const viewFunc=(item)=>{
        props.history.push(`/material/view/${item._id}`)
    }
   

    function imageSrc(item){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(item.doc.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    return (
       
                         <li key={item._id}>
                            <div>
                                <h6>Name of Subject:</h6> <b>{item.subject}</b>
                            </div>
                            <div>
                                <h6>Professor:</h6><b>{item.professor}</b>
                            </div>
                            <div>
                                <h6>Date : </h6><b>{item.date.substring(0,10)}</b>
                            </div>
                            <div  style={{flexDirection:"row" }}>
                                <a href={`data:${item.doc.contentType};base64,${imageSrc(item)}`} download={`${item.subject}-${item.professor}.pdf`} >

                                    <button type="button" className="btn btn-success">Download</button> 

                                </a>
                                <a >

                                    <button style={{marginLeft:10}} type="button" className="btn btn-warning" onClick={(e)=>viewFunc(item)}>View</button>
                                </a>
                         </div>
                      </li> 
                   
    )
}
