// Login Page Component
import Template from "../components/core/Auth/Template"

function Login() {
  // Render login form using reusable Template component
  return (
    <Template
      title=" Sign In to LearningEdge"
      description1="Your personalized learning space is just one click away"
      formType="login"
    />
  )
}

export default Login