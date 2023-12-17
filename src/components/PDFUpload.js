import React, { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast'; // Import the toast function and Toaster component

function PDFUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            // toast.error('Please select a file'); 
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://quiz-app-back-end.onrender.com/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                // toast.success(result.message || 'Upload successful!'); // Display success toast
            } else {
                console.error('Upload failed with status:', response.status);
                // toast.error('Upload failed'); // Display error toast when upload fails
            }
        } catch (error) {
            console.error('Upload error:', error);
            // toast.error('Upload error'); // Display error toast on exception
        }
    };

    return (
        <div className="container mt-4">
         
            <h2>Upload PDF</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input className="form-control" type="file" accept="application/pdf" onChange={handleFileChange} />
                </div>
                <button className="btn btn-primary" type="submit">Upload</button>
            </form>
        </div>
    );
}

export default PDFUpload;
