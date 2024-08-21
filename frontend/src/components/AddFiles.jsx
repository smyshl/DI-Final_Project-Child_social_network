import { useState, useEffect } from 'react'

function AddFiles() {

    const [ selectedFiles, setSelectedFiles ] = useState([]);



    const selectHandle = (e) => {
        e.preventDefault();
        
        // setSelectedFiles([...e.target.files])
        // console.log(selectedFiles.length);
        const files = [...e.target.files];
        const imageArray = [];
        // console.log([...e.target.files]);
        
        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (event) => {

            // console.log(index);
            imageArray.push(event.target.result)

            // setSelectedFiles([...selectedFiles, event.target.result]);

            if (imageArray.length === files.length) {
                setSelectedFiles(imageArray);
                console.log("All files read and state updated:", imageArray);
              }

            };
            reader.readAsDataURL(file);
        })
        // setSelectedFiles([...imageArray])
        // console.log("imageArray", imageArray);
        // setSelectedFiles([...imageArray]);
        
    };


    // const selectFiles = (e) => {
    //     console.log("selectFiles =>", e.target.files);
    //     // setSelectedFiles([...e.target.files]);
    //     setSelectedFiles([]);
    //     console.log('selectedFiles 1', selectedFiles);
    //     // console.log("images array 0 =>", imagesArray);        
    //     [...e.target.files].forEach((file, index) => {
    //         console.log("file", index, file);
            
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //         // console.log("images array 1 =>", imagesArray);
    //         console.log(event.target.result);
    //         let newArray = [...selectedFiles, event.target.result];
    //         setSelectedFiles(newArray);      
    //     console.log("images array 1 =>", selectedFiles.length);                            
    //             // imagesArray.push(event.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     })

    //     // setSelectedFiles([...imagesArray]);
    //     console.log("images array 3 =>", selectedFiles.length);
    // };

    // useEffect(() => {
    //     console.log('Selected', selectedFiles.length, 'files');
        
    // }, [selectedFiles]);


    return (
        <>
            <form>
                <label htmlFor="file-upload">Select images:</label>
                <input type="file" id="file-upload" accept="image/*" multiple onChange={selectHandle}/>
                <div id="preview"></div>
            </form>

            <p>Selected files {selectedFiles.length}</p>

            {/* <img src={selectedFiles[0]} style={{width: '50px'}} /> */}


            {
                selectedFiles.map((image, index) => (
                    <img key={index} src={image} style={{width: '50px'}} />
                ))
            }


        </>
    )
};


export default AddFiles;