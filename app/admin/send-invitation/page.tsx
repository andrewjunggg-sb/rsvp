"use client";

import React from "react";
import uuid from "react-uuid";
import { useRouter } from "next/navigation";

// Temporary interface to represent the invitation
// We will integrate it with the database later
interface Invitation {
  id: string;
  name: string;
  email: string;
  guestNumber: number;
}

export default function Page() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [guestNumber, setGuestNumber] = React.useState(0);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const uid: string = uuid();

    const invitation: Invitation = {
      id: uid,
      name,
      email,
      guestNumber,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invitation),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        router.push(`/invitation/${uid}`);
      } else {
        console.error("Failed to send the invitation");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[40vh] w-[40vw] bg-neutral-800 items-center justify-center flex flex-col mx-auto my-auto">
      <h1>Create Invitation</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Full Name
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Email
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Number of guests
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="guest_number"
              onChange={(event) =>
                setGuestNumber(parseInt(event.target.value, 10))
              }
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
