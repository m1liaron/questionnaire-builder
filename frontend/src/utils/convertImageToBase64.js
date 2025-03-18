const convertImageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result); // returns the full data URL (including prefix)
        };
        reader.onerror = () => reject(new Error("Failed to convert image to base64"));
    });
};

export { convertImageToBase64 }