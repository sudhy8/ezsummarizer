export const pegasus = async (requestBody = "No data") => {
    const url = "https://pegasus-tfhaf.eastus2.inference.ml.azure.com/score";
    const requestHeaders = new Headers({
        "Content-Type": "application/json",
        "azureml-model-deployment": "google-pegasus-xsum-12"
    });

    // Replace this with the primary/secondary key, AMLToken, or Microsoft Entra ID token for the endpoint
    const apiKey = "eAipTvXGBZtdmBcD83INHQv4dKIfutah";
    if (!apiKey) {
        throw new Error("A key should be provided to invoke the endpoint");
    }
    requestHeaders.append("Authorization", "Bearer " + apiKey);

    let response = null;
    try {
        response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: requestHeaders
        });

        if (!response.ok) {
            console.debug(...response.headers);
            const responseText = await response.text();
            console.debug(responseText);
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error in pegasus function:", error);
        throw error; // Re-throw the error for the caller to handle
    } finally {
        // Ensure proper cleanup of resources
        if (response && typeof response.body?.cancel === 'function') {
            response.body.cancel();
        }
        // Add any other necessary cleanup here
    }
};