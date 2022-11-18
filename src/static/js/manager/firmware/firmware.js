const input = document.getElementById('OTAfileupload');

$('#upload-button').click(function () {
    // Event handler executed when a file is selected
    const onSelectFile = () => upload(input.files[0]);
    onSelectFile()
})

const upload = (file) => {
    const formData = new FormData();
    formData.append('file', file, file['name'])
    // console.log(file);
    // This will upload the file after having read it
    fetch('http://112.137.129.232:3704/api/ota', { // Your POST endpoint
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: formData,
    })
        // .then(
        //     success => console.log(success['status']) // Handle the success response object
        // )
        .then(
            success => {
                if(success['status']){
                    showAlert("Upload file thành công !", "", "success")
                    setTimeout(function(){
                        window.location.reload();
                    }, 2000) 
                }
                else{
                    showAlert("Upload file thất bại !", "", "danger")
                    setTimeout(function(){
                        window.location.reload();
                    }, 2000) 
                }
            }) // Handle the success response object
        .catch(
            error => console.log(error) // Handle the error response object
        );
};