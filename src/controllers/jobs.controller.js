exports.getAll = async (req, res) => {
    try {
        const {title, location, fullTime, page, limit} = req.query;
        const queryParams = new URLSearchParams();

        title ? queryParams.append("title", title.toLowerCase()) : queryParams.append("title", "");
        location ? queryParams.append("location", location.toLowerCase()) : "";
        if (fullTime) {
            queryParams.append("full_time", ("true").toLowerCase());
        } 
        page ? queryParams.append("page", (parseInt(page))) : 1;
        limit ? queryParams.append("limit", (parseInt(limit))) : 0;


        const apiUrl = "https://dev6.dansmultipro.com/api/recruitment/positions.json";
        const fullApiUrl = apiUrl+"?"+queryParams.toString();
        console.log(fullApiUrl);

        const response = await fetch(fullApiUrl);
        const data = await response.json();
        console.log("panjang data", data.length);

        const inputLimit = limit ? limit : 10;
        const inputPage = page ? page : 1;
        const totalData = data.length ? data.length : 0;

        const numOfTotalPages = Math.ceil(totalData/inputLimit);
        console.log("totalHalaman", numOfTotalPages);

        return res.json({
            success: true,
            message: "All List of Jobs",
            totalData: totalData,
            pageNow: page || inputPage,
            pageInfo: `in page ${inputPage} of ${numOfTotalPages}`,
            results: data
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: `Can't get Jobs, ${err}`,
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const apiUrl = "https://dev6.dansmultipro.com/api/recruitment/positions/";
        const fullApiUrl = apiUrl+id;
        console.log(fullApiUrl);

        const response = await fetch(fullApiUrl);
        const data = await response.json();
        return res.status(200).json({
            success: true,
            message: "Job found",
            results: data
        });

    
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: `Can't get Jobs, ${err}`,
        });
    }
};
