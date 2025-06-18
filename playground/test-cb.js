function callBackFunction(errors, value) {
    if (errors) {
        console.error("Errors occurred:", errors);
    } else {
        console.log("Value received:", value);
    }
}