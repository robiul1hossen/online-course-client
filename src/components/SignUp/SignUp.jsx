import  { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {

    const { createUser ,updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = event => {
      event.preventDefault()
      const form = event.target
      const photoUrl = form.photoUrl.value
      const name = form.name.value
      const email = form.email.value
      const password = form.password.value
      console.log(photoUrl)
  
      createUser(email, password)
        .then(result => {
          const loggedUser = result.user
          console.log(loggedUser)
          updateUserProfile(name,photoUrl)
          .then(()=>{
            console.log('uesr profile updated')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User Created Successfully',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/')
          })
          .catch(error=>console.log(error))
        })
    }
  

    return (
        <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign Up now!</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card flex-shrink-0  w-1/2 shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" id='name' name='name' className="input input-bordered" />
              </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="email" id='email' className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input type="text" placeholder="Photo URL" id='photoUrl' name='photoUrl' className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" id='password' className="input input-bordered" />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <span>Already have an accoutn? <Link to={'/login'}>LogIn Now</Link> </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignUp;