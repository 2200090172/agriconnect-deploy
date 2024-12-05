import React, { useState } from 'react'
import Signinlayout from './Signinlayout'

const Tempsignin = () => {
    const [userId, setUserId] = useState(null);

  const register = async () => {
    const response = await fetch('http://localhost:2005/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'user@example.com', displayName: 'User' }),
    });

    const options = await response.json();
    setUserId(options.id);

    // Prepare the public key options for the registration process
    const publicKey = {
      challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
      rp: options.rp,
      user: {
        id: Uint8Array.from(options.user.id, c => c.charCodeAt(0)),
        name: options.user.name,
        displayName: options.user.displayName,
      },
      pubKeyCredParams: options.pubKeyCredParams,
      authenticatorSelection: { authenticatorAttachment: 'platform' },
    };

    // Create a new credential using the Web Authentication API
    const credential = await navigator.credentials.create({ publicKey });

    // Send the credential information back to the server for verification
    await fetch('http://localhost:2005/api/auth/register/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: options.id,
        id: credential.id,
        rawId: credential.rawId,
        response: {
          attestationObject: btoa(String.fromCharCode(...new Uint8Array(credential.response.attestationObject))),
          clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON))),
        },
      }),
    });
  };

  const login = async () => {
    try {
        const response = await fetch('http://localhost:2005/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch login options');
        }

        const options = await response.json();

        // Prepare the assertion options for the login process
        const assertion = await navigator.credentials.get({
            publicKey: {
                challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
                allowCredentials: options.allowCredentials.map(cred => ({
                    ...cred,
                    id: Uint8Array.from(atob(cred.id), c => c.charCodeAt(0)),
                })),
            },
        });

        // Send the assertion response to the server for verification
        const verifyResponse = await fetch('http://localhost:2005/api/auth/login/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                credential: {
                    id: assertion.id,
                    rawId: btoa(String.fromCharCode(...new Uint8Array(assertion.rawId))),
                    response: {
                        authenticatorData: btoa(String.fromCharCode(...new Uint8Array(assertion.response.authenticatorData))),
                        clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(assertion.response.clientDataJSON))),
                        signature: btoa(String.fromCharCode(...new Uint8Array(assertion.response.signature))),
                        userHandle: assertion.response.userHandle
                            ? btoa(String.fromCharCode(...new Uint8Array(assertion.response.userHandle)))
                            : null,
                    },
                },
            }),
        });

        if (!verifyResponse.ok) {
            throw new Error('Failed to verify login');
        }

        // Assuming server responds with a success message
        const verifyResult = await verifyResponse.text();
        alert(`Login successful: ${verifyResult}`);
    } catch (error) {
        console.error(error);
        alert('An error occurred during login. Please try again.');
    }
};

  return (

    <Signinlayout>
        
        <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    
    </Signinlayout>
  )
}

export default Tempsignin