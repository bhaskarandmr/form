export default function handler(req, res) {
    // This is a test example. You can see the result in your ternimal.
    console.log(req.body)

    // If you have your favorite Mail API put some code here
    res.send("ok")
    res.status(200)
}