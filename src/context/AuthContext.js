// Import necessary Firebase modules
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,

  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  signInWithEmailLink,EmailAuthProvider, reauthenticateWithCredential,applyActionCode,  multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator,
  RecaptchaVerifier

} from "firebase/auth";
import {
  React,
  useContext,
  useState,
  useEffect,
  createContext,
} from "react";
import { auth } from "../firebase/index";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      // Send email verification link
      await sendEmailVerificationLink(email);
  
      return userCredential;
    } catch (error) {
      // Handle error
      console.error("Signup failed", error);
    }
  };
  // (need to be fixed from firebase)
  const actionCodeSettings = {
    url: 'https://signup2023.page.link/XktS',
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios',
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12',
    },
    dynamicLinkDomain: 'signup2023.page.link',
  };

  const sendEmailVerificationLink = async (email) => {
    try {
      const user = auth.currentUser;
      await sendEmailVerification(user, actionCodeSettings);
      // Save email in localStorage to be used later to complete the verification
      localStorage.setItem('emailForVerification', email);
    } catch (error) {
      // Handle error
      console.error("Send email verification link failed", error);
    }
  };
  

  const completeEmailVerification = async () => {
    try {
      const email = localStorage.getItem('emailForSignIn');
      if (email) {
        const credential = EmailAuthProvider.credentialWithLink(email, window.location.href);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await signInWithEmailLink(auth, email, window.location.href);
        localStorage.removeItem('emailForSignIn');
      } else {
        console.error('Email not found in localStorage.');
      }
    } catch (error) {
      console.error("Complete email verification failed", error);
    }
  };

  const handleVerifyEmail = (auth, actionCode, continueUrl, lang) => {
    applyActionCode(auth, actionCode)
      .then((resp) => {
        // Email address has been verified.
        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      })
      .catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address again.
        console.error("Email verification failed", error);
      });
  };
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const mode = getParameterByName('mode');
    const actionCode = getParameterByName('oobCode');
    const continueUrl = getParameterByName('continueUrl');
    const lang = getParameterByName('lang') || 'en';

    if (mode === 'verifyEmail' && actionCode) {
      handleVerifyEmail(auth, actionCode, continueUrl, lang);
    }

    // ... (other code)
  });




  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      const user = userCredential.user;
  
      // Check if email verification is needed
      if (user && !user.emailVerified) {
        await sendEmailVerificationLink(email);
        throw new Error("Email not verified. Verification link sent.");
      }
  
      return userCredential;
    } catch (error) {
      // Handle error
      console.error("Login failed", error);
  
      // Add your logic to handle email verification error
      if (error.message === "Email not verified. Verification link sent.") {
        // Display an error message or redirect to a verification page
      }
    }
  };
  //multi-2FA
  
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // Handle error
      console.error("Logout failed", error);
    }
  };

 

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      // Handle error
      console.error("Password reset failed", error);
    }
  };

  const updateUserEmail = async (email) => {
    try {
      await updateEmail(auth.currentUser, email);
    } catch (error) {
      // Handle error
      console.error("Update email failed", error);
    }
  };

  const updateUserPassword = async (password) => {
    try {
      await updatePassword(auth.currentUser, password);
    } catch (error) {
      // Handle error
      console.error("Update password failed", error);
    }
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        sendEmailVerificationLink,
        completeEmailVerification,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
