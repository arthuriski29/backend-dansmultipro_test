const router =  require("express").Router();

router.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Backend test for Dans Multi Pro is running well",
    });
});

router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    });
});

module.exports = router;
