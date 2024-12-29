import { useState } from "react"
const backend_url = import.meta.env.VITE_BACKEND_URL

function App() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${backend_url}/api/waiting-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage("Thank you! We will notify you soon.")
        setEmail("")
      } else {
        const data = await response.json()
        setMessage(data.message || "An error occurred. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setMessage("An error occurred. Please try again later.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold">CodingQueue</h1>
        <p className="text-xl md:text-2xl mt-2">One Skill at a Time</p>
        <p className="text-gray-400 mt-4 text-lg md:text-xl">
          Your journey to mastering coding starts here. CodingQueue is your
          platform to learn, grow, and achieve your goals, one skill at a time.
        </p>
        <p className="text-gray-400 text-lg md:text-xl">
          Be the first to access our exclusive courses and resources.
        </p>
      </header>

      {/* Email Form Section */}
      <div className="mt-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-md w-full transition duration-200"
          >
            Notify Me
          </button>
        </form>
        {message && (
          <p className="text-center text-sm text-green-400 mt-4">{message}</p>
        )}
      </div>

      {/* Features Section */}
      <section className="mt-16 text-center max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Why Choose CodingQueue?
        </h2>
        <ul className="text-gray-400 text-lg space-y-4">
          <li>
            🌟 **Expert-Led Courses**: Learn from industry professionals with
            years of experience.
          </li>
          <li>
            🚀 **Flexible Learning**: Learn at your own pace with our self-paced
            courses.
          </li>
          <li>
            🛠️ **Practical Skills**: Build real-world projects and enhance your
            portfolio.
          </li>
          <li>
            🤝 **Supportive Community**: Join a vibrant community of learners
            and mentors.
          </li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} CodingQueue. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
