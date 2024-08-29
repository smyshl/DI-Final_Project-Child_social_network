import { useState, useEffect } from 'react'

function AddFiles({setPostFileList}) {

    const [ selectedFiles, setSelectedFiles ] = useState([]);

    const selectHandle = (e) => {
        e.preventDefault();


        // setSelectedFiles([...e.target.files])
        // console.log(selectedFiles.length);
        const files = [...e.target.files];
        setPostFileList(files)
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
                // console.log("All files read and state updated:", imageArray);
              }

            };
            reader.readAsDataURL(file);
        })
        
    };

    return (
        <>
            <form>
                <label htmlFor="file-upload">Select images:</label>
                <input type="file" id="file-upload" accept="image/*, video/*" multiple onChange={selectHandle}/>
                <div id="preview"></div>
            </form>

            <p>Selected files {selectedFiles.length}</p>

            {/* <img src={selectedFiles[0]} style={{width: '50px'}} /> */}

            <div>
            {
                selectedFiles.map((file, index) => (
                    // file.split(';')[0].split(':')[1].startsWith('image/') ? <img key={index} src={file} style={{width: '50px', margin: '5px'}} /> : <video key={index} controls> <source src={file} /></video>
                    <img key={index} src={file} style={{width: '60px', margin: '5px'}} />
                ))
            }
            </div>

        </>
    )
};


export default AddFiles;