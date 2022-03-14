export default function handler(req, res) {
    // This is a test example. You can see the result in "inspect" > "network" > "contact file" in your favorite webbrowser devtool.
    // https://developer.mozilla.org/fr/docs/Learn/Common_questions/What_are_browser_developer_tools
    
    // If you have your favorite Mail API put some code here
    try {
        const result = req.body
        res.status(200).send({ result })
      } catch (err) {
        res.status(500).send({ error: 'failed to fetch data' })
    }
}