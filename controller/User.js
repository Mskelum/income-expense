const conn = require("../config/db"); // Import database connection

// ------------------------
// Register user function
// ------------------------
const registerUser = (req, res) => {
    const { email, password } = req.body; // Get email and password from request body

    // Check if the email is already registered
    conn.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Database error during SELECT query:", err);
            return res.status(500).json({ error: "Database error" }); // Server error
        }

        // If user already exists
        if (result.length > 0) {
            return res.status(422).json({ error: "Email already registered" });
        }

        // If email is new, insert the user into database
        conn.query("INSERT INTO users SET ?", { email, password }, (err, result) => {
            if (err) {
                console.error("Database error during INSERT query:", err);
                return res.status(500).json({ error: "Database error" });
            }
            return res.status(201).json({ message: "User created" }); // Success
        });
    });
};

// ------------------------
// Login user function
// ------------------------
const loginUser = (req, res) => {
    const { email, password } = req.body; // Get email and password

    // Check if user exists
    conn.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Database error during SELECT query:", err);
            return res.status(500).json({ error: "Database error" });
        }

        // If user not found or password mismatch
        if (result.length === 0 || result[0].password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Login successful, return basic info
        return res.status(200).json({ email: result[0].email, role: result[0].role });
    });
};

module.exports = { registerUser, loginUser }; // Export the functions
