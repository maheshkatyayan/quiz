import React from 'react'

function Enternewpassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSetpassword = async () => {
    
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
    
        const data = { password };
        console.log("Signing in with data:", data);
    
        try {
          await axios.post("http://localhost:5000/users/signin", { data }, { withCredentials: true });
          toast.success("Signed in successfully!");
          navigate("/Clientlogin");
        } catch (error) {
          console.error("Error signing in:", error);
          toast.error("Failed to sign in. Please try again.");
        }
      };
    
  return (
    <div>
    <input
    type="password"
    className="w-full px-4 py-2 rounded-lg text-black font-bold"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
   <input
            type='password'
            className='w-full px-4 py-2 rounded-lg text-black font-bold'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
           <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-bold transition duration-300 ease-in-out hover:bg-green-600"
            id='Join'
            onClick={handleSetpassword}
          >
            set
          </button>
      
    </div>
  )
}

export default Enternewpassword
