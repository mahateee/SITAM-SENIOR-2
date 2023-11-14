import { Link } from "react-router-dom";
import frame from "../images/Frame.svg";
import logo from "../images/logoS.svg";

function EmailVerficationPage() {
  

  return (
    <div className="flex justify-center items-center h-screen " style={{ backgroundImage: `url(${frame})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  <div className="w-full max-w-md p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-12 w-auto" width="48" height="48" src="https://img.icons8.com/color/48/new-post.png" alt="new-post" />

      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        A verification email has been sent.
      </h2>
      <p className="mt-10 text-center text-sm font-semibold leading-9 tracking-tight text-gray-500">
        Thank you for joining SITAM. Please check your email (including junk/spam) to verify your account.
      </p>
    </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         
            <div className="mt-10 text-center text-sm text-gray-500">
              
              <Link
                to="/"
                className="font-semibold leading-6 text-purple-600 hover:text-teal-500"
              >
Back to Signin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerficationPage;
