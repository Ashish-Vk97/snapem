import { useState } from "react";

export default function SmsOpt() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validatePhone = (phone: string) => {
    const regex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return regex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !phone) {
      setError("All fields are required.");
      return;
    }
    if (!validatePhone(phone)) {
      setError(
        "Enter a valid phone number in E.164 format (e.g. +12025550100)."
      );
      return;
    }
    if (!smsConsent) {
      setError("You must agree to receive SMS notifications.");
      return;
    }

    // TODO: Send form data to backend (API call)
    console.log("User Opted In:", {
      firstName,
      lastName,
      email,
      phone,
      smsConsent,
      timestamp: new Date(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
        <div className='max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center'>
          <h2 className='text-xl font-semibold text-green-600'>
            ✅ Thank you!
          </h2>
          <p className='mt-2 text-gray-700'>
            You’ve successfully subscribed to SMS notifications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* First Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              First Name
            </label>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            />
          </div>

          {/* Last Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Last Name
            </label>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Phone Number *
            </label>
            <input
              type='tel'
              placeholder='+1 202 555 0100'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            />
          </div>

          {/* SMS Consent */}
          <div>
            <label className=' text-sm font-semibold text-gray-600 mb-1'>
              Sign up for SMS
            </label>
           
            <div className='flex items-start'>
              <input
                type='checkbox'
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className='h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500'
              />
              <label className='ml-2 text-sm text-gray-700'>
                You agree to receive automated transactional messages. Message
                frequency may vary. Standard message & data rates may apply.
                Reply STOP to opt out, HELP for help. Your information will not
                be shared with third parties.
              </label>
            </div>
          </div>

          {/* Error */}
          {error && <p className='text-sm text-red-600'>{error}</p>}

          {/* Submit */}
          <button
            type='submit'
            className='w-full rounded-xl bg-green-600 px-4 py-2 text-white font-semibold shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
