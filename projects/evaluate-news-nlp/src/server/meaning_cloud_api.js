// get request for recieving processed text from API

const getData = async (url = "") => {

    const request = await fetch(url)

    try {
        const newData = await request.json();
        return newData;
    } catch(error) {
        console.log(error)
    }
}
